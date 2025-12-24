/**
 * Hello World - AssemblyScript Example
 *
 * A simple WebAssembly module demonstrating AssemblyScript basics.
 */

// Global counter state
let counter: i32 = 0;

/**
 * Returns a greeting message.
 */
export function greet(): string {
  return 'Hello, World!';
}

/**
 * Returns a personalized greeting.
 * @param name - The name to greet
 */
export function greetName(name: string): string {
  return name.length === 0 ? 'Hello, stranger!' : `Hello, ${name}!`;
}

/**
 * Adds two numbers together.
 */
export function add(a: i32, b: i32): i32 {
  return a + b;
}

/**
 * Subtracts b from a.
 */
export function subtract(a: i32, b: i32): i32 {
  return a - b;
}

/**
 * Multiplies two numbers.
 */
export function multiply(a: i32, b: i32): i32 {
  return a * b;
}

/**
 * Divides a by b. Returns 0 if dividing by zero.
 */
export function divide(a: i32, b: i32): i32 {
  return b === 0 ? 0 : a / b;
}

/**
 * Calculates the factorial of a number using iteration.
 * @param n - The number to calculate factorial for
 */
export function factorial(n: i32): i32 {
  if (n <= 1) return 1;
  let result: i32 = 1;
  for (let i: i32 = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculates the nth Fibonacci number using iteration.
 * @param n - The index in the Fibonacci sequence
 */
export function fibonacci(n: i32): i32 {
  if (n <= 1) return n;
  let a: i32 = 0;
  let b: i32 = 1;
  for (let i: i32 = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

/**
 * Reverses a string.
 * @param str - The string to reverse
 */
export function reverseString(str: string): string {
  const len = str.length;
  if (len <= 1) return str;

  // Build reversed string character by character
  let result = '';
  for (let i: i32 = len - 1; i >= 0; i--) {
    result += String.fromCharCode(str.charCodeAt(i));
  }
  return result;
}

/**
 * Returns the length of a string.
 * @param str - The string to count
 */
export function countCharacters(str: string): i32 {
  return str.length;
}

/**
 * Checks if a number is even using bitwise operation.
 * @param n - The number to check
 */
export function isEven(n: i32): bool {
  return (n & 1) === 0;
}

/**
 * Increments the global counter and returns the new value.
 */
export function increment(): i32 {
  return ++counter;
}

/**
 * Resets the global counter to 0.
 */
export function resetCounter(): i32 {
  counter = 0;
  return counter;
}

/**
 * Gets the current counter value.
 */
export function getCounter(): i32 {
  return counter;
}

/**
 * Calculates the sum of an array of numbers.
 * @param numbers - Array of numbers to sum
 */
export function sumArray(numbers: Array<i32>): i32 {
  let sum: i32 = 0;
  for (let i: i32 = 0; i < numbers.length; i++) {
    sum += unchecked(numbers[i]);
  }
  return sum;
}

/**
 * Finds the maximum value in an array.
 * @param numbers - Array of numbers
 */
export function maxArray(numbers: Array<i32>): i32 {
  const len = numbers.length;
  if (len === 0) return 0;

  let max: i32 = unchecked(numbers[0]);
  for (let i: i32 = 1; i < len; i++) {
    const val = unchecked(numbers[i]);
    if (val > max) max = val;
  }
  return max;
}

/**
 * Finds the minimum value in an array.
 * @param numbers - Array of numbers
 */
export function minArray(numbers: Array<i32>): i32 {
  const len = numbers.length;
  if (len === 0) return 0;

  let min: i32 = unchecked(numbers[0]);
  for (let i: i32 = 1; i < len; i++) {
    const val = unchecked(numbers[i]);
    if (val < min) min = val;
  }
  return min;
}
