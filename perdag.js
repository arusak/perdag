import {nameData} from './data/name-data.js';

export const perdag = {generate};
let initialized = false;

function generate(options = {number: 1}) {
	let data = [];

	if (!initialized) init();

	for (let i = 0; i < options.number; i++) {
		let person = {};
		let sex = options.sex || (Math.random() < 0.5 ? 'males' : 'females');

		['last', 'first', 'middle'].forEach(nameType => person[nameType] = generateName(nameType, sex));
		person.homePhone = generatePhone('495');
		person.cellPhone = generatePhone('9');

		person.birthDate = generateBirthDate();

		data.push(person);
	}

	return data;
}

function generateName(which, sex) {
	const haystack = nameData[sex][which];
	let needle;

	while (!needle) {
		let p = Math.random() / 100;
		let randomItemNumber = Math.floor(Math.random() * haystack.length);
		console.log(p, haystack[randomItemNumber].c, haystack.total, haystack[randomItemNumber].c / haystack.total);
		if (haystack[randomItemNumber].c / haystack.total > p) {
			needle = haystack[randomItemNumber];
		}
	}

	return needle.n;
}

function generatePhone(prefix) {
	if (!prefix) prefix = '495';
	let variablePartLength = 10 - prefix.length;
	let result = [];

	result.push(prefix);

	for (let i = 0; i < variablePartLength; i++) {
		result.push(generateRandomDigit());
	}

	return result.join('');
}

function generateBirthDate() {
	let minAge = 18;
	let maxAge = 65;
	// тупо считаем, что у нас всех возрастов поровну
	let age = Math.floor((Math.random() * (maxAge - minAge)) + minAge);
	let today = new Date();
	// немного дурацкий алгоритм, из-за переполнений вероятность даты 1 мая, 1 декабря и пр. в 2 раза больше
	return new Date(today.getFullYear() - age, Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 31) + 1)
}

function generateRandomDigit() {
	return Math.floor(Math.random() * 10) + '';
}

function init() {
	Object.keys(nameData).forEach(key1 => {
		let level1 = nameData[key1];
		Object.keys(level1).forEach(key2 => {
			let level2 = level1[key2];
			countDictionaryTotal(level2);
		});
	});

	initialized = true;
}

function countDictionaryTotal(dictionary) {
	dictionary.total = dictionary.reduce((total, cur) => {
		total += cur.c;
		return total;
	}, 0);
}
