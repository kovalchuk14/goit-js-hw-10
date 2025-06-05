// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


let form = document.querySelector(".form");

form.addEventListener("sumbit", makePromise);

function makePromise(event) {
    console.log(1);
    event.preventDefault();
    const delay = document.querySelector('input[name="delay"]');
    const selectedRadio = document.querySelector('input[name="state"]:checked');
    const stateValue = selectedRadio ? selectedRadio.value : null;
    if (stateValue == null) return;

    let promise = new Promice((resolve, reject) => {
        setTimeout(() => {
            if (stateValue == "fulfilled") {
                resolve(delay);
            }
            if (stateValue == "rejeted") {
                reject(delay);
            }
        }, delay);
    });
    promise
        .then(value => {
            iziToast.show({
                message: `✅ Fulfilled promise in ${delay}ms`
            });
        })
        .catch(value => {
            iziToast.show({
                message: `❌ Rejected promise in ${delay}ms`
            });
        });
}

