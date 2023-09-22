import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

let amount;
let step;
let firstDelay;

form.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();
  amount = Number(form.amount.value);
  step = Number(form.step.value);
  firstDelay = Number(form.delay.value);
  if (firstDelay < 0 || amount < 0 || step < 0) {
  } else {
    for (let i = 1; i <= amount; i++) {
      createPromise(i, firstDelay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      firstDelay = firstDelay + step;
    }
  }
  form.reset();
}

function createPromise(position, delay) {
  const data = { position, delay };
  const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    setInterval(() => {
      if (shouldResolve) {
        res(data);
      } else {
        rej(data);
      }
    }, delay);
  });
}
