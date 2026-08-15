'use strict'

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');

form.addEventListener('submit', createPromise);

function createPromise(event) {
    event.preventDefault();

    const delay = Number(event.target.elements.delay.value);
    const state = event.target.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then(delay => iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            backgroundColor: 'green',
            messageColor: 'white',
            progressBarColor: 'white',
            position: 'topRight',
            timeout: 8000,
            closeOnClick: true
}))
        .catch(delay => iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            backgroundColor: 'red',
            messageColor: 'white',
            progressBarColor: 'white',
            position: 'topRight',
            timeout: 8000,
            closeOnClick: true
}));
} 