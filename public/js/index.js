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
    selectContainer.addEventListener('click', () => {
        if (dropdownContainers[index].classList.contains('open')) {
            dropdownContainers[index].classList.remove('open');
            return;
        }
        for (const dropdownContainer of dropdownContainers) {
            if (dropdownContainer.classList.contains('open')) {
                dropdownContainer.classList.remove('open');
            }
        }
        dropdownContainers[index].classList.toggle('open');
    });
}

const dropDownViewProperty = (option) => {
    if (option > 4) option = 4;
    window.location.href = `../html/propertySearch.html#${option}`;
}


const createDropdown = (optionContainer) => {
    let data = {};

    if (optionContainer.id === 'site-map-container') {
        data = {...siteMapOptions};
    } else if (optionContainer.id === 'available-container') {
        for (const [index, property] of properties.entries()) {
            data[property.address] = index;
        }
    } else {
        data = {...resourceOptions}
    }

    for (let option in data) {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option-text-div');

        const optionAccentDiv = document.createElement('div');
        optionAccentDiv.classList.add('option-accent-div');

        const optionAccent = document.createElement('p');
        optionAccent.innerText = '+';

        const optionText = document.createElement('a');
        optionText.classList.add('dropdown-option');
        optionText.innerText = option;

        if (optionContainer.id === 'available-container') {
            optionText.setAttribute('onclick', `dropDownViewProperty(${data[option]})`);
        } else {
            optionText.setAttribute('href', data[option]);
        }

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
