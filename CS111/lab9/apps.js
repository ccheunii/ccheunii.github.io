// Navigation Script
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

function showApp(appName) {
  const allSections = document.querySelectorAll('.app-section');
  allSections.forEach(section => section.classList.remove('active'));
  document.getElementById(appName + '-app').classList.add('active');
  navMenu.classList.remove('active');
}

// Temperature Converter
function updateFormula() {
  const conversionType = document.getElementById("conversion-type").value;
  const selectionDisplay = document.getElementById("formula");

  if (conversionType === 'ftoc') {
    selectionDisplay.innerHTML = "°C = (°F - 32) × 5/9";
  } else {
    selectionDisplay.innerHTML = "°F = (°C × 9/5) + 32";
  }
}

function assessTemperature(temp, type) {
  if (type === "ftoc") {
    if (temp < 0) return "Freezing!";
    if (temp < 20) return "Chilly!";
    if (temp < 30) return "Comfortable";
    return "Hot!";
  } else {
    if (temp < 32) return "Freezing!";
    if (temp < 68) return "Chilly!";
    if (temp < 86) return "Comfortable";
    return "Hot!";
  }
}

function convertTemperature() {
  const input = parseFloat(document.getElementById("temperature").value);
  const conversionType = document.getElementById("conversion-type").value;
  const resultDisplay = document.getElementById("conversion-result");
  const assessmentDisplay = document.getElementById("temp-assessment");

  if (isNaN(input)) {
    resultDisplay.textContent = "Please enter a valid number.";
    assessmentDisplay.textContent = "";
    return;
  }

  let result;
  if (conversionType === 'ftoc') {
    result = ((input - 32) * 5 / 9).toFixed(2);
    resultDisplay.textContent = `${input}°F = ${result}°C`;
  } else {
    result = ((input * 9 / 5) + 32).toFixed(2);
    resultDisplay.textContent = `${input}°C = ${result}°F`;
  }

  assessmentDisplay.textContent = assessTemperature(parseFloat(result), conversionType);
}

function clearConverter() {
  document.getElementById("temperature").value = "";
  document.getElementById("conversion-result").textContent = "";
  document.getElementById("temp-assessment").textContent = "";
}

// Magic 8 Ball
const answers = [
  "Yes", "No", "Maybe", "Ask again later", "Definitely", "I don’t think so", "Certainly", "Unlikely"
];
const history = [];

function shakeBall() {
  const question = document.getElementById("question").value;
  if (!question) return;
  const answer = answers[Math.floor(Math.random() * answers.length)];
  document.getElementById("answer").textContent = answer;
  document.getElementById("question-display").textContent = `You asked: ${question}`;
  history.push({ question, answer });
  updateHistory();
}

function resetBall() {
  document.getElementById("question").value = "";
  document.getElementById("answer").textContent = "8";
  document.getElementById("question-display").textContent = "";
}

function updateHistory() {
  const historyList = document.getElementById("question-history");
  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `Q: ${entry.question} → A: ${entry.answer}`;
    historyList.appendChild(li);
  });
}

function clearHistory() {
  history.length = 0;
  updateHistory();
}

// Task List / Wellness Tracker
function validateDate(date) {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  return regex.test(date);
}

function validateTime(time) {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regex.test(time);
}

function calculatePriority(date, time) {
  const now = new Date();
  const year = now.getFullYear();
  const [month, day] = date.split('/').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute).getTime();
}

function addTask() {
  const task = document.getElementById("task-input").value.trim();
  const date = document.getElementById("date-input").value.trim();
  const time = document.getElementById("time-input").value.trim();
  if (!task || !validateDate(date) || !validateTime(time)) return;

  const taskList = document.getElementById("task-list");
  const li = document.createElement("li");
  li.textContent = `${task} (${date} ${time})`;
  li.setAttribute("data-priority", calculatePriority(date, time));
  taskList.appendChild(li);

  sortTasks();
  clearInput();
}

function sortTasks() {
  const list = document.getElementById("task-list");
  const items = Array.from(list.children);
  items.sort((a, b) => a.dataset.priority - b.dataset.priority);
  list.innerHTML = "";
  items.forEach(item => list.appendChild(item));
}

function clearInput() {
  document.getElementById("task-input").value = "";
  document.getElementById("date-input").value = "";
  document.getElementById("time-input").value = "";
}

