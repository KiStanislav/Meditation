const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.video-container video');
const sounds = document.querySelectorAll('.container__sounds button');
const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select');
const outlineLenght = outline.getTotalLength();
let fakeDuration = 600;

outline.style.strokeDasharray = outlineLenght;
outline.style.strokeDashoffset = outlineLenght;


//play sound
play.addEventListener('click', () => {
  checkPlaying(song);
});

timeSelect.forEach(option => {
  option.addEventListener('click', function(){
    fakeDuration = this.getAttribute('data-time');
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
  });
});

sounds.forEach(sound => {
  sound.addEventListener('click', function() {
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
  } )
})

 
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

song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  let progress = outlineLenght - (currentTime / fakeDuration) * outlineLenght;
  outline.style.strokeDashoffset = progress;
  timeDisplay.textContent = `${minutes}:${seconds}`;
  if(currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
}
