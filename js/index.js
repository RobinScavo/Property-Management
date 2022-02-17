const siteMapDropdown = document.getElementById('site-map-dropdown');
const availableDropdown = document.getElementById('available-dropdown');
const resourceDropdown = document.getElementById('resource-dropdown');
const dropdownContainers = document.querySelectorAll('.dropdown-container');

for (const dropdownContainer of dropdownContainers) {
    dropdownContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dropdown-option')) return;

        if (e.target.parentElement.classList.contains('open')) {
            const openedDropdown = document.querySelector('.dropdown-option-div');
            console.log(openedDropdown.clientHeight)
            // dropdownContainer.removeChild(openedDropdown);
            dropdownContainer.classList.toggle('open');
            return;
        }

        dropdownContainer.classList.toggle('open');
        createDropdown(e);
    });
}

// DROPDOWN

const createDropdown = (e) => {
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
        optionEl.setAttribute('href', data[option]);

        optionsContainer.appendChild(optionEl);
    }


    targetDropdown.appendChild(optionsContainer);
}
