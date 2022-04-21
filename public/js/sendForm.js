const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const submitButton = document.getElementById('contact-submit-button');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    let formData = {};
    let honeyPot = '';

    inputs.forEach(input => {
        const formInput = input.value;
        const formLabel = input.name;

        if (formLabel !== 'bot-field') {
            formData[formLabel] = formInput;
        } else {
            honeyPot =formInput;
        }
    })

    let alertText
    if (!honeyPot) {
        alertText = validateMessage(formData);
    }

    const alert = document.createElement('div');
    alert.classList.add('alert');

    const alertTextEl = document.createElement('h2');
    alertTextEl.innerHTML = alertText;
    alert.appendChild(alertTextEl);

    const okButton = document.createElement('button');
    okButton.classList.add('btn');
    okButton.classList.add('okButton');
    okButton.innerText = 'OK';
    okButton.addEventListener('click', () => form.removeChild(alert));

    alert.appendChild(okButton);
    form.appendChild(alert);

    if (alertText === 'Your message has been sent. Thank you!') {
        inputs.forEach(input => {
            input.value = ''
        })
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(JSON.stringify(formData));
})

function validateMessage (formData) {
    let alertText = 'Your message has been sent. Thank you!';
    const name = formData.name;
    const email = formData.email;
    const phone = formData.phone;
    const message = formData.message;
    let validEmail, validPhone;

    if (email) validEmail = validateEmail(email);
    if (phone) validPhone = validatePhone(phone);

    if (!name) alertText = 'Please include your name';
    if (!message) alertText = 'Please include a message';
    if (!email && !phone) alertText = 'Please include a valid phone number or a valid email address';
    if (!validEmail && !validPhone) alertText = 'Please include a valid phone number or a valid email address';

    return alertText;
}

function validateEmail (emailAddress) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAddress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

function validatePhone (phoneNumber) {
    let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (phoneNumber.match(regexPhone)) {
        return true;
    } else {
        return false;
    }
}
