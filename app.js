// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Call function to load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear all task events
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Add task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element from scratch
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element for the delete icon
  const link = document.createElement('a');
  // Add class - needs to have secondary-content in order to align it to the right with Materialize
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Clear input
  taskInput.value = '';


  e.preventDefault();
}

// Remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
    e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear tasks
function clearTasks() {
  // You could do this but its slower:
  // taskList.innerHTML = '';

  // Faster option:
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // We can use forEach below because querySelectorAll returns node list
  document.querySelectorAll('.collection-item').forEach
  (function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}