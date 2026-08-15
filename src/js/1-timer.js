'use strict'

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector('.btn');

let userSelectedDate;

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

        if (new Date(selectedDates) < new Date()) {
            button.disabled = 'true';

            iziToast.show({
                message: "Please choose a date in the future",
                backgroundColor: 'red',
                messageColor: 'white',
                progressBarColor: 'white',
                position: 'topRight',
                timeout: 10000,
                closeOnClick: true
            });
            
            return;
        }

        button.disabled = false;

        userSelectedDate = selectedDates[0];

        console.log(selectedDates[0]);
    }
});

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

button.addEventListener('click', () => {

    button.disabled = 'true';

    const timerInterval = setInterval(() => {
        const ms = userSelectedDate - Date.now();

         if (ms <= 0) {
             clearInterval(timerInterval);
            
            daysSpan.textContent = '00';
            hoursSpan.textContent = '00';
            minutesSpan.textContent = '00';
            secondsSpan.textContent = '00';

             return;
        }
        const { days, hours, minutes, seconds } = convertMs(ms);
        
        daysSpan.textContent = days;
        hoursSpan.textContent = String(hours).padStart(2, '0');
        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');


    }, 1000);
    });



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
  const minutes = Math.floor((ms % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

