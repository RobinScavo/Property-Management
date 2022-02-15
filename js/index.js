const siteMapDropdown = document.getElementById('site-map-dropdown');
const availableDropdown = document.getElementById('available-dropdown');
const resourceDropdown = document.getElementById('resource-dropdown');
const dropdownContainers = document.querySelectorAll('.dropdown-container');

for (const dropdownContainer of dropdownContainers) {
    dropdownContainer.addEventListener('click', (e) => {
        dropdownContainer.classList.toggle('open');
        console.log(e)

        createDropdown(e);
    });
}

// DROPDOWN

const createDropdown = (e) => {
    e.stopPropagation();
    const targetDropdown = e.target.parentElement;
    let data = {};

    if (targetDropdown.id === 'site-map-dropdown') {
        data = {...siteMapOptions};
    } else if (targetDropdown.id === 'available-dropdown') {
        data = {}
    } else {
        data = {...resourceOptions}
    }

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('dropdown-option-div');

    for (let option in data) {
        const optionEl = document.createElement('a');
        optionEl.classList.add('dropdown-option');
        optionEl.innerText = option;
        optionEl.setAttribute('src', data[option]);

        optionsContainer.appendChild(optionEl);
    }

    console.log(targetDropdown)

    targetDropdown.appendChild(optionsContainer);
}
