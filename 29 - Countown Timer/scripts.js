let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

//Takes the number of seconds the timer should be
function timer(seconds) {
  //Clear any existing timers when a new one is run
  clearInterval(countdown);

  //The time the timer started is now
  const now = Date.now();
  //Then is the current time added to the time the timer should end in milliseconds
  const then = now + seconds * 1000;
  //Display the time remaining
  displayTimeLeft(seconds);
  //Display the time when the timer will end
  displayEndTime(then);

  //Every second (1000 milliseconds) determine time remaining
  countdown = setInterval(() => {
	//Get the time remaining by comparing current time with when the timer should end
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // Check if we should stop the timer
    if(secondsLeft < 0) {
	  //Stop the interval
      clearInterval(countdown);
      return;
    }
    // Display the time remaining
    displayTimeLeft(secondsLeft);
  }, 1000);
}

//Fucntion to display remaining time
function displayTimeLeft(seconds) {
  //Convert to minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  //If remainder seconds is less than 10 add a 0 padding the front
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  //Update the title of the document to the time remainging
  document.title = display;
  timerDisplay.textContent = display;
}

//Display the time the timer will end at
function displayEndTime(timestamp) {
  //Convert to a date object
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

//Function to start the timer
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

//Listen on all buttons to start a timer with the data-time
buttons.forEach(button => button.addEventListener('click', startTimer));
//Listen on the form to start a custom timer in minutes
document.customForm.addEventListener('submit', function(e) {
  //Prevent reloading the page to submit the data
  e.preventDefault();
  //Get the minutes from the value of th input
  const mins = this.minutes.value;
  console.log(mins);
  //Convert the minutes to seconds
  timer(mins * 60);
  //Reset the value in the form
  this.reset();
});
