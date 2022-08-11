const btnStart = document.querySelector('[data-start]');
const btnEnd = document.querySelector('[data-stop]');
const body = document.querySelector('body');
btnEnd.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;
// https://flaviocopes.com/how-to-disable-button-javascript/

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  btnEnd.disabled = false;

  timerId = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);
});

btnEnd.addEventListener('click', () => {
  btnStart.disabled = false;
  btnEnd.disabled = true;
  clearInterval(timerId);
});
