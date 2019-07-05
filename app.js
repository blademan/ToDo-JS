const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');

// Load all event listeners
loadEventListener();


// Load all event Listeners
function loadEventListener(){
// DOM Load event
document.addEventListener('DOMContentLoaded', getTasks);
// ADD task event
form.addEventListener('submit', addTask);

// Remove task
taskList.addEventListener('click', removeTask);

//Clear ALL tasks 
clearBtn.addEventListener('click', clearTasks );
//Filter tasks event
filter.addEventListener('keyup', filterTasks );


}


// get tasks from Local Store
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
// ADD class for li element
li.className = 'collection-item';
//create text Node
li.appendChild(document.createTextNode(task));
// Create NEW link elemet
const link = document.createElement('a');
// ADD icon to link element
link.innerHTML = '<i class="fa fa-remove"></i>';
//ADD class to link elemet
link.className = 'delete-item secondary-content';
// APpend link to li element
li.appendChild(link);
//Append li to UL
taskList.appendChild(li);
    });
}
//Add task
function addTask(e){
// Check if task input is not empty
if(taskInput.value === ''){
    alert('Please Add Task');
} else {
// Create li element
const li = document.createElement('li');
// ADD class for li element
li.className = 'collection-item';
//create text Node
li.appendChild(document.createTextNode(taskInput.value));
// Create NEW link elemet
const link = document.createElement('a');
// ADD icon to link element
link.innerHTML = '<i class="fa fa-remove"></i>';
//ADD class to link elemet
link.className = 'delete-item secondary-content';
// APpend link to li element
li.appendChild(link);
//Append li to UL
taskList.appendChild(li);


// Store tasks in local storage
storeTaskInLocalStorage(taskInput.value);
// Clear input
taskInput.value = '';

    // Prevent default action
    e.preventDefault();
}
}

//store task in LOCAL storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove from local storage

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

            //remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

function clearTasks(){
    taskList.innerHTML = '';
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
  }

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.textContent;

        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}