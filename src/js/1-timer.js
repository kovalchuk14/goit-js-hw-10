// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let timerInterval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate.getTime() < Date.now()) {
            iziToast.show({
                message: "Please choose a date in the future"
            });
            return;
        }
        button.disabled = false;
    },
};

let button = document.querySelector("button")
document.querySelector('#datetime-picker').disabled = false;
button.disabled = true;
button.addEventListener("click", makeTimer);



function makeTimer() {
    button.disabled = true;
    document.querySelector('#datetime-picker').disabled = true;
    timerInterval = setInterval(showTime, 1000);
}

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

function showTime() {
    let timer = convertMs(userSelectedDate.getTime() - Date.now());
    if (Math.floor((userSelectedDate.getTime() - Date.now()) / 1000) < 0) {
        clearInterval(timerInterval);
        document.querySelector('#datetime-picker').disabled = false;
        return;
    }
    let daysEl = document.querySelector('[data-days]');
    let hoursEl = document.querySelector('[data-hours]');
    let minutesEl = document.querySelector('[data-minutes]');
    let secondsEl = document.querySelector('[data-seconds]');

    daysEl.textContent = addLeadingZero(timer.days);
    hoursEl.textContent = addLeadingZero(timer.hours);
    minutesEl.textContent = addLeadingZero(timer.minutes);
    secondsEl.textContent = addLeadingZero(timer.seconds);

}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}



flatpickr("#datetime-picker", options);

