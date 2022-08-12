// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

let selectedDate = null;

// Flatpickr

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      return (selectedDate = selectedDates[0]);
    }
  },
};

flatpickr(input, options);

// Розрахунок дат, годин і тд

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, '0');
  } else {
    return value;
  }
}
// Розрахунок і вивід відліку часу

const getDifference = () => {
  const todayDate = new Date().getTime();
  const differences = selectedDate.getTime() - todayDate;
  let newDay = convertMs(differences).days;
  dataDays.textContent = addLeadingZero(newDay);
  let newHour = convertMs(differences).hours;
  dataHours.textContent = addLeadingZero(newHour);
  let newMinute = convertMs(differences).minutes;
  dataMinutes.textContent = addLeadingZero(newMinute);
  let newSecond = convertMs(differences).seconds;
  dataSeconds.textContent = addLeadingZero(newSecond);

  if (differences <= 0) {
    return 0;
  }
};

btnStart.addEventListener('click', () => {
  setInterval(() => {
    getDifference();
  }, 1000);
});
