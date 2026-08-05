const readlineSync = require('readline-sync');

let tasks = [];

function addTask() {
    const task = readlineSync.question('Enter task: ');
    tasks.push(task);
    console.log(`Task added: "${task}"`);
}

function viewTasks() {
    if (tasks.length === 0) {
        console.log('\nYour task list is empty. Add some tasks!');
        return;
    }
    console.log('\nYour Tasks:');
    for (let i = 0; i < tasks.length; i++) {
        console.log(`${i + 1}. ${tasks[i]}`);
    }
}

function deleteTask() {
    if (tasks.length === 0) {
        console.log('\nNo tasks to delete.');
        return;
    }
    viewTasks();
    const num = readlineSync.questionInt('\nEnter task number to delete: ');
    if (num < 1 || num > tasks.length) {
        console.log(`Error: Invalid task number. Please enter 1-${tasks.length}.`);
        return;
    }
    const removed = tasks.splice(num - 1, 1)[0];
    console.log(`Task "${removed}" has been removed.`);
}

function showMenu() {
    console.log('\n============================');
    console.log('       TO-DO LIST MENU');
    console.log('============================');
    console.log('1. Add task');
    console.log('2. View tasks');
    console.log('3. Delete task');
    console.log('4. Quit');
}

function main() {
    let choice;
    do {
        showMenu();
        choice = readlineSync.questionInt('Enter your choice (1-4): ');
        switch (choice) {
            case 1: addTask(); break;
            case 2: viewTasks(); break;
            case 3: deleteTask(); break;
            case 4: console.log('\nGoodbye!'); break;
            default: console.log('\nError: Invalid choice. Enter 1-4.');
        }
    } while (choice !== 4);
}

main();
