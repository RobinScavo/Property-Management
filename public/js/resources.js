import { submitForm } from "./sendForm.js"

const modal = document.querySelector('.trouble-modal');
const overlay = document.querySelector('.full-overlay');
const submitButton = document.querySelectorAll('.submit-button');

const reportModal = document.getElementById('report-form-modal');
const repairModal = document.getElementById('repair-form-modal');
const accomodationModal = document.getElementById('accomodation-form-modal');
const modificationModal = document.getElementById('modification-form-modal');

const troubleButtons = document.querySelectorAll('.troubleshoot-button');
const criteriaButton = document.getElementById('criteria-button');
const petCriteriaButton = document.getElementById('pet-criteria-button');
const reportButton = document.querySelector('.report-button');
const accomodationRequest = document.getElementById('accomodation-request');
const modificationRequest = document.getElementById('modification-request');
const repairRequest = document.getElementById('repair-request');

const showForm = (type) => {
    const closeButtons = document.querySelectorAll('.modal-close');

    let modal;

    overlay.classList.add('overlay-visible');

    if (type === 'report') {
        modal = reportModal;
    } else if (type === 'repair') {
        modal = repairModal;
    } else if (type === 'accomodation') {
        modal = accomodationModal;
    } else if (type === 'modification') {
        modal = modificationModal;
    }

    modal.classList.remove('hidden');
    modal.classList.add('visible');

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.classList.remove('visible');
            overlay.classList.remove('overlay-visible');
        })
    });


    modal.scrollIntoView();
}

const showModal = (modalType) => {
    overlay.classList.add('overlay-visible');
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
    modalTitle.innerText = modalType.title;

    const modalSubtitle = document.createElement('p');
    modalSubtitle.classList.add('modal-text');
    modalSubtitle.innerText = modalType.subtitle;

    modal.appendChild(closeButton);
    modal.appendChild(modalTitle);
    modal.appendChild(modalSubtitle);

    if (modalType.title === 'Troubleshooting Common Issues') {
        createTroubleModal(modal)
    } else if (modalType.title === 'Rental Criteria') {
        createCriteriaModal(modal, rentalCriteria)
    } else {
        createCriteriaModal(modal, petCriteria)
    }

    modal.scrollIntoView();
}
const createCriteriaModal = (modal, data) => {
    const criteriaContainer = document.createElement('div');
    criteriaContainer.classList.add('criteria-container');

    for (let [index, child] of data.children.entries()) {
        const criteriaChild = document.createElement('h2');
        criteriaChild.classList.add('criteria-child');
        criteriaChild.innerHTML =`${index}: ${child}`;

        criteriaContainer.appendChild(criteriaChild);
    }

    modal.appendChild(criteriaContainer);
}

const createTroubleModal = (modal) => {
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
    button.addEventListener('click', () => showModal(troubleTips));
});

criteriaButton.addEventListener('click', () => {
    showModal(rentalCriteria);
});

petCriteriaButton.addEventListener('click', () => {
    showModal(petCriteria);
});

reportButton.addEventListener('click', () => {
    showForm('report');
});

repairRequest.addEventListener('click', () => {
    showForm('repair');
});

accomodationRequest.addEventListener('click', () => {
    showForm('accomodation');
});

modificationRequest.addEventListener('click', () => {
    showForm('modification');
});

submitButton.forEach(button => {
    button.addEventListener('click', (e) => submitForm(e))
})

const rentalCriteria = {
    title: 'Rental Criteria',
    subtitle: 'Please read carefully before applying',
    children: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
    ]
}

const petCriteria = {
    title: 'Pet Criteria',
    subtitle: 'Please read carefully before applying',
    children: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eligendi.',
    ]
}

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
