// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


let form = document.querySelector(".form");

form.addEventListener("submit", submitForm);

function makePromise({ state, delay }) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (state == "fulfilled") {
                resolve(delay);
            }
            if (state == "rejected") {
                reject(delay);
            }
        }, delay);
    });
}

function submitForm(event) {
    event.preventDefault();
    const delay = document.querySelector('input[name="delay"]');
    const selectedRadio = document.querySelector('input[name="state"]:checked');
    const stateValue = selectedRadio ? selectedRadio.value : null;
    if (stateValue == null) return;



    makePromise({ state: stateValue, delay: Number(delay.value) })
        .then(value => {
            console.log(1);
            iziToast.show({
                message: `✅ Fulfilled promise in ${value}ms`
            });
        })
        .catch(error => {

            iziToast.show({
                message: `❌ Rejected promise in ${error}ms`
            });
        });
}

