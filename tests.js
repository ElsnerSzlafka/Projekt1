// Przeszukiwanie jednowymiarowej tablicy
// Znajduje najwyższą liczbę w jednowymiarowej tablicy.
var jit = {
max: function () {
    var  arr = [1,2,3,4,5,6];
	var len = arr.length;
			var max = null;
			
		while (len--) {
			if (Number(arr[len]) > max) {
				max = Number(arr[len]);
			}
		}
		return max;
},
max1: function () {
    var  arr = [64,12,53,74,15,26];
	var len = arr.length;
			var max1 = null;
			
		while (len--) {
			if (Number(arr[len]) > max1) {
				max1 = Number(arr[len]);
			}
		}
		return max1;
},
max2: function () {
    var  arr = [15,244,13,24,35,66];
	var len = arr.length;
			var max2 = null;
			
		while (len--) {
			if (Number(arr[len]) > max2) {
				max2 = Number(arr[len]);
			}
		}
		return max2;
},
max3: function () {
    var  arr = [151,244,134,244,351,661];
	var len = arr.length;
			var max3 = null;
			
		while (len--) {
			if (Number(arr[len]) > max3) {
				max3 = Number(arr[len]);
			}
		}
		return max3;
},
max4: function () {
    var  arr = [41,24,134,24,351,61];
	var len = arr.length;
			var max4 = null;
			
		while (len--) {
			if (Number(arr[len]) > max4) {
				max4 = Number(arr[len]);
			}
		}
		return max4;
},
 // Zwraca pozycję najmniejszej liczby w jednowymiarowej tablicy.
pos: function () {
		var arr1 = [1,2,3,4,5,6];
		var	len1 = arr1.length;
		var	min = Infinity;
		var	pos = null;
		while (len1--) {
			if (Number(arr1[len1]) < min) {
				min = Number(arr1[len1]);
				pos = len1;
			}
		}
		return pos;
},
pos1: function () {
		var arr1 = [17,22,13,4,45,56];
		var	len1 = arr1.length;
		var	min = Infinity;
		var	pos1 = null;
		while (len1--) {
			if (Number(arr1[len1]) < min) {
				min = Number(arr1[len1]);
				pos1 = len1;
			}
		}
		return pos1;
},
pos2: function () {
		var arr1 = [17,22,13,44,45,56];
		var	len1 = arr1.length;
		var	min = Infinity;
		var	pos2 = null;
		while (len1--) {
			if (Number(arr1[len1]) < min) {
				min = Number(arr1[len1]);
				pos2 = len1;
			}
		}
		return pos2;
},
pos3: function () {
		var arr1 = [171,222,143,544,425,66];
		var	len1 = arr1.length;
		var	min = Infinity;
		var	pos3 = null;
		while (len1--) {
			if (Number(arr1[len1]) < min) {
				min = Number(arr1[len1]);
				pos3 = len1;
			}
		}
		return pos3;
},
pos4: function () {
		var arr1 = [71,12,14,5,45,76];
		var	len1 = arr1.length;
		var	min = Infinity;
		var	pos4 = null;
		while (len1--) {
			if (Number(arr1[len1]) < min) {
				min = Number(arr1[len1]);
				pos4 = len1;
			}
		}
		return pos4;
},
//Oblicza wartość Tij na podstawie wzoru Tij = ((j-1/2)*k)/D[i
bulfin: function () {
		var k = 4;
		var T = 8;
		var d = 14;
		var w = null;
		var bulfin = ((k - 0.5) * T) / d
		if (w) jit.log.set_content("Tij = ((" + k + " - 0,5) * " + T + ") /" + d + " = " +  a + " \n");
		return bulfin;
	},
	bulfin1: function () {
		var k = 19;
		var T = 3;
		var d = 5;
		var w = null;
		var bulfin1 = ((k - 0.5) * T) / d
		if (w) jit.log.set_content("Tij = ((" + k + " - 0,5) * " + T + ") /" + d + " = " +  a + " \n");
		return bulfin1;
	},
	bulfin2: function () {
		var k = 144;
		var T = 245;
		var d = 89;
		var w = null;
		var bulfin2 = ((k - 0.5) * T) / d
		if (w) jit.log.set_content("Tij = ((" + k + " - 0,5) * " + T + ") /" + d + " = " +  a + " \n");
		return bulfin2;
	},
	bulfin3: function () {
		var k = 15;
		var T = 5;
		var d = 9;
		var w = null;
		var bulfin3 = ((k - 0.5) * T) / d
		if (w) jit.log.set_content("Tij = ((" + k + " - 0,5) * " + T + ") /" + d + " = " +  a + " \n");
		return bulfin3;
	},
	bulfin4: function () {
		var k = 74;
		var T = 45;
		var d = 11;
		var w = null;
		var bulfin4 = ((k - 0.5) * T) / d
		if (w) jit.log.set_content("Tij = ((" + k + " - 0,5) * " + T + ") /" + d + " = " +  a + " \n");
		return bulfin4;
	},
		
		

};
   QUnit.test('max', function (assert) {
	assert.strictEqual(jit.max(), 6, 'Działa poprawnie, tablica [1,2,3,4,5,6] Max to 6');
    assert.notEqual(jit.max(), jit.pos(), 'funkcja działa poprawnie, MAX (6) != Min (1)');
	assert.strictEqual(jit.max1(), 74, 'Działa poprawnie,tablica [64,12,53,74,15,26] Max to 74');
	assert.notEqual(jit.max1(), jit.pos1(), 'funkcja działa poprawnie, MAX (74) != Min (12)');
	assert.strictEqual(jit.max2(), 244, 'Działa poprawnie, tablica [15,244,13,24,35,66] Max to 244');
	assert.notEqual(jit.max2(), jit.pos2(), 'funkcja działa poprawnie, MAX (244) != Min (13)');
	assert.strictEqual(jit.max3(), 661, 'Działa poprawnie, tablica [151,244,134,244,351,661] Max to 661');
	assert.notEqual(jit.max3(), jit.pos3(), 'funkcja działa poprawnie, MAX (661) != Min (134)');
	assert.strictEqual(jit.max4(), 351, 'Działa poprawnie, tablica [41,24,134,24,351,61] Max to 351');
	assert.notEqual(jit.max4(), jit.pos4(), 'funkcja działa poprawnie, MAX (351) != Min (24)');	
		assert.ok(jit.pos, 'Wartość istnieje, to 1');
		assert.strictEqual(jit.pos(), 0, 'Działa poprawnie, tablica [1,2,3,4,5,6] pozycja minimalnej wartosci to 0');
		assert.ok(jit.pos1, 'Wartość istnieje, to 4');
		assert.strictEqual(jit.pos1(), 3, 'Działa poprawnie, tablica [17,22,13,4,45,56] pozycja minimalnej wartosci to 3');
		assert.ok(jit.pos2, 'Wartość istnieje, to 13');
		assert.strictEqual(jit.pos2(), 2, 'Działa poprawnie, tablica [24,22,13,89,45,87] pozycja minimalnej wartosci to 2');
		assert.ok(jit.pos3, 'Wartość istnieje, to 66');
		assert.strictEqual(jit.pos3(), 5, 'Działa poprawnie, tablica [171,222,143,544,425,66] pozycja minimalnej wartosci to 5');
		assert.ok(jit.pos4, 'Wartość istnieje, to 14');
		assert.strictEqual(jit.pos4(), 3, 'Działa poprawnie, tablica [71,12,14,5,45,76] pozycja minimalnej wartosci to 3');
			assert.strictEqual(jit.bulfin(), 2, 'Działa poprawnie,Dla danych: k = 4 T = 8 d = 14, Inman-Bulfin ((k-0,5)*T)/d to wartosc  2');
			assert.strictEqual(jit.bulfin1(), 11.1, 'Działa poprawnie,Dla danych: k = 19 T = 3 d = 5, Inman-Bulfin ((k-0,5)*T)/d to wartosc  11.1');
			assert.strictEqual(jit.bulfin2(), 395.0280898876405, 'Działa poprawnie,Dla danych: k = 144 T = 245 d = 89, Inman-Bulfin ((k-0,5)*T)/d to wartosc  395');
			assert.strictEqual(jit.bulfin3(), 8.055555555555555, 'Działa poprawnie,Dla danych: k = 15 T = 5 d = 9, Inman-Bulfin ((k-0,5)*T)/d to wartosc  8');
			assert.strictEqual(jit.bulfin4(), 300.6818181818182, 'Działa poprawnie,Dla danych: k = 74 T = 45 d = 11, Inman-Bulfin ((k-0,5)*T)/d to wartosc  300');
});
	
	
	
	
	