function clearTasks() {
  document.getElementById("task-list").innerHTML = "";
}

function addRandomTask() {
  const suggestions = [
    "Drink water",
    "Take a walk",
    "Stretch for 5 minutes",
    "Deep breathing",
    "Snack on fruit"
  ];
  const random = suggestions[Math.floor(Math.random() * suggestions.length)];
  const now = new Date();
  const date = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  document.getElementById("task-input").value = random;
  document.getElementById("date-input").value = date;
  document.getElementById("time-input").value = time;
}

// Timer
let countdown;
function startCountdown() {
  const seconds = parseInt(document.getElementById("seconds").value);
  if (isNaN(seconds) || seconds <= 0) return;

  clearInterval(countdown);
  let remaining = seconds;
  const timer = document.getElementById("timer");
  const status = document.getElementById("status");

  countdown = setInterval(() => {
    timer.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
    if (--remaining < 0) {
      clearInterval(countdown);
      status.textContent = "Time's up! Great job!";
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
  document.getElementById("timer").textContent = "00:00";
  document.getElementById("status").textContent = "";
}

// NATO Converter
function verbalize() {
  const input = document.getElementById("inputString").value.toUpperCase();
  const phonetic = {
    A: "Alpha", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo", F: "Foxtrot",
    G: "Golf", H: "Hotel", I: "India", J: "Juliett", K: "Kilo", L: "Lima",
    M: "Mike", N: "November", O: "Oscar", P: "Papa", Q: "Quebec", R: "Romeo",
    S: "Sierra", T: "Tango", U: "Uniform", V: "Victor", W: "Whiskey",
    X: "X-ray", Y: "Yankee", Z: "Zulu"
  };

  const result = input.split("").map(char =>
    phonetic[char] || char
  ).join(" ");
  document.getElementById("natoResult").textContent = result;
}

function clearNATOInputs() {
  document.getElementById("inputString").value = "";
  document.getElementById("natoResult").textContent = "";
}

// Calculator
function appendToDisplay(value) {
  document.getElementById("display").value += value;
}

function calculate() {
  try {
    document.getElementById("display").value = eval(document.getElementById("display").value);
  } catch {
    document.getElementById("display").value = "Error";
  }
}

function deleteLast() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function clearAll() {
  document.getElementById("display").value = "";
}

function insertMathFunction(fn) {
  const val = document.getElementById("display").value;
  document.getElementById("display").value = `Math.${fn}(${val})`;
  calculate();
}

function insertMathConstant(constant) {
  document.getElementById("display").value += Math[constant];
}

let memory = 0;
function addToMemory() {
  memory += parseFloat(document.getElementById("display").value) || 0;
}
function subtractFromMemory() {
  memory -= parseFloat(document.getElementById("display").value) || 0;
}
function recallMemory() {
  document.getElementById("display").value = memory;
}
function clearMemory() {
  memory = 0;
}

// Contacts
const contacts = [];

function switchTab(tabName) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

  document.querySelector(`.tab[onclick*='${tabName}']`).classList.add("active");
  document.getElementById(tabName === "view" ? "view-contacts" : tabName === "add" ? "add-contact" : "json-view").classList.add("active");

  if (tabName === "json") renderJSON();
}

function addContact() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const type = document.getElementById("type").value;
  if (!name || !email || !phone) return false;

  const newContact = { name, email, phone, type };
  contacts.push(newContact);
  renderContacts();
  document.getElementById("contact-form").reset();
  switchTab("view");
  return false;
}

function renderContacts() {
  const list = document.getElementById("contacts-list");
  list.innerHTML = contacts.map(c =>
    `<div class="contact-card"><strong>${c.name}</strong><br>${c.email}<br>${c.phone}<br><em>${c.type}</em></div>`
  ).join("");
}

function searchContacts() {
  const term = document.getElementById("search-input").value.trim().toLowerCase();
  const list = document.getElementById("contacts-list");
  list.innerHTML = contacts
    .filter(c => c.name.toLowerCase().includes(term))
    .map(c =>
      `<div class="contact-card"><strong>${c.name}</strong><br>${c.email}<br>${c.phone}<br><em>${c.type}</em></div>`
    ).join("");
}

function resetSearch() {
  document.getElementById("search-input").value = "";
  renderContacts();
}

function renderJSON() {
  document.getElementById("json-content").textContent = JSON.stringify(contacts, null, 2);
}