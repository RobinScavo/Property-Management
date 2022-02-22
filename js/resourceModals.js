const troubleButtons = document.querySelectorAll('.troubleshoot-button');
const reportButton = document.querySelector('.report-button');
const criteriaButton = document.getElementById('criteria-button');
const petCriteriaButton = document.getElementById('pet-criteria-button');
const repairRequest = document.getElementById('repair-request');
const troubleModal = document.querySelector('.trouble-modal');
const reportModal = document.querySelector('.report-modal');
const overlay = document.querySelector('.full-overlay');

const showModal = (inputPojo) => {
    overlay.classList.add('overlay-visible');

    const modal = (inputPojo.title === 'Troubleshooting Common Issues')
        ? troubleModal
        : reportModal;

    modal.classList.add('visible');

    const closeButton = document.createElement('div');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'X';
    closeButton.addEventListener('click', () => {
        modal.innerHTML = '';
        modal.classList.remove('visible');
        overlay.classList.remove('overlay-visible');
    });

    const modalTitle = document.createElement('div');
    modalTitle.classList.add('modal-name');
    modalTitle.innerText = inputPojo.title;

    const modalSubtitle = document.createElement('p');
    modalSubtitle.classList.add('modal-text');
    modalSubtitle.innerText = inputPojo.subtitle;

    modal.appendChild(closeButton);
    modal.appendChild(modalTitle);
    modal.appendChild(modalSubtitle);

    if (inputPojo.title === 'Troubleshooting Common Issues') {
        troubleChildren(modal)
    } else if (inputPojo.title === 'What Went Wrong?') {
        reportChildren(modal)
    } else {
        criteriaChildren(modal)
    }

    modal.scrollIntoView();
}

const criteriaChildren = (modal) => {
    const criteriaContainer = document.createElement('div');
    criteriaContainer.classList.add('criteria-container');

    for (let [index, child] of rentalCriteria.children.entries()) {
        const criteriaChild = document.createElement('h2');
        criteriaChild.classList.add('criteria-child');
        criteriaChild.innerHTML =`${index}: ${child}`;

        criteriaContainer.appendChild(criteriaChild);
    }

    modal.appendChild(criteriaContainer);
}

const troubleChildren = (modal) => {
    for (let [index, child] of troubleTips.children.entries()) {
        const issue = Object.keys(child);

        const expandButton = document.createElement('button');
        expandButton.classList.add('expand-button');
        expandButton.setAttribute('id', index);

        const issueEl = document.createElement('p');
        issueEl.classList.add('modal-issue');
        issueEl.setAttribute('id', index);
        issueEl.innerText = issue;

        const issueDiv = document.createElement('div');
        issueDiv.classList.add('issue-div');
        issueDiv.setAttribute('id', index);
        issueDiv.addEventListener('click', (e) => toggleExpand(e));

        issueDiv.appendChild(expandButton);
        issueDiv.appendChild(issueEl);

        const resolutionDiv = document.createElement('ul');
        resolutionDiv.classList.add('resolution-div');

        const resolutions = Object.values(child)

        for (let resolution of resolutions[0]) {
            const resolutionEl = document.createElement('li');
            resolutionEl.innerText = resolution;
            resolutionDiv.appendChild(resolutionEl);
        }

        modal.appendChild(issueDiv);
        modal.appendChild(resolutionDiv);
    }
}

