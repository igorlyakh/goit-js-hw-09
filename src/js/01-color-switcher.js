const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let idInterval;

const startHandler = e => {
  e.target.disabled = true;
  stopBtn.disabled = false;
  idInterval = setInterval(() => {
    const bgColor = getRandomHexColor();
    body.style.background = bgColor;
  }, 1000);

  //   return idInterval;
};

const stopHandler = e => {
  e.target.disabled = true;
  startBtn.disabled = false;
  clearInterval(idInterval);
};

startBtn.addEventListener('click', startHandler);

stopBtn.addEventListener('click', stopHandler);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
