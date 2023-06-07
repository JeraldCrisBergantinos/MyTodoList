// Retrieve tasks from local storage
function getTasks() {
    let tasks = [];
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    const task = taskInput.value.trim();
    if (task !== '') {
        const tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));
    li.addEventListener('click', function() {
        removeTask(this);
    });
    taskList.appendChild(li);

    taskInput.value = '';
}

// Remove a task
function removeTask(taskItem) {
    const taskText = taskItem.innerText;
    const tasks = getTasks();
    const updatedTasks = tasks.filter(function(task) {
        return task !== taskText;
    });
    saveTasks(updatedTasks);

    taskItem.remove();
}

// Display tasks from local storage on page load
window.addEventListener('DOMContentLoaded', function() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task));
        li.addEventListener('click', function() {
            removeTask(this);
        });
        taskList.appendChild(li);
    });
});