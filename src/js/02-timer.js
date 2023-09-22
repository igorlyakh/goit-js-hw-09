import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import convertMs from './funcs';
import { refs } from './refs';

let selectedDate;
let id;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = new Date(selectedDates[0]).getTime();
    if (checkDate(selectedDate)) {
      console.warn('error');
      refs.startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
    } else {
      const data = convertMs(findDiff(selectedDate));
      makeMarkup(data);
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.timePicker, options);

const startHandler = () => {
  refs.startBtn.disabled = true;
  options.defaultDate = null;
  options.clickOpens = false;
  flatpickr(refs.timePicker, options);
  Notify.success('Timer was started!');
  id = setInterval(() => {
    const timer = findDiff(selectedDate);
    makeMarkup(convertMs(timer));
  }, 1000);
};

refs.startBtn.addEventListener('click', startHandler);

function makeMarkup({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function findDiff(selectedDate) {
  const today = new Date().getTime();
  if (selectedDate - today > 0) {
    return selectedDate - today;
  } else {
    clearInterval(id);
    Notify.info('Time is over!');
    options.defaultDate = new Date();
    options.clickOpens = true;
    flatpickr(refs.timePicker, options);
    return 0;
  }
}

function checkDate(selectedDate) {
  const currentDate = new Date().getTime();
  if (currentDate > selectedDate) {
    return true;
  } else {
    return false;
  }
}
