const submitForm = (e) => {
  e.preventDefault();

  const formType = e.target.id.split("-")[0];
  const formId = `${formType}-form-modal`;

  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll("input");
  const formOverlay = form.querySelector(".form-overlay");

  let isModal = e.target.id !== "contact-submit-button";
  let formData = {};
  let honeyPot = "";
  let alertText;

  inputs.forEach((input) => {
    const formInput = input.value;
    const formLabel = input.name;
    if (input.type === "radio") {
      if (input.checked && input.value === "yes") {
        formData[formLabel] = "Yes";
      } else if (input.checked && input.value === "no") {
        formData[formLabel] = "No";
      } else if (formData[formLabel] !== "Yes") {
        formData[formLabel] = "Not answered";
      }
    } else if (formLabel === "bot-field") {
      honeyPot = formInput;
    } else {
      formData[formLabel] = formInput;
    }
  });

  if (!honeyPot) {
    alertText = validateForm(formData);
  }

  const alert = document.createElement("div");
  alert.classList.add("alert");

  const alertTextEl = document.createElement("h2");
  alertTextEl.innerHTML = alertText;
  alert.appendChild(alertTextEl);

  const okButton = document.createElement("button");
  okButton.classList.add("btn");
  okButton.classList.add("okButton");
  okButton.innerText = "OK";
  okButton.addEventListener("click", () => {
    form.removeChild(alert);
    if (isModal) {
      formOverlay.classList.add("hidden");
    }
  });

  if (alertText === "Your message has been sent. Thank you!") {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(JSON.stringify(formData));

    inputs.forEach((input) => {
      input.value = "";
    });
  }

  if (isModal) {
    formOverlay.classList.remove("hidden");
  }

  alert.appendChild(okButton);
  form.appendChild(alert);
  alert.scrollIntoView();
};

function validateForm(formData) {
  let alertText = "Your message has been sent. Thank you!";
  const name = formData.name;
  const email = formData.email;
  const phone = formData.phone;
  const message = formData.message;
  let validEmail, validPhone;

  if (email) validEmail = validateEmail(email);
  if (phone) validPhone = validatePhone(phone);

  if (!name) alertText = "Please include your name";
  if (!message) alertText = "Please include a message";
  if (!email && !phone)
    alertText = "Please include a valid phone number or a valid email address";
  if (!validEmail && !validPhone)
    alertText = "Please include a valid phone number or a valid email address";

  return alertText;
}

function validateEmail(emailAddress) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAddress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

function validatePhone(phoneNumber) {
  let regexPhone =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (phoneNumber.match(regexPhone)) {
    return true;
  } else {
    return false;
  }
}

export { submitForm };
