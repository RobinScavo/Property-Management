const formButton = document.querySelector('.form-btn');
const form = document.querySelector('form');

formButton.addEventListener('click', (e) => {
    e.preventDefault();
    const alertText = validateMessage();

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

    // Send email with node.js
});

function validateMessage () {
    let alertText = 'Your message has been sent. Thank you!';
    const name = form.elements[1].value;
    const email = form.elements[2].value;
    const phone = form.elements[3].value;
    const message = form.elements[4].value;
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
