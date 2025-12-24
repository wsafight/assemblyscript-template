/**
 * WebAssembly Module Tests
 *
 * Tests for the compiled AssemblyScript module.
 */

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import assert from 'node:assert';

// The generated JavaScript loader exports all functions directly
import * as wasm from '../build/release.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BUILD_PATH = join(__dirname, '..', 'build', 'release.wasm');

describe('Wasm Module Loading', () => {
  it('should load the WebAssembly file', () => {
    const buffer = readFileSync(BUILD_PATH);
    assert(buffer.length > 0, 'WASM file should exist and have content');
    console.log(`WASM size: ${buffer.length} bytes (${(buffer.length / 1024).toFixed(2)} KB)`);
  });

  it('should have all expected exports', async () => {
    // Functions are loaded asynchronously
    const exports = await wasm;
    assert(typeof exports.greet === 'function', 'greet should be a function');
    assert(typeof exports.add === 'function', 'add should be a function');
    assert(typeof exports.subtract === 'function', 'subtract should be a function');
    assert(typeof exports.multiply === 'function', 'multiply should be a function');
    assert(typeof exports.divide === 'function', 'divide should be a function');
    assert(typeof exports.factorial === 'function', 'factorial should be a function');
    assert(typeof exports.fibonacci === 'function', 'fibonacci should be a function');
    assert(typeof exports.reverseString === 'function', 'reverseString should be a function');
    assert(typeof exports.countCharacters === 'function', 'countCharacters should be a function');
    assert(typeof exports.isEven === 'function', 'isEven should be a function');
    assert(typeof exports.increment === 'function', 'increment should be a function');
    assert(typeof exports.resetCounter === 'function', 'resetCounter should be a function');
    assert(typeof exports.getCounter === 'function', 'getCounter should be a function');
    assert(typeof exports.sumArray === 'function', 'sumArray should be a function');
    assert(typeof exports.maxArray === 'function', 'maxArray should be a function');
    assert(typeof exports.minArray === 'function', 'minArray should be a function');
  });
});

describe('String Functions', () => {
  it('greet() should return "Hello, World!"', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.greet(), 'Hello, World!');
  });

  it('greetName() should return personalized greeting', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.greetName('AssemblyScript'), 'Hello, AssemblyScript!');
    assert.strictEqual(exports.greetName(''), 'Hello, stranger!');
    assert.strictEqual(exports.greetName('Alice'), 'Hello, Alice!');
  });

  it('reverseString() should reverse strings', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.reverseString('hello'), 'olleh');
    assert.strictEqual(exports.reverseString('AssemblyScript'), 'tpircSylbmessA');
    assert.strictEqual(exports.reverseString(''), '');
    assert.strictEqual(exports.reverseString('a'), 'a');
  });

  it('countCharacters() should return string length', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.countCharacters('hello'), 5);
    assert.strictEqual(exports.countCharacters(''), 0);
    assert.strictEqual(exports.countCharacters('AssemblyScript'), 14);
  });
});

describe('Math Functions', () => {
  it('add() should add two numbers', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.add(2, 3), 5);
    assert.strictEqual(exports.add(-1, 1), 0);
    assert.strictEqual(exports.add(0, 0), 0);
  });

  it('subtract() should subtract two numbers', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.subtract(5, 3), 2);
    assert.strictEqual(exports.subtract(1, 1), 0);
    assert.strictEqual(exports.subtract(0, 5), -5);
  });

  it('multiply() should multiply two numbers', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.multiply(2, 3), 6);
    assert.strictEqual(exports.multiply(-2, 3), -6);
    assert.strictEqual(exports.multiply(0, 100), 0);
  });

  it('divide() should divide two numbers', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.divide(6, 3), 2);
    assert.strictEqual(exports.divide(5, 2), 2);
    assert.strictEqual(exports.divide(10, 0), 0); // Division by zero returns 0
  });

  it('factorial() should calculate factorial', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.factorial(0), 1);
    assert.strictEqual(exports.factorial(1), 1);
    assert.strictEqual(exports.factorial(5), 120);
    assert.strictEqual(exports.factorial(7), 5040);
  });

  it('fibonacci() should calculate fibonacci numbers', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.fibonacci(0), 0);
    assert.strictEqual(exports.fibonacci(1), 1);
    assert.strictEqual(exports.fibonacci(2), 1);
    assert.strictEqual(exports.fibonacci(10), 55);
    assert.strictEqual(exports.fibonacci(20), 6765);
  });

  it('isEven() should check if number is even', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.isEven(2), true);
    assert.strictEqual(exports.isEven(3), false);
    assert.strictEqual(exports.isEven(0), true);
    assert.strictEqual(exports.isEven(-2), true);
    assert.strictEqual(exports.isEven(-3), false);
  });
});

describe('Counter Functions', () => {
  it('should increment counter', async () => {
    const exports = await wasm;
    exports.resetCounter();
    assert.strictEqual(exports.getCounter(), 0);
    assert.strictEqual(exports.increment(), 1);
    assert.strictEqual(exports.increment(), 2);
    assert.strictEqual(exports.getCounter(), 2);
  });

  it('should reset counter', async () => {
    const exports = await wasm;
    exports.increment();
    exports.increment();
    assert.strictEqual(exports.resetCounter(), 0);
    assert.strictEqual(exports.getCounter(), 0);
  });
});

describe('Array Functions', () => {
  it('sumArray() should sum array elements', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.sumArray([1, 2, 3, 4, 5]), 15);
    assert.strictEqual(exports.sumArray([]), 0);
    assert.strictEqual(exports.sumArray([-1, 1, 0]), 0);
  });

  it('maxArray() should find maximum value', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.maxArray([1, 5, 3, 9, 2]), 9);
    assert.strictEqual(exports.maxArray([-5, -1, -10]), -1);
    assert.strictEqual(exports.maxArray([42]), 42);
  });

  it('minArray() should find minimum value', async () => {
    const exports = await wasm;
    assert.strictEqual(exports.minArray([1, 5, 3, 9, 2]), 1);
    assert.strictEqual(exports.minArray([-5, -1, -10]), -10);
    assert.strictEqual(exports.minArray([42]), 42);
  });
});
