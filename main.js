const timerButtons = document.querySelectorAll('.timer__button');
const customTime = document.querySelector('#custom');
const timeLeftContainer = document.querySelector('.display__time-left');
const endTimeContainer = document.querySelector('.display__end-time');
let currentCountdown;


function countdown(timeLeftInSeconds) {
  if (timeLeftInSeconds <= 0 || !Number.isInteger(Number(timeLeftInSeconds))) return;
  if (currentCountdown) clearInterval(currentCountdown);
  displayEndTime(timeLeftInSeconds);
  timeLeftContainer.innerHTML = displayTimeLeft(timeLeftInSeconds);

  currentCountdown = setInterval(() => {
    timeLeftInSeconds--;
    timeLeftContainer.innerHTML = displayTimeLeft(timeLeftInSeconds);
    if(timeLeftInSeconds <= 0) clearInterval(currentCountdown);
  }, 1000)
}

function displayTimeLeft(timeLeftInSeconds) {
  const minutesLeft = (timeLeftInSeconds - timeLeftInSeconds % 60) / 60;
  const secondsLeft = timeLeftInSeconds % 60;
  const display = `${minutesLeft}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
  document.title = display;
  return display;
}

function displayEndTime(timeLeftInSeconds) {
  const endTime = new Date(Date.now() + Number(timeLeftInSeconds * 1000));
  const hour = endTime.getHours();
  const minute = endTime.getMinutes();
  endTimeContainer.innerHTML = `${hour}:${minute < 10 ? "0" + minute : minute}`;
}

function handleButton(e) {
  const timeLeftInSeconds = e.target.dataset.time;
  countdown(timeLeftInSeconds);
}

function handleCustomTime(e) {
  e.preventDefault();
  const timeLeftInMinutes = e.target[0].value;
  countdown(timeLeftInMinutes * 60);
  this.reset();
}

timerButtons.forEach(btn => btn.addEventListener('click', handleButton));
customTime.addEventListener('submit', handleCustomTime);