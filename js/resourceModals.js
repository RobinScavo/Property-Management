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
        {'button': 'Submit'},
    ]
}

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

    const troubleTitle = document.createElement('div');
    troubleTitle.classList.add('modal-name');
    troubleTitle.innerText = inputPojo.title;

    const troubleSubtitle = document.createElement('p');
    troubleSubtitle.classList.add('modal-text');
    troubleSubtitle.innerText = inputPojo.subtitle;

    modal.appendChild(closeButton);
    modal.appendChild(troubleTitle);
    modal.appendChild(troubleSubtitle);

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
    for (let [index, child] of reportForm.children.entries()) {
        const inputType = Object.keys(child)[0];

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
            textarea.setAttribute('rows', '3');

            inputDiv.appendChild(textarea);
        } else if (inputType === 'button') {
            label.classList.add('hidden-label');
            console.log('button');
            const reportSubmit =  document.createElement('button');
            reportSubmit.classList.add('btn');
            reportSubmit.classList.add('report-submit');

            inputDiv.appendChild(reportSubmit);
        } else {
            const input = document.createElement('input');
            input.setAttribute('type', inputType);
            input.classList.add('report-input');

            inputDiv.appendChild(input);
        }

        modal.appendChild(inputDiv);
    }
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

troubleButtons.forEach((button) => {
    button.addEventListener('click', () => {
        showModal(troubleTips);
    });
});

reportButton.addEventListener('click', () => {
    showModal(reportForm);
});