const reportChildren = (modal) => {
    const form = document.createElement('form');
    form.setAttribute('name', 'report-form');
    form.setAttribute('method', 'POST');
    form.setAttribute('netlify-honeypot', 'bot-field');
    form.setAttribute('data-netlify', true);
    form.setAttribute('onkeydown', "return event.key != 'Enter';");

    // Netlify form requirement
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'form-name');
    hiddenInput.setAttribute('value', 'report-form');

    form.appendChild(hiddenInput);

    // Netlify honey-pot protection
    const honeypotContainer =  document.createElement('p');
    honeypotContainer.classList.add('hidden-honeypot');

    const honeypot = document.createElement('input');
    honeypot.setAttribute('name', 'bot-field');
    honeypot.setAttribute('label', 'Do not fill this out if you are human')

    honeypotContainer.appendChild(honeypot);
    form.appendChild(honeypotContainer);

    // Validate on pressing enter
    form.onkeydown = function(e) {
        if (e.key == "Enter") {
            e.preventDefault();
            validateForm(form);
        }
    }

    for (let [index, child] of reportForm.children.entries()) {
        const inputType = Object.keys(child)[0];
        let requiredText = '';

        const inputDiv = document.createElement('div');
        inputDiv.classList.add('input-div');

        const label = document.createElement('label');
        label.classList.add('report-label');
        label.innerText = reportForm.children[index][inputType];

        inputDiv.appendChild(label);

        if (inputType === 'radio') {
            const radioOptions = reportForm.children[index].radioValues;
            const radioName = reportForm.children[index][inputType];

            radioOptions.forEach((option) => {
                const radioInput = document.createElement('input');
                radioInput.setAttribute('type', inputType);
                radioInput.setAttribute('name', `${radioName}`);
                radioInput.classList.add('report-radio-input');

                const optionText = document.createElement('p');
                optionText.classList.add('report-option-text');
                optionText.innerText = option;
                radioInput.setAttribute('value', option);

                inputDiv.appendChild(optionText);
                inputDiv.appendChild(radioInput);
            });
        } else if (inputType === 'textarea') {
            const textarea = document.createElement('textarea');
            textarea.classList.add('report-textarea');
            textarea.setAttribute('rows', '4');
            textarea.setAttribute('placeholder', placeholderArray[index]);

            if (child.textarea === 'Describe Your Issue') {
                textarea.setAttribute('required', true);
                requiredText = 'REQUIRED';
            };

            inputDiv.appendChild(textarea);
        } else if (child.text !== 'If Yes: Responding Officers Name') {
            const input = document.createElement('input');
            input.setAttribute('type', inputType);
            input.setAttribute('required', true);
            requiredText = 'REQUIRED';
            input.setAttribute('placeholder', placeholderArray[index]);
            input.classList.add('report-input');

            inputDiv.appendChild(input);
        }

        const requirementDiv = document.createElement('div');
        requirementDiv.classList.add('requirement-div');

        const requirementText = document.createElement('h2');
        requirementText.innerText = requiredText;
        requirementText.classList.add('requirement-text');

        const checkmarkDiv = document.createElement('div');
        checkmarkDiv.classList.add('checkmark-div');
        checkmarkDiv.classList.add('hidden');

        const xMarkDiv = document.createElement('div');
        xMarkDiv.classList.add('x-mark-div');
        xMarkDiv.classList.add('hidden');

        requirementDiv.appendChild(requirementText);
        requirementDiv.appendChild(checkmarkDiv);
        requirementDiv.appendChild(xMarkDiv);
        inputDiv.appendChild(requirementDiv);
        form.appendChild(inputDiv);
    }

    // SUBMIT BUTTON
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.classList.add('btn');
    submitButton.classList.add('report-submit');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault;
        const form = document.querySelector('form');
        validateForm(form);
    });

    form.appendChild(submitButton);
    modal.appendChild(form);
}

const toggleExpand = (e) => {
    const resolutions = document.querySelectorAll('.resolution-div');
    const expandIcons = document.querySelectorAll('.expand-button');

    const index = e.target.id;
    const target = resolutions[index];
    const icon = expandIcons[index];

    icon.classList.toggle('expanded-icon');
    target.classList.toggle('expanded-div');
}

const validateForm = (form) => {
    const checkmarks = document.querySelectorAll('.checkmark-div');
    const xMarks = document.querySelectorAll('.x-mark-div');
    const requirements = document.querySelectorAll('.requirement-text');

    for (let i = 0; i < form.elements.length -6; i ++) {
        if (form.elements[i].required && form.elements[i].value) {
            checkmarks[i].classList.remove('hidden');
            requirements[i].classList.add('hidden');
            xMarks[i].classList.add('hidden');
        } else if (form.elements[i].required) {
            xMarks[i].classList.remove('hidden');
            requirements[i].classList.add('hidden');
            alert('Please fill out all required fields.');
            return;
        }
    }

    if (!validatePhone(form.elements[2].value)) {
        xMarks[2].classList.remove('hidden');
        requirements[2].classList.add('hidden');
        checkmarks[2].classList.add('hidden');
        alert('Please provide a valid phone number.');
        return;
    }

    if (!validateEmail(form.elements[3].value)) {
        xMarks[3].classList.remove('hidden');
        requirements[3].classList.add('hidden');
        checkmarks[3].classList.add('hidden');
        alert('Please provide a valid email.');
        return;
    }

    console.log('submit')
    alert('Your report has been filed. A representative will be in contact.')
}

const alert = (message) => {
    const form = document.querySelector('form');

    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.classList.add('report-alert');

    const alertTextEl = document.createElement('h2');
    alertTextEl.innerHTML = message;
    alert.appendChild(alertTextEl);

    const okButton = document.createElement('button');
    okButton.classList.add('btn');
    okButton.classList.add('okButton');
    okButton.innerText = 'OK';
    okButton.addEventListener('click', () => form.removeChild(alert));

    alert.appendChild(okButton);
    form.appendChild(alert);
    alert.scrollIntoView();
}

troubleButtons.forEach((button) => {
    button.addEventListener('click', () => {
        showModal(troubleTips);
    });
});

reportButton.addEventListener('click', () => {
    showModal(reportForm);
});

repairRequest.addEventListener('click', () => {
    showModal(reportForm);
});

criteriaButton.addEventListener('click', () => {
    showModal(rentalCriteria);
});

petCriteriaButton.addEventListener('click', () => {
    showModal(petCriteria);
});

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
