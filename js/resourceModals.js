const troubleButtons = document.querySelectorAll('.troubleshoot-button');
const reportButton = document.querySelector('.report-button');
const troubleModal = document.querySelector('.trouble-modal');
const reportModal = document.querySelector('.report-modal');
const overlay = document.querySelector('.full-overlay');

const troubleTips = {
    title: 'Troubleshooting Common Issues',
    subtitle: 'Please try troubleshooting your issue before submitting any repair request',
    children: [
        {'No Electricity': ['Check all breakers', 'Flip them hard to the OFF position and then hard to the ON position.']},
        {'No Power to Plugs or Light Switches': ['Check and reset breaker panel.', 'Check and reset all GFI (Ground Fault Indicator) outlets (located in the kitchen, bathrooms, utility room, and garage).', 'Check to see if plug works off a wall switch.']},
        {'No Heat': ['Check to make sure thermostat is set to 68 degrees, and on auto, not fan.', 'Did you pay your utility bill on time or issue an order to disconnect services?']},
        {'No Hot Water': ['Check and reset breaker in power panel']},
        {'Plumbing or Fixtures Leak': ['Turn off water fixture and turn off water at supply line and notify MPM immediately.']},
        {"Smoke Detectors Don't Work": ['Press the test button or test with approved smoke detector spray. Replace battery.']},
        {'Smoke Detector Beeps': ['Replace battery']},
        {'Clogged Toilet': ['No paper products other than toilet paper should be flushed down the toilet.', 'Plunge to remove the clog']},
        {'Overflowing Toilet': ['If your toilet overflows, or you notice water at the base of the toilet', 'a. Turn off valve at the base of the toilet.', 'b. Wipe up excess water.', 'c. Submit a Maintenence Request.']},
        {'Garbage Disposal Not Working': ['When garbage disposal is on, do you hear a buzz?', 'NO: Hit the reset button on the bottom of the disposal and test.', 'YES: Turn off disposal and unplug from wall.', 'Mounted on the side of the disposal or side of cabinet may be an Allen Wrench. Put the wrench in the center shaft and gently twist back and forth (this unjams the disposal)', 'Remove the object that is causing the obstruction, turn back on and test.']},
        {'Clogged Sink': ['DO NOT use Drano and other caustic cleaners to unclog your drain.. These products are very harmful to both the plumbing and our technicians servicing your drains.', 'Use maintenance form to request repair']},
        {"Dishwasher Doesn't Drain": ['Clean food/debris out of bottom of dishwasher.']},
        {'Dishwasher Grinds or No Water is Coming In': ['Turn off dishwasher.', 'If no water is on the bottom, pour two large glasses of water into the bottom and re-start.', 'If problem continues, call MPM immediately and discontinue use.']},
        {'Calcium Build-Up in Dishwasher': ['Pour a little white vinegar in your dishwasher and run it while empty.']},
        {'Refrigerator Too Warm or Too Cold': ['Check if thermostat in refrigerator is set correctly.']}
    ]
}

const reportForm = {
    title: 'What Went Wrong?',
    subtitle: "We're sorry to hear you're having an issue and appreciate the opportunity to help resolve it. Please give us all the details below and hit send.",
    children: [
        {'text': 'Your Name'},
        {'text': 'Your Address'},
        {'tel': 'Phone Number'},
        {'email': 'Your Email'},
        {'text': 'Address of Concern'},
        {'date': 'Date of Issue'},
        {'time': 'Time of Issue'},
        {'textarea': 'Describe Your Issue'},
        {'radio': 'Were the Police Called?', radioValues: ['Yes', 'No']},
        {'text': 'If Yes: Responding Officers Name'},
        {'radio': 'Did the Police File a Report?', radioValues: ['Yes', 'No']},
        {'radio': 'Was Anyone Arrested?', radioValues: ['Yes', 'No']},
        {'radio': 'Was Any Property Damaged?', radioValues: ['Yes', 'No', 'Not Sure']},
        {'textarea': 'If Yes: Please Describe Damage:'},
    ]
}

const placeholderArray = ['Jane Doe', '123 45th st w', '406-555-1212', 'janedoe@gmail.com', '123 45th st w', 'mm/dd/yyyy', '11:30 AM', '...', '', 'John Doe', '', '', '', '...'];

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
    } else {
        reportChildren(modal)
    }

    modal.scrollIntoView();
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
    form.setAttribute('onkeydown', "return event.key != 'Enter';");
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
        } else {
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
        console.log(form.elements[i].required)
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
