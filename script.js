const taskInput = document.querySelector('.task-input input');
const categorySelect = document.querySelector('.task-input select');
const addButton = document.querySelector('.task-input button');
const filterSelect = document.getElementById('category');
const taskList = document.getElementById('task-list');
const clearButton = document.querySelector('.clear-btn');

let tasks = [];

// render tasks based on the selected filter
function renderTasks(filter = 'All') {
    taskList.innerHTML = ''; 
    tasks.forEach((task, index) => {
        if (filter === 'All' || task.category === filter) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="task-item">
                    <span class="${task.completed ? 'completed' : ''}">${task.name} - <strong>${task.category}</strong></span>
                    <div>
                        <button class="complete-btn" onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                        <button class="remove-btn" onclick="removeTask(${index})">Remove</button>
                    </div>
                </div>
            `;
            taskList.appendChild(li);
        }
    });
}

// Function to add a new task
function addTask() {
    const taskName = taskInput.value.trim();
    const taskCategory = categorySelect.value;

    if (taskName) {
        tasks.push({ name: taskName, category: taskCategory, completed: false });
        taskInput.value = '';  
        renderTasks(filterSelect.value);
    }
}

// Function to toggle the completion status of a task
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks(filterSelect.value);
}

// Function to remove a specific task
function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks(filterSelect.value);
}

// Function to clear all tasks
function clearAllTasks() {
    tasks = [];
    renderTasks(filterSelect.value);
}

// Event listeners
addButton.addEventListener('click', addTask);
clearButton.addEventListener('click', clearAllTasks);
filterSelect.addEventListener('change', () => renderTasks(filterSelect.value));

// Initial render
renderTasks();
