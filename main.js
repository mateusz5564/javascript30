const timerButtons = document.querySelectorAll('.timer__button');
const customTime = document.querySelector('#custom');
const timeLeftContainer = document.querySelector('.display__time-left');
const endTimeContainer = document.querySelector('.display__end-time');
let currentInterval;


function countdown(timeLeftInSeconds) {
  timeLeftContainer.innerHTML = displayTimeLeft(timeLeftInSeconds);
  currentInterval = setInterval(() => {
    timeLeftInSeconds--;
    timeLeftContainer.innerHTML = displayTimeLeft(timeLeftInSeconds);
    if(timeLeftInSeconds <= 0) clearInterval(currentInterval);
  }, 1000)
}

function displayTimeLeft(timeLeftInSeconds) {
  if (timeLeftInSeconds <= 0) return "0:00";
  const minutesLeft = (timeLeftInSeconds - timeLeftInSeconds % 60) / 60;
  const secondsLeft = timeLeftInSeconds % 60;
  return `${minutesLeft}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
}

function displayEndTime(timeLeftInSeconds) {
  const date = Date.now();
  const endTime = new Date(date + Number(timeLeftInSeconds * 1000));
  const hour = endTime.getHours();
  const minute = endTime.getMinutes();
  endTimeContainer.innerHTML = `${hour}:${minute}`;
}

function handleButton(e) {
  if(currentInterval) clearInterval(currentInterval);
  const timeLeftInSeconds = e.target.dataset.time;
  countdown(timeLeftInSeconds);
  displayEndTime(timeLeftInSeconds);
}

function handleCustomTime(e) {
  e.preventDefault();
  if(currentInterval) clearInterval(currentInterval);
  const timeLeftInMinutes = e.target[0].value;
  const timeLeftInSeconds = timeLeftInMinutes * 60;
  countdown(timeLeftInSeconds);
  displayEndTime(timeLeftInSeconds);
}

timerButtons.forEach(btn => btn.addEventListener('click', handleButton));
customTime.addEventListener('submit', handleCustomTime);