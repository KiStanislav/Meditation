const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.video-container video');
const sounds = document.querySelectorAll('.container__sounds button');
const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select');
const outlineLength = outline.getTotalLength();
const ZERO = '0';
const TEN = 10;
const SECONDS_PER_MINUTE = 60;
let fakeTime = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

const checkPlaying = song => {
  if(song.paused) {
    song.play();
    play.src = 'svg/pause.svg';
    video.play();
  } else {
    song.pause();
    play.src = 'svg/play.svg';
    video.pause();
  }
};

play.addEventListener('click', () => checkPlaying(song));

function addZero(n) {
  return (parseInt(n, 10) < TEN ? ZERO : '') + n;
}

timeSelect.forEach(option => {
  option.addEventListener('click', function(){
    fakeTime = this.dataset.time;
    timeDisplay.textContent = `${addZero(Math.floor(fakeTime / SECONDS_PER_MINUTE))}:${addZero(Math.floor(fakeTime % SECONDS_PER_MINUTE))}`
  });
});

sounds.forEach(sound => {
  sound.addEventListener('click', function() {
    song.src = this.dataset.sound;
    video.src = this.dataset.video;
    checkPlaying(song);
  } )
})

song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = fakeTime - currentTime;
  let seconds = addZero(Math.floor(elapsed % SECONDS_PER_MINUTE));
  let minutes = addZero(Math.floor(elapsed / SECONDS_PER_MINUTE));
  let progress = outlineLength - (currentTime / fakeTime) * outlineLength;
  outline.style.strokeDashoffset = progress;
  timeDisplay.textContent = `${minutes}:${seconds}`;
  if(currentTime >= fakeTime) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
}
