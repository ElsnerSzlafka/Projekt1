/**
 * Skrypt rozdzielający miejsca w parlamencie przy wykorzystaniu algorytmu Inmana-Bulfina.
 * @author Monika Elsner
 * @namespace
 */
var jit = {
	/**
	 * Znajduje najwyższą liczbę w jednowymiarowej tablicy.
	 * @param {array} arr tablica do przeszukania.
	 * @returns {Number} Zwraca najwyższą liczbę w tablicy.
	 */
	arrayMax: function (arr) {
		var len = arr.length,
			max = null;
		while (len--) {
			if (Number(arr[len]) > max) {
				max = Number(arr[len]);
			}
		}
		return max;
	},
	/**
	 * Zwraca pozycję najmniejszej liczby w jednowymiarowej tablicy.
	 * @param {array} arr tablica do przeszukania.
	 * @returns {Number} zwraca pozycję najniższej liczby w tablicy.
	 */
	arrayMinPos: function (arr) {
		var len = arr.length,
			min = Infinity,
			pos = 0;
		while (len--) {
			if (Number(arr[len]) < min) {
				min = Number(arr[len]);
				pos = len;
			}
		}
		return pos;
	},
	/**
	 * Oblicza wartość Tij na podstawie wzoru Tij = ((j-1/2)*k)/D[i].
	 * @param {number} k Aktualna pozycja w stanie D[i].
	 * @param {number} T Liczba miejsc w parlamencie.
	 * @param {number} d Wielkość stanu.
	 * @param {boolean} w Raportowanie obliczeń.
	 * @example
	 * // returns 4.429
	 * jit.bulfin (52,43,500,0)
	 * @returns {number} zwraca wynik równania ((k-1/2)*T)/d
	 */
	bulfin: function (k, T, d, w) {
		var a = ((k - 0.5) * T) / d
		if (w) jit.log.set_content("Tij = ((" + k + " - 0,5) * " + T + ") /" + d + " = " +  a + " \n");
		return a;
	},
	/**
	 * Tworzy obiekt HTML na podstawie podanych parametrów.
	 * @param {string} e Tag tworzonego elementu.
	 * @param {object} t Atrybuty i ich wartości dla tworzonego obiektu. (niewymagany).
	 * @param {objectHTML|string} n Obiekt HTML, tekst, lub kod HTML, który ma zostać osadzony w tworzonym obiekcie. (niewymagany)
	 * @param {objectHTML|string} r Obiekt HTML, tekst, lub kod HTML, który ma zostać osadzony w tworzonym obiekcie. (niewymagany)
	 */
	cE: function (e, t, n, r) {
		var i = document.createElement(e), s;
		for (s in t) i.setAttribute(s, t[s]);
		/** Jeżeli podano parametr n, sprawdza czy jest to obiekt lub kod HTML i zależnie od wyniku osadza go, dodaje jako tekst, lub dodaje jako Text Node. */
		if (n)
			if (typeof n == "object") i.appendChild(n);
			else if (jit.isHTML(n)) i.innerHTML += n;
			else i.appendChild(jit.tn(n));
		if (r)
			if (typeof r == "object") i.appendChild(r);
			else if (jit.isHTML(r)) i.innerHTML += r;
			else i.appendChild(jit.tn(r));
		return i
	},
	/**
	 * Przetwarza dane wczytane z pliku i przypisuje je odpowiednim pozycją w formularzu. Wszystkie parametry konwertuje na typ integer.
	 * @param {string} contents Tekst do przetworzenia.
	 */
	changeForm: function (contents) {
		var a = contents.split('\n'),
			c = /[\s\t]+/g,
			b = a[0].split(c);
			a = a[1].split(c);

			b = b.map(function (x) {
				return parseInt(x, 10);
			});
			a = a.map(function (x) {
				return parseInt(x, 10);
			});

		document.getElementById('state').value = b[0];
		document.getElementById('rozmiar').value = b[1];
		document.getElementById('number').value = a.join();
	},
	/**
	 * Sprawdza czy podany element typu Input posiada wartość. Jeżeli nie, przypisuje mu wartość 1.
	 * @param {string|object} a Obiekt lub identyfikator, którego wartość ma zostać sprawdzona.
	 */
	checkInput: function (a) {
		$(a).val() === "" ? $(a).val(1) : 0;
	},
	/**
	 * Czyści wartość elementu Input.
	 * @param {string|object} a Obiekt lub identyfikator, którego wartość ma zostać sprawdzona.
	 */
	clearInput: function (a) {
		$(a).val("");
	},
	/**
	 * Otwiera okno formularza, oraz ustawia jego pola na domyślne wartości.
	 */
	formularz: function () {
		document.getElementById('state').value = 5;
		document.getElementById('rozmiar').value = 43;
		document.getElementById('number').value = "500, 100, 150, 50, 50";
		$( "#wynik").dialog("close");
		$( "#dialog-form" ).dialog( "open" );
		$( "#sbs_l").attr("aria-pressed", ($("#sbs").attr("checked") === "true") ? true : false);
		$( "#tekst_l").attr("aria-pressed", ($("#tekst").attr("checked") === "true") ? true : false);
		$( "#opcje").buttonset( "refresh");
	},
	/**
	 * Tworzy okno z wynikiem. Zależnie od wybranych opcji w formie wykresu bądź tabeli.
	 */
	inm: function () {
		var n = document.getElementById("state").value, // wczytuje liczbę stanów z formularza.
			h = document.getElementById("rozmiar").value, // wczytuje rozmiar parlamentu z formularza.
			D = document.getElementById("number").value.split(","), // wczytuje wielkość kolejnych stanów z formularza.
			t = (document.getElementById("tekst").checked ) ? true : false,
			result = jit.inman(n, D, h), m = jit.arrayMax(result[1]).toFixed(1), n = m/10, i,
			p = document.getElementById("wynik"),
			w = jit.cE("tbody");		// tworzy element <tbody>

		for (i = 0; i < result[0].length; i++)
			if (t) w.appendChild (jit.cE('tr',{},jit.cE('td',{class:'leg-r'},result[0][i]),jit.cE('td',{class:"tabela"},result[1][i])))  // tworzy rząd w tabeli z 2 polami. Pierwsze zawiera nr stanu, drugie ilość jego miejsc.
			else w.appendChild (jit.cE('tr',{},jit.cE('td',{class:'leg-r'},result[0][i]),jit.cE('td',{colspan:"10"},jit.cE('div',{class:"wykres kolor" + jit.kolor(m/10,result[1][i]), title:result[1][i]}) ) )); // tworzy rząd w tabeli z polami. Pierwsze zawiera nr stanu, drugie element <div> będący słupkiem wykresu.

		p.removeChild(document.getElementById("wynik").getElementsByTagName("tbody")[0]);
		p.appendChild(w);

		p.getElementsByTagName("thead")[0].innerHTML = ""; // czyści nagłówek tabeli o id="wynik".

		if (t) {
		/** Jeżeli wynik ma być przedstawiony w formie tekstowej, tworzy 2 elementowy nagłówek, oraz ustawia szerokość okna na 250px. */
			w = jit.cE("tr",{class:"tekst"},jit.cE("th",{},"Stan"),jit.cE("th",{},"Miejsca"));
			p.getElementsByTagName("thead")[0].appendChild(w);
			$("#wynik").dialog( "option", "width", 250 );
		}
		else {
		/** Jeżeli wynik ma być przedstawiony w formie graficznej, tworzy 11 elementowy nagłówek, oraz ustawia szerokość okna na 600px. */
			w = jit.cE("tr",{},jit.cE("th"));
			for (i = 0; i < 10; i++) {
				w.appendChild( jit.cE('th',{class:"kolor" + i},n.toFixed(0) ));
				n += parseFloat(m/10);
			}

			p.getElementsByTagName("thead")[0].appendChild(w);
			/** Zmienia elementy <div> o klasie "wykres" na paski postępu o maksymalnej wartości wynoszącej m oraz wartości a. */
			$(".wykres").each(function() {
				var a = parseInt(this.getAttribute("title"));
				$(this).progressbar({value: a, max: m});
			});
			$("#wynik").dialog( "option", "width", 600 );
		}
		$( "#wynik" ).dialog( "open" );
	},
	/**
	 * Oblicza wartości Tij dla podanych argumentów, a następnie wybiera je od najmniejszego, aż do osiągnięcia przez parametr T wartości -1.
	 * @param {number} n Liczba stanów.
	 * @param {array} D Mieszkańcy podanych stanów.
	 * @param {number} T Liczba miejsc w parlamencie.
	 * @example
	 * // returns [[1,2],[2,2],[3,1]
	 * jit.inman (3,[6,6,3],5)
	 * @return {array} Zwraca dwuwymiarową tablicę zawierającą stany i przypadającą im ilość miejsc.
	 */
	inman: function (n, D, T) {
		var a = [],
			P = new Array(n),
			i, j, d, x, y, t, b = [], w = (document.getElementById("sbs").checked) ? true : false;
		jit.log.clean();
		for (i = 0; i < n; i++)
			t += D[i];	// Oblicza ile maksymalnie osób można wybrać na podstawie podanych danych.
		if (T > t) T = t; // Jeżeli podana ilość miejsc jest większa od liczby osób zmienia ilość przydzielanych miejsc na sumę wszystkich osób.
		for (i = 0; i < n; i++) {
			P[i] = [];
			for (j = 0; j < D[i]; j++) {
				if(w)  jit.log.set_content( " i = " + (i+1) + ", j = " + (j+1) + " \n" );
				P[i][j] = jit.bulfin(j + 1, T, D[i],w).toFixed(3);	// Oblicza Tij za pomocą funkcji {@link jit#bulfin}
			}
		}
		t = 1;
		while (T--) {
			x = [];
			for (i = 0; i < n; i++)
			x.push((P[i][0]) ? P[i][0] : Infinity);	// wybiera najniższe wartości dla wszystkich i. Jeżeli tablica jest pusta przypisuje wartość Infinity.
			y = jit.arrayMinPos(x);	// Znajduje pozycję najmniejszego elementu w przekazanej tablicy.
			if(w) jit.log.set_content("k = " + t + " \n Najmniejsze Tij = " + P[y][0] + " dla i = " + (y+1) + ", usunięto ze zbioru \n");
			a.push(y + 1);
			P[y].splice(0, 1);	// usuwa najmniejszy element.
			t++
		}
		if(w) jit.log.publish();
		return jit.miejsca(a);
	},
	/**
	 * Sprawdza czy podany tekst jest kodem HTML.
	 * @param {string} e Tekst do sprawdzenia
	 */
	isHTML: function (e) {
		var t = document.createElement("div"), n, r;
		t.innerHTML = e;
		for (n = t.childNodes, r = n.length; r--;) {
			if (n[r].nodeType == 1) return true
		}
		return false
	},
	/**
	 * Sprawdza do jakiej części wykresu zalicza się podana liczba.
	 * @param {number} a 1/10 wartości największego elementu wykresu.
	 * @param {number} b Sprawdzana wartość.
	 * @example
	 * // returns 4
	 * jit.kolor(5,16)
	 * @return {number|string}
	 */
	kolor: function (a,b) {
		var c = [], i;
		for (i = 0; i<10; i++)
			c[i] = (i !== 0) ? (c[i-1] + a) : a;
		for (i = 8; i>-1; i--)
			if(b >= c[i]) return i+1;
		return "0";
	},
	/**
	 * Przechowuje i przetwarza przebieg działania algorytmu.
	 * @namespace
	 */
	log: {
		/** @type {string} */
		content: " ",
		/** Zwraca zawartość zmiennej content.
		 * @returns {string} */
		get_content: function () {return content;},
		/** Dodaje do zmiennej content zawartość zmiennej a.
		 * @param {string|number} a Tekst lub liczba, który ma zostać dodany do logu.*/
		set_content: function (a) {content += a;},
		/** Czści zawartość zmiennej content */
		clean: function () {content = "";},
		/** Przypisuje zawartość zmiennej content elementowi o id="log", po czym otwiera okno z jej zawartością. */
		publish: function () {
			document.getElementById("log").innerHTML = content;
			$("#log").dialog("open");
		}
	},
	/**
	 * Znajduje i przypisuje do odpowiedniego stanu miejsca przydzielone w parlamencie.
	 * @param {array} arr Tablica zawierająca przydzielone miejsca w parlamencie.
	 * @return {array} Zwraca dwu wymiarową tablicę.
	 */
	miejsca: function (arr) {
		var a = [],
			b = [],
			prev, i;

		arr.sort(function (a, b) {
			return a - b;
		});
		for (i = 0; i < arr.length; i++) {
			if (arr[i] !== prev) {
				a.push(arr[i]);
				b.push(1);
			} else {
				b[b.length - 1]++;
			}
			prev = arr[i];
		}
		return [a, b];
	},
	/**
	 * Wyodrębnia zawartość z pliku wczytanego przez użytkownika.
	 * @param {object} e
	 */
	readSingleFile: function (e) {
		var file = e.target.files[0];
		if (!file) {
			return;
		}
		var reader = new FileReader();
		reader.onload = function(e) {
			var contents = e.target.result;
			jit.changeForm(contents);
		};
		reader.readAsText(file);
	},
	/**
	 * Tworzy 3 okienka dialogowe (formularz, wynik, raport). Inicjalizuje elementy graficzne oraz dodaje obsługę zdarzeń wybranym elementom.
	 */
	run: function () {
		var dialog = $( "#dialog-form" ).dialog({		//okno formularza, o szerokości 400px.
			autoOpen: false,
			width: 400,
			modal: true,
			buttons: {
				"Przydziel miejsca": function() {
					$(this).dialog( "close" );
					jit.inm();
				},
				Cancel: function() {
					$(this).dialog( "close" );
				}
			}
		});
		$( "#wynik" ).dialog({	// okno wyniku
			autoOpen: false,
			minWidth: 250,
			minHeight: 400,
			modal: true,
			buttons: {
				"Nowy": jit.formularz,
				Cancel: function() {
					$(this).dialog( "close" );
				}
			}
		});
		$( "#log").dialog({	// okno raportu
			autoOpen: false,
			minWidth: 500,
			height: 600,
			buttons:{
				Cancel: function() {
					$(this).dialog("close");
				}
			}
		});
		 dialog.find( "form" ).on( "submit", function( event ) {		// umożliwia zatwierdzanie formularza przy wykorzystaniu klawisza enter.
			event.preventDefault();
			jit.inm();
			dialog.dialog( "close" );
		});

		$( "#miejsca" ).button().on( "click", jit.formularz);
		$( "#doc").button();
		$( "#opcje").buttonset();
		$( document ).tooltip();
		$( "form input[type='text']").attr("onfocus", "jit.clearInput(this)").attr("onblur","jit.checkInput(this)");	// dodaje obsługę zdarzeń focus oraz blur dla elementów input.
		document.getElementById('file-input').addEventListener('change', jit.readSingleFile, false);
		$("#tekst_l, #sbs_l").on( "click",function (){
			var a = this.getAttribute("for");
			document.getElementById(a).setAttribute("checked", (document.getElementById(a).getAttribute("checked") == "true" ? "false" : "true"));
		});
	},
	/**
	 * Tworzy obiekt HTML będący tekstem.
	 * @param {string} e Tekst do zamieszczenia
	 */
	tn: function (e){return e?document.createTextNode(e):0}
}

