const readlineSync = require('readline-sync');

let students = [];

function addStudent() {
    const name = readlineSync.question('Student name: ');
    const id = readlineSync.questionInt('Student ID: ');

    const existing = students.find(s => s.id === id);
    if (existing) {
        console.log(`Error: Student with ID ${id} already exists.`);
        return;
    }

    const numScores = readlineSync.questionInt('How many scores? ');
    const scores = [];
    for (let i = 0; i < numScores; i++) {
        const score = readlineSync.questionFloat(`Enter score ${i + 1}: `);
        scores.push(score);
    }

    students.push({ name, id, scores });
    console.log(`Student "${name}" added successfully.`);
}

function displayAllStudents() {
    if (students.length === 0) {
        console.log('\nNo students have been added yet.');
        return;
    }

    console.log('\n========================================');
    console.log('         ALL STUDENT RECORDS');
    console.log('========================================');
    console.log('Name              | ID       | Scores           | Average');
    console.log('------------------|----------|------------------|--------');

    for (const student of students) {
        const sum = student.scores.reduce((a, b) => a + b, 0);
        const avg = (sum / student.scores.length).toFixed(2);
        const scoresStr = student.scores.join(', ');

        const namePadded = student.name.padEnd(16);
        const idPadded = String(student.id).padEnd(8);
        const scoresPadded = scoresStr.padEnd(16);

        console.log(`${namePadded} | ${idPadded} | ${scoresPadded} | ${avg}`);
    }
    console.log('========================================');
}

function calculateAverage() {
    const id = readlineSync.questionInt('Enter student ID: ');
    const student = students.find(s => s.id === id);

    if (!student) {
        console.log(`Error: No student found with ID ${id}.`);
        return;
    }

    const sum = student.scores.reduce((a, b) => a + b, 0);
    const avg = (sum / student.scores.length).toFixed(2);
    console.log(`${student.name}'s average score: ${avg}`);
}

function showMenu() {
    console.log('\n================================');
    console.log('   STUDENT RECORD SYSTEM MENU');
    console.log('================================');
    console.log('1. Add student');
    console.log('2. Display all students');
    console.log('3. Calculate average score');
    console.log('4. Quit');
}

function main() {
    let choice;
    do {
        showMenu();
        choice = readlineSync.questionInt('Enter your choice (1-4): ');

        switch (choice) {
            case 1: addStudent(); break;
            case 2: displayAllStudents(); break;
            case 3: calculateAverage(); break;
            case 4: console.log('\nGoodbye!'); break;
            default: console.log('\nError: Invalid choice. Enter 1-4.');
        }
    } while (choice !== 4);
}

main();
