const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.video-container video');
const sounds = document.querySelectorAll('.container__sounds button');
const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select');
const outlineLenght = outline.getTotalLength();
const ZERO = '0';
let fakeTime = 600;

outline.style.strokeDasharray = outlineLenght;
outline.style.strokeDashoffset = outlineLenght;

const checkPlaying = song => {
  if(song.paused) {
    song.play();
    play.src = 'svg/pause.svg';
    video.play();
  }else {
    song.pause();
    play.src = 'svg/play.svg';
    video.pause();
  }
};

play.addEventListener('click', () => checkPlaying(song));

function addZero(n) {
  return (parseInt(n, 10) < 10 ? ZERO : '') + n;
}

timeSelect.forEach(option => {
  option.addEventListener('click', function(){
    fakeTime = this.getAttribute('data-time');
    timeDisplay.textContent = `${addZero(Math.floor(fakeTime / 60))}:${addZero(Math.floor(fakeTime % 60))}`
  });
});

sounds.forEach(sound => {
  sound.addEventListener('click', function() {
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
  } )
})

song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = fakeTime - currentTime;
  let seconds = addZero(Math.floor(elapsed % 60));
  let minutes = addZero(Math.floor(elapsed / 60));
  let progress = outlineLenght - (currentTime / fakeTime) * outlineLenght;
  outline.style.strokeDashoffset = progress;
  timeDisplay.textContent = `${minutes}:${seconds}`;
  if(currentTime >= fakeTime) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
}
