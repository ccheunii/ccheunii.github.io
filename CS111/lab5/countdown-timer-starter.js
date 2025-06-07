// Initialize variables in global scope
let timerDisplay;
let motivationDisplay;
let secondsInput;
let startBtn;
let resetBtn;
let statusDisplay;
let countdown;
let timeLeft;
let phraseIndex = 0;

// Motivational phrases array
// this is also a global scope
const motivationalPhrases = [
    "Every second counts!",
    "You're making progress!",
    "Keep going, you're doing great!",
    "Stay focused, stay strong!",
    "You've got this!",
    "One step at a time!",
    "Believe in yourself!",
    "Success is just ahead!",
    "Don't give up now!",
    "The best is yet to come!",
    "Each moment brings you closer to your goal!",
    "Small steps lead to big results!",
    "Your determination is inspiring!",
    "Progress happens one second at a time!",
    "Keep that momentum going!"
];

// Initialize on page load
window.onload = function() {
    // Get DOM elements
    // TODO 
    /* 1. create a variable named 'timerDisplay' and assign it the DOM element with id 'timer'
       2. create a variable named 'motivationDisplay' and assign it the DOM element with id 'motivation'
       3. create a variable named 'secondsInput' and assign it the DOM element with id 'seconds'
       4. create a variable named 'startBtn' and assign it the DOM element with id 'startBtn'
       5. create a variable named 'resetBtn' and assign it the DOM element with id 'resetBtn'
       6. create a variable named 'statusDisplay' and assign it the DOM element with id 'status'
    */
    timerDisplay = document.getElementById('timer');
    motivationDisplay = document.getElementById('motivation');
    secondsInput = document.getElementById('seconds');
    startBtn = document.getElementById('startBtn');
    resetBtn = document.getElementById('resetBtn');
    statusDisplay = document.getElementById('status');
};

// Format time to MM:SS
// TODO
/* 1. calculate the minutes by dividing the seconds by 60 and using Math.floor to get the whole number
   2. calculate the remaining seconds using the modulo operator (%)
   3. convert both minutes and seconds to strings with padStart(2, '0') to ensure two digits
   4. return a template string in the format "MM:SS"
*/
function formatTime(seconds) {
    //write the body of this function
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} :${secs.toString().padStart(2, '0')}`;

}

// Update the timer display
function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);

}

// Start the countdown - attached via onclick
function startCountdown() {
    // Get user input and validate
    const seconds = parseInt(secondsInput.value);

    // Validate the input
    if (isNaN(seconds) || seconds <= 0) {
        statusDisplay.textContent = "Please enter a valid number of seconds";
        return;
    }
    
    // Disable start button and input during countdown
    startBtn.disabled = true;
    secondsInput.disabled = true;
    statusDisplay.textContent = "Countdown in progress...";
    
    // Initialize the timer
    timeLeft = seconds;
    updateTimerDisplay();
    
    // Use setInterval to update the timer every second
    // TODO
    /* 1. create a 'countdown' variable and assign it to setInterval with a callback function and 1000ms interval
       2. inside the callback function:
          a. decrement 'timeLeft' by 1
          b. call updateTimerDisplay() to refresh the display
          c. update the motivation phrase if timeLeft is divisible by 5 or if it's the first second of countdown:
             - increment phraseIndex and use modulo to cycle through the motivationalPhrases array
             - update motivationDisplay.textContent with the new phrase
          d. check if the countdown is complete (timeLeft <= 0):
             - if true, clear the interval using clearInterval(countdown)
             - set timerDisplay.textContent to "00:00"
             - set a completion message in motivationDisplay.textContent
             - re-enable the start button and input field
             - update the status display to show completion
    */
    countdown = setInterval(() => {
        // TODO
        timeLeft--;
        updateTimerDisplay();

        if(timeLeft % 5 === 0 || timeLeft === seconds-1){
            phraseIndex = (phraseIndex +1) % motivationalPhrases.length;
            motivationDisplay.textContent = motivationalPhrases[phraseIndex];
        }

        if(timeLeft <= 0){
            clearInterval(countdown);
            timerDisplay.textContent = "00:00";
            motivationDisplay.textContent = "Time's up! Great job!";
          
            setTimeout(() => {
                motivationDisplay.innerHTML = '<span style="font-size: 3rem;">😊</span>';
            },1000);
        }

    

        startBtn.disabled =false;
        secondsInput.disabled =false;
        statusDisplay.textContent = "Countdown complete!";
    
    }, 1000);
}

// Reset the timer - attached via onclick
// TODO
/* 1. clear the interval using clearInterval(countdown) to stop the timer
   2. reset timerDisplay.textContent to "00:00"
   3. set motivationDisplay.textContent to a default message about entering seconds
   4. enable the start button by setting startBtn.disabled to false
   5. enable the input field by setting secondsInput.disabled to false
   6. clear the status message by setting statusDisplay.textContent to an empty string
   7. set a default value like "30" for secondsInput.value
*/
function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = "00:00";
    motivationDisplay.textContent = "Enter seconds and start the timer for motivation!";
    startBtn.disabled = false;
    secondsInput.disabled = false;
    statusDisplay.textContent = "";
    secondsInput.value = "30";
}