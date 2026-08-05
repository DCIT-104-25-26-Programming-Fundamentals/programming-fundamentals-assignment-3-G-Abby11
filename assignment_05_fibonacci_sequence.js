// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 5
// =============================================================================
//
// TASK: Fibonacci Sequence Generator
//
// The Fibonacci sequence is a series of numbers where each number is the sum
// of the two numbers before it:
//
//   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
//
// Write a JavaScript program with TWO parts, each implemented as a function.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_05_fibonacci_sequence.js
//
// -----------------------------------------------------------------------------
// PART A — Print the First N Terms
// -----------------------------------------------------------------------------
// - Ask the user how many terms (N) to display.
// - Print the first N numbers of the Fibonacci sequence on one line.
//
// Example:
//   How many terms? 7
//   Fibonacci sequence: 0 1 1 2 3 5 8
//
// -----------------------------------------------------------------------------
// PART B — Check if a Number Belongs to the Sequence
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Determine whether that number is a Fibonacci number.
// - Print an appropriate message.
//
// Example:
//   Enter a number to check: 13
//   13 is a Fibonacci number.
//
//   Enter a number to check: 20
//   20 is NOT a Fibonacci number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use a loop (not recursion) to generate the sequence in both parts.
// - N must be a positive integer. If it is not, print an error message.
// - Each part must be implemented in its own function (see scaffold below).
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require('readline-sync');

// PART A: Print first N Fibonacci terms
function printFibonacci(n) {
    if (n <= 0) {
        console.log('Error: Please enter a positive integer.');
        return;
    }

    let prev2 = 0;
    let prev1 = 1;
    let sequence = '';

    for (let i = 0; i < n; i++) {
        if (i === 0) {
            sequence += '0';
        } else if (i === 1) {
            sequence += ' 1';
        } else {
            const current = prev1 + prev2;
            sequence += ' ' + current;
            prev2 = prev1;
            prev1 = current;
        }
    }

    console.log(`Fibonacci sequence: ${sequence}`);
}

// PART B: Check if a number is in the Fibonacci sequence
function isFibonacci(num) {
    if (num < 0) return false;
    if (num === 0 || num === 1) return true;

    let prev2 = 0;
    let prev1 = 1;

    while (true) {
        const current = prev1 + prev2;
        if (current === num) return true;
        if (current > num) return false;

        prev2 = prev1;
        prev1 = current;
    }
}

function main() {
    // Part A
    const n = readlineSync.questionInt('How many terms? ');
    printFibonacci(n);

    // Part B
    const checkNum = readlineSync.questionInt('\nEnter a number to check: ');
    if (isFibonacci(checkNum)) {
        console.log(`${checkNum} is a Fibonacci number.`);
    } else {
        console.log(`${checkNum} is NOT a Fibonacci number.`);
    }
}

main();
