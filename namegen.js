import {nameData} from './data/name-data.js';

export const namegen = { generate, init };

function generate(options) {
	var data = [];

	for (let i = 0; i < options.number; i++) {
		let person = {};
		let sex = options.sex || (Math.random() < 0.5 ? 'males' : 'females');

		['last', 'first', 'middle'].forEach(nameType => person[nameType] = generateName(nameType, sex));

		data.push(person);
	}

	return data;
}

function generateName(which, sex) {
	const haystack = nameData[sex][which];
	var needle;

	while (!needle) {
		let p = Math.random() / 100;
		let randomItemNumber = Math.floor(Math.random() * haystack.length);
		//console.log(p, haystack[randomItemNumber].c, haystack.total, haystack[randomItemNumber].c / haystack.total);
		if (haystack[randomItemNumber].c / haystack.total > p) {
			needle = haystack[randomItemNumber];
		}
	}

	return needle.n;
}

function init() {
	Object.keys(nameData).forEach(key1 => {
		var level1 = nameData[key1];
		Object.keys(level1).forEach(key2 => {
			var level2 = level1[key2];
			countDictionaryTotal(level2);
		});
	});
}

function countDictionaryTotal(dictionary) {
	dictionary.total = dictionary.reduce((total, cur) => {
		total += cur.c;
		return total;
	}, 0);
}
