import 'babel-polyfill';
import assert from 'assert';
import {perdag} from '../perdag.js';

describe('perdag', () => {
	it('should have generate method', () => {
		assert.equal(typeof perdag, 'object');
		assert.equal(typeof perdag.generate, 'function');
	});

	describe('.generate()', () => {
		it ('should give a valid date', () => {
			let person = perdag.generate()[0];
			assert.equal(!!person, true);
			assert.equal(!!person.birthDate, true);
		});
	});

	// describe('.generate()', () => {
	// 	console.log(perdag.generate({number: 10}));
	// });

});