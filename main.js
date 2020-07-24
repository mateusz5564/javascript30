const player = document.querySelector('.player');
const controls = document.querySelector('.player__controls');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');


const toggle = document.querySelector('.toggle');
const volume = document.querySelector('input[name="volume"]');
const playbackRate = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('button[data-skip]');
const fullScreenButton = document.querySelector('button.full-screen');

function togglePlay() {
  video[video.paused ? 'play' : 'pause']();
}

function updateToggleButton() {
  let icon =  video.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function handleRange() {
  video[this.name] = this.value;
}

function skipVideo() {
  video.currentTime += Number(this.dataset.skip);
}


let letRewind = false;
function handleProgress(e) {
  progress.addEventListener('mousemove', () => {
    if(letRewind) {
      progressFilled.style.flexBasis = e.offsetX + "px";
      video.currentTime = (e.offsetX / progress.clientWidth) * video.duration;;
    }
  })
}

function updateProgress(e) {
  let percent = (e.target.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = percent + '%';
}

function toggleFullscreen() {
  if(document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    player.requestFullscreen();
  }
}


let timer;
function hideControls() {
  clearTimeout(timer);
    timer = setTimeout(() => {
    controls.style.transform = "translateY(100%) translateY(-5px)";
  }, 3000);
}

function showControls() {
  controls.style.transform = "translateY(0)";
  clearTimeout(timer);
}


toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleButton);
video.addEventListener('pause', updateToggleButton);
volume.addEventListener('input', handleRange);
playbackRate.addEventListener('input', handleRange);
skipButtons.forEach((button) => {
  button.addEventListener('click', skipVideo);
})
progress.addEventListener('mousedown', () => letRewind = true);
progress.addEventListener('mouseup', () => letRewind = false);
progress.addEventListener('mousemove', handleProgress);
video.addEventListener('timeupdate', updateProgress);
fullScreenButton.addEventListener('click', toggleFullscreen);
player.addEventListener('mousemove', showControls);
player.addEventListener('mousemove', hideControls);