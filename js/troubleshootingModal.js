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

        const issueExpand = document.createElement('button');
        issueExpand.classList.add('expand-button');

        const issueDiv = document.createElement('div');
        issueDiv.classList.add('issue-div');
        issueDiv.addEventListener('click', () => {
            issueExpand.classList.toggle('expanded');
        });

        const issueEl = document.createElement('p');
        issueEl.classList.add('modal-issue');
        issueEl.innerText = issue;

        issueDiv.appendChild(issueExpand);
        issueDiv.appendChild(issueEl);

        const resolutionDiv = document.createElement('ul');
        resolutionDiv.classList.add('resolution-div');
        // resolutionDiv.classList.add('hidden');

        const resolutions = Object.values(child)

        for (let resolution of resolutions[0]) {
            console.log(resolution)
            const resolutionEl = document.createElement('li');
            resolutionEl.innerText = resolution;
            resolutionDiv.appendChild(resolutionEl);
        }

        modal.appendChild(issueDiv);
        modal.appendChild(resolutionDiv);
    }


    modal.scrollIntoView();
}

const showReportModal = () => {

}

troubleButton.addEventListener('click', () => {
    showTroubleModal();
});

reportButton.addEventListener('click', () => {
    showReportModal();
});
