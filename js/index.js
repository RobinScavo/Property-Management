const availableDropdown = document.getElementById('availableDropdown');
const resourceDropdown = document.getElementById('resourceDropdown');

console.log(properties);

for (let property of properties) {
    console.log(property.address)
    const blankOption = document.createElement('option');
    availableDropdown.appendChild(blankOption);
    if (property.address) {
        const option = document.createElement('option');
        option.innerText = property.address;
        availableDropdown.appendChild(option);
    }
}

availableDropdown.addEventListener('click', () => {
    console.log('click')
})
