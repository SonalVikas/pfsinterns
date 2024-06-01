

document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date');
    const categoryInput = document.getElementById('category');
    const taskList = document.getElementById('task-list');
    const showCompletedCheckbox = document.getElementById('show-completed');
    const sortBySelect = document.getElementById('sort-by');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        let filteredTasks = tasks.filter(task => showCompletedCheckbox.checked || !task.completed);
        if (sortBySelect.value === 'due-date') {
            filteredTasks.sort((a, b) => a.dueDate - b.dueDate);
        } else if (sortBySelect.value === 'category') {
            filteredTasks.sort((a, b) => a.category.localeCompare(b.category));
        }
        filteredTasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="${task.completed ? 'completed' : ''}">${task.name} - Due: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'} - Category: ${task.category}</span>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = taskInput.value.trim();
        const dueDate = dueDateInput.value ? new Date(dueDateInput.value) : null;
        const category = categoryInput.value;
        if (taskName !== '') {
            tasks.push({ name: taskName, completed: false, dueDate, category });
            taskInput.value = '';
            dueDateInput.value = '';
            renderTasks();
        }
    });

    taskList.addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            const index = event.target.parentElement.querySelector('.edit-btn').dataset.index;
            tasks[index].completed = event.target.checked;
            renderTasks();
        }
    });

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            tasks.splice(index, 1);
            renderTasks();
        } else if (event.target.classList.contains('edit-btn')) {
            const index = event.target.dataset.index;
            const newName = prompt('Edit Task', tasks[index].name);
            if (newName !== null) {
                tasks[index].name = newName.trim();
                renderTasks();
            }
        }
    });

    showCompletedCheckbox.addEventListener('change', renderTasks);

    sortBySelect.addEventListener('change', renderTasks);

    renderTasks();
});
