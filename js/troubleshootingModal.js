const troubleButton = document.querySelector('.troubleshoot-button');
const reportButton = document.querySelector('.report-button');

const modal = document.querySelector('.trouble-modal');
const overlay = document.querySelector('.full-overlay');

const troubleTips = {
    title: 'Troubleshooting Common Issues',
    subtitle: 'Please try troubleshooting your issue before submitting any repair request',
    children: [
        {'No Electricity': ['Check all breakers', 'Flip them hard to the OFF position and then hard to the ON position.']},
        {'No Power to Plugs or Light Switches.': ['Check and reset breaker panel.', 'Check and reset all GFI (Ground Fault Indicator) outlets (located in the kitchen, bathrooms, utility room, and garage).', 'Check to see if plug works off a wall switch.']},
        {'No Heat:': ['Check to make sure thermostat is set to 68 degrees, and on auto, not fan.', 'Did you pay your utility bill on time or issue an order to disconnect services?']},
        {'No Hot Water': 'Check and reset breaker in power panel'},
        {'Plumbing or Fixtures Leak': 'Turn off water fixture and turn off water at supply line and notify MPM immediately.'},
        {"Smoke Detectors Don't Work": ['Press the test button or test with approved smoke detector spray. Replace battery.']},
        {'Smoke Detector Beeps': ['Replace battery']},
        {'Clogged Toilet': ['No paper products other than toilet paper should be flushed down the toilet.', 'Plunge to remove the clog']},
        {'Overflowing Toilet': ['If your toilet overflows, or you notice water at the base of the toilet', 'a. Turn off valve at the base of the toilet.', 'b. Wipe up excess water.', 'c. Submit a Maintenence Request.']},
        {'Garbage Disposal Not Working': ['When garbage disposal is on, do you hear a buzz?', 'NO: Hit the reset button on the bottom of the disposal and test.', 'YES: Turn off disposal and unplug from wall.', 'Mounted on the side of the disposal or side of cabinet may be an Allen Wrench. Put the wrench in the center shaft and gently twist back and forth (this unjams the disposal)', 'Remove the object that is causing the obstruction, turn back on and test.']},
        {'Clogged Sink': ['DO NOT use Drano and other caustic cleaners to unclog your drain.. These products are very harmful to both the plumbing and our technicians servicing your drains.', 'Use maintenance form to request repair']},
        {"Dishwasher Doesn't Drain": 'Clean food/debris out of bottom of dishwasher.'},
        {'Dishwasher Grinds or No Water is Coming In': ['Turn off dishwasher.', 'If no water is on the bottom, pour two large glasses of water into the bottom and re-start.', 'If problem continues, call MPM immediately and discontinue use.']},
        {'Calcium Build-Up in Dishwasher': ['Pour a little white vinegar in your dishwasher and run it while empty.']},
        {'Refrigerator Too Warm or Too Cold': ['Check if thermostat in refrigerator is set correctly.']}
    ]
}

const showTroubleModal = () => {
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

    const troubleTitle = document.createElement('div');
    troubleTitle.classList.add('modal-name');
    troubleTitle.innerText = troubleTips.title;

    const troubleSubtitle = document.createElement('p');
    troubleSubtitle.classList.add('modal-text');
    troubleSubtitle.innerText = troubleTips.subtitle;

    modal.appendChild(closeButton);
    modal.appendChild(troubleTitle);
    modal.appendChild(troubleSubtitle);

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
        // resolutionDiv.classList.add('hidden');

        const resolutions = Object.values(child)

        for (let resolution of resolutions[0]) {
            const resolutionEl = document.createElement('li');
            resolutionEl.innerText = resolution;
            resolutionDiv.appendChild(resolutionEl);
        }

        modal.appendChild(issueDiv);
        modal.appendChild(resolutionDiv);
    }


    modal.scrollIntoView();
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

const showReportModal = () => {

}

troubleButton.addEventListener('click', () => {
    showTroubleModal();
});

reportButton.addEventListener('click', () => {
    showReportModal();
});
