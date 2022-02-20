const siteMapSelector = document.getElementById('site-map-selector');
const availableSelector = document.getElementById('available-selector');
const resourceSelector = document.getElementById('resource-selector');
const siteMapContainer = document.getElementById('site-map-container');
const availableContainer = document.getElementById('available-container');
const resourceContainer = document.getElementById('resource-container');
const selectContainers = document.querySelectorAll('.select-container');
const optionContainers = document.querySelectorAll('.option-container');
const dropdownContainers = document.querySelectorAll('.dropdown-container');

for (const [index, selectContainer] of selectContainers.entries()) {
    console.log(dropdownContainers[index])
    selectContainer.addEventListener('click', () => {
        dropdownContainers[index].classList.toggle('open');
    });
}


const createDropdown = (optionContainer) => {
    let data = {};

    if (optionContainer.id === 'site-map-container') {
        data = {...siteMapOptions};
    } else if (optionContainer.id === 'available-container') {
        data = {};
    } else {
        data = {...resourceOptions}
    }

    for (let option in data) {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option-text-div');

        const optionText = document.createElement('a');
        optionText.classList.add('dropdown-option');
        optionText.innerText = option;
        optionText.setAttribute('href', data[option]);

        const optionAccentDiv = document.createElement('div');
        optionAccentDiv.classList.add('option-accent-div');

        const optionAccent = document.createElement('p');
        optionAccent.innerText = 'V';

        optionAccentDiv.appendChild(optionAccent);

        optionDiv.appendChild(optionAccentDiv);
        optionDiv.appendChild(optionText);
        optionContainer.appendChild(optionDiv);
    }

    const parent = optionContainer.parentElement
    parent.appendChild(optionContainer);
}

for (let optionContainer of optionContainers) {
    createDropdown(optionContainer)
}