import 'babel-polyfill';
import assert from 'assert';
import {perdag} from '../perdag.js';

describe('Personal Data Generator', function () {
	it('should have init method', function () {
		assert.equal(typeof perdag, 'object');
		assert.equal(typeof perdag.init, 'function');
	});

	it('should have generate method', function () {
		assert.equal(typeof perdag, 'object');
		assert.equal(typeof perdag.generate, 'function');
	});
});