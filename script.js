document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const clearAllButton = document.getElementById('clear-all');

    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${task}
                <button class="delete-task" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    addTaskButton.addEventListener('click', () => {
        const newTask = taskInput.value.trim();
        if (newTask) {
            tasks.push(newTask);
            saveTasks();
            taskInput.value = '';
            renderTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-task')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    clearAllButton.addEventListener('click', () => {
        tasks.length = 0;
        saveTasks();
        renderTasks();
    });

    renderTasks();
});
