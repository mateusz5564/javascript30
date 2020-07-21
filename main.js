const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');


const toggle = document.querySelector('.toggle');
const volume = document.querySelector('input[name="volume"]');
const playbackRate = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('button[data-skip]');

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
      let data = (progressFilled.clientWidth / progress.clientWidth) * 100;
      let percentage = data.toFixed(2);
      let test = Math.floor(percentage * video.duration / 100);
      video.currentTime = test;
    }
  })
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

video.addEventListener('timeupdate', (e) => {
  let data = (e.target.currentTime / video.duration) * 100;
  let percentage = data.toFixed(2);
  let test = Math.floor(percentage * progress.clientWidth / 100);
  progressFilled.style.flexBasis = test + "px";
})