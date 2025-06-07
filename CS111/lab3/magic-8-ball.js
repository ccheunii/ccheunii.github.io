// Array of possible answers
const answers = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"
];


// Get DOM elements
const ball = document.getElementById('ball');
const answerElement = document.getElementById('answer');
const questionInput = document.getElementById('question');
const questionDisplay = document.getElementById('question-display');
const questionHistory = document.getElementById('question-history');

// Array to store question history - just strings
let historyItems = [];


// Function to get a random answer
// TODO
/* 1. create a randomIndex by using Math.floor and Math.random to get a random index between 0 and answers.length-1
   2. return the answer at the randomIndex from the answers array
*/
function getRandomAnswer() {

  // please write the body of this function
  let randomNumFrom0to1 = Math.random();
  let randomNum = randomNumFrom0to1 * answers.length; //random = 8.7
  let randomIndex = Math.floor(randomNum); // randomIndex = 8
  let randomAnswer = answers[randomIndex]; //Yes


  return randomAnswer;
  }



// Function to shake the ball and show an answer
function shakeBall() {
  const question = questionInput.value.trim(); // takes input from user and stores it
 
  if (question === '') {
    alert('Please ask a question first!');
    return;
  }


  // Reset to 8
  answerElement.textContent = '8';
 
  // Add shaking animation
  ball.style.transform = 'translateX(-5px)';
  setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 100);
  setTimeout(() => { ball.style.transform = 'translateX(-5px)'; }, 200);
  setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 300);
  setTimeout(() => { ball.style.transform = 'translateX(0)'; }, 400);
 
  // Show the answer after shaking
  // TODO
  /* 1. use setTimeout to execute a function after 500ms delay
     2. inside the function, get a random answer by calling getRandomAnswer()
     3. set the answerElement's textContent to the random answer
     4. set the questionDisplay's textContent to show the question with quotes
     5. set the questionDisplay's opacity to 1 to make it visible
     6. call addToHistory function with the question as parameter
  */
 
     // please write your code here
     setTimeout(() => {
      const answer = getRandomAnswer();
      answerElement.textContent = answer;
      // Display the question
      questionDisplay.textContent = "\"" + question + "\"";
      questionDisplay.style.opacity = 1;
      // Add to history - just the question
      addToHistory(question);
      // Change ball color
      ball.style.backgroundColor = "green";
      }, 500);




  // Clear the question input
  questionInput.value = '';
}


// Function to reset the ball and clear the question display
function resetBall() {
  // Reset the ball to show 8
  answerElement.textContent = '8';
 
  // Clear the question display
  questionDisplay.textContent = '';
  questionDisplay.style.opacity = 0;
 
  // Clear the input field (in case there's text but not submitted)
  questionInput.value = '';
}

// Function to add a question to history
// TODO
/* 1. add the question to the beginning of the historyItems array using unshift()
   2. call updateHistoryDisplay() to update the history display with the new question
*/
   function addToHistory(question) {
    historyItems.unshift(question);
    updateHistoryDisplay();
    }


// TODO
/* 1. reset the historyItems array to an empty array
2. call updateHistoryDisplay() to update the history display, which will
clear it
*/



// Function to update the history display
// you do not have to understand everything written here yet
function updateHistoryDisplay() {
  // Clear current history
  questionHistory.innerHTML = '';
 
  // Add each history item
  historyItems.forEach((question, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'history-item';
    listItem.textContent = question;
   
    questionHistory.appendChild(listItem);
  });
}

// Function to clear all history
// TODO
/* 1. reset the historyItems array to an empty array
   2. call updateHistoryDisplay() to update the history display, which will clear it
*/
function clearHistory() {
  // please write the body of this function
historyItems = [];
updateHistoryDisplay();
}

