// Understand the differece between how to use let and const keywords

// 2D Array to store tasks - each task is [taskText, priority]
// We are using let keyword here
let tasks = [];

// Array of random tasks for the random task feature - focused on health and student wellness
// We are using const keyword here
const randomTasks = [
  "Take a short walk",
  "Drink a glass of water",
  "Stretch for 5 minutes",
  "Practice deep breathing for 2 minutes",
  "Stand up and move around for 5 minutes",
  "Do a quick meditation session",
  "Write in a gratitude journal",
  "Have a healthy snack",
  "Rest your eyes for 2 minutes",
  "Fix your posture",
  "Do a quick workout",
  "Call a friend or family member",
  "Take a short nap",
  "Listen to calming music",
  "Drink a cup of tea",
  "Practice mindfulness for 5 minutes",
  "Step outside for fresh air",
  "Do a quick stretching routine"
];

// Get DOM elements
// TODO
/* 1. create a constant variable named 'taskInput' and assign it the DOM element with id 'task-input'
   2. create a constant variable named 'priorityInput' and assign it the DOM element with id 'priority-input'
   3. create a constant variable named 'taskList' and assign it the DOM element with id 'task-list'
*/
const taskInput = document.getElementById("task-input");
const priorityInput = document.getElementById("priority-input");
const taskList = document.getElementById("task-list");


// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  const priority = priorityInput.value;
  
  if (taskText === '') {
    alert('Please enter a task first!');
    return;
  }
  
  // Create task array [taskText, priority]
  const task = [taskText, priority];
  
  // TODO
  /* 1. add the new task to the 'tasks' array using the push() method
     2. call the sortTasksByPriority() function to sort tasks by priority
     3. call the updateTaskDisplay() function to update the visual display
     4. call the clearInput() function to reset the input fields
  */
  tasks.push(task);
  sortTasksByPriority();
  updateTaskDisplay();
  clearInput();

}

// Function to add a random task
// TODO
/* 1. create a randomIndex by using Math.floor and Math.random to get a random index between 0 and randomTasks.length-1
   2. get the random task string from the randomTasks array using the randomIndex
   3. set the taskInput's value to the random task string
   4. call priorityInput.focus() to shift focus to the priority dropdown
*/
function addRandomTask() {
  let randomIndex = Math.floor(Math.random() * randomTasks.length);
  let randomTask = randomTasks[randomIndex];
  taskInput.value = randomTask;
  
  priorityInput.focus();
}

// Function to sort tasks by priority
// For now, you just need to know what to does.
// You will learn how it is sorting it later!
function sortTasksByPriority() {
  tasks.sort(function(a, b) {
    return a[1] - b[1]; // Compare the priority values (index 1 in the task array)
  });
}

// Function to handle keypress (for Enter key)
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

// Assign the onkeydown property directly
taskInput.onkeydown = handleKeyPress;

// Function to clear the input fields
// TODO
/* 1. set taskInput.value to an empty string to clear the input field
   2. set priorityInput.value to '3' to reset to medium priority
   3. call taskInput.focus() to return focus to the task input field
*/
function clearInput() {
  taskInput.value = "";
  priorityInput.value = "3";
  taskInput.focus();
}

// Function to update the task display
function updateTaskDisplay() {
  // Clear current task list
  taskList.innerHTML = '';
  
  // Add each task item using for loop as requested
  // TODO
  /* 1. create a for loop that iterates through each task in the tasks array
     2. inside the loop, create a constant variable named 'task' and assign it the current task from the tasks array
     3. create a constant variable named 'taskText' and assign it the task text (first element of the task array)
     4. create a constant variable named 'priority' and assign it the priority (second element of the task array)
  */
  for(let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskText = task [0];
    const priority = task[1];

    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    
    // Create task details container
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';
    
    // Create task text element with priority indicator
    const taskTextElement = document.createElement('span');
    taskTextElement.className = 'task-text';
    taskTextElement.innerHTML = `<span class="priority-indicator priority-${priority}"></span>${taskText}`;
    
    // Create priority text
    const priorityText = document.createElement('span');
    priorityText.className = 'priority-text';
    priorityText.textContent = `Priority: ${priority}`;
    
    // Create delete button with onclick attribute
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.setAttribute('onclick', `deleteTask(${i})`);
    
    // Append elements to containers
    taskDetails.appendChild(taskTextElement);
    taskDetails.appendChild(priorityText);
    
    listItem.appendChild(taskDetails);
    listItem.appendChild(deleteButton);
    
    // Append list item to task list
    taskList.appendChild(listItem);
  }
}

// Function to delete a specific task
// TODO
/* 1. use the splice() method on the tasks array to remove 1 element at the specified index
   2. call updateTaskDisplay() to refresh the task list without the deleted task
*/
function deleteTask(index) {
  tasks.splice(index, 1); 
  updateTaskDisplay();
}

// Function to clear all tasks
// TODO
// This is an exercise for Lab4, look at the demo and think what what
// the clearTasks function is supposed to do and write the body of this function please
function clearTasks() {
  tasks = [];
  updateTaskDisplay()
}

// Initial update of task display
updateTaskDisplay();