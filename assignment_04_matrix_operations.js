// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');
// Helper function to read a matrix from user input
function readMatrix(label) {
    const rows = readlineSync.questionInt(`Enter number of rows for ${label}: `);
    const cols = readlineSync.questionInt(`Enter number of columns for ${label}: `);
    
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const rowInput = readlineSync.question(`Enter row ${i + 1} (space-separated): `);
        const row = rowInput.split(' ').map(Number);
        
        if (row.length !== cols) {
            console.log(`Error: Expected ${cols} numbers but got ${row.length}. Try again.`);
            i--; // Retry this row
            continue;
        }
        matrix.push(row);
    }
    return { matrix, rows, cols };
}

// Helper function to print a matrix neatly
function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let rowStr = '';
        for (let j = 0; j < matrix[i].length; j++) {
            rowStr += matrix[i][j].toString().padStart(4) + ' ';
        }
        console.log(rowStr);
    }
}

// PART A: Transpose
function transpose(matrix, rows, cols) {
    const result = [];
    for (let j = 0; j < cols; j++) {
        const newRow = [];
        for (let i = 0; i < rows; i++) {
            newRow.push(matrix[i][j]);
        }
        result.push(newRow);
    }
    return result;
}

// PART B: Add Two Matrices
function addMatrices(a, b, rows, cols) {
    const result = [];
    for (let i = 0; i < rows; i++) {
        const newRow = [];
        for (let j = 0; j < cols; j++) {
            newRow.push(a[i][j] + b[i][j]);
        }
        result.push(newRow);
    }
    return result;
}

// PART C: Multiply Two Matrices
function multiplyMatrices(a, aRows, aCols, b, bRows, bCols) {
    if (aCols !== bRows) {
        console.log('Error: Cannot multiply. Columns of A must equal Rows of B.');
        return null;
    }
    
    const result = [];
    for (let i = 0; i < aRows; i++) {
        const newRow = [];
        for (let j = 0; j < bCols; j++) {
            let sum = 0;
            for (let k = 0; k < aCols; k++) {
                sum += a[i][k] * b[k][j];
            }
            newRow.push(sum);
        }
        result.push(newRow);
    }
    return result;
}

function main() {
    console.log('\n=== MATRIX OPERATIONS ===\n');

    // Part A: Transpose
    console.log('--- Part A: Transpose ---');
    const m1 = readMatrix('Matrix A');
    console.log('\nOriginal Matrix:');
    printMatrix(m1.matrix);
    console.log('\nTransposed Matrix:');
    const transposed = transpose(m1.matrix, m1.rows, m1.cols);
    printMatrix(transposed);

    // Part B: Addition
    console.log('\n--- Part B: Addition ---');
    const m2 = readMatrix('Matrix A');
    const m3 = readMatrix('Matrix B');
    
    if (m2.rows === m3.rows && m2.cols === m3.cols) {
        console.log('\nSum of Matrices:');
        const sum = addMatrices(m2.matrix, m3.matrix, m2.rows, m2.cols);
        printMatrix(sum);
    } else {
        console.log('Error: Matrices must have same dimensions for addition.');
    }

    // Part C: Multiplication
    console.log('\n--- Part C: Multiplication ---');
    const mA = readMatrix('Matrix A');
    const mB = readMatrix('Matrix B');
    
    console.log('\nProduct A x B:');
    const product = multiplyMatrices(mA.matrix, mA.rows, mA.cols, mB.matrix, mB.rows, mB.cols);
    if (product) printMatrix(product);
}

main();
