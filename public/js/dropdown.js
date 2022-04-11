const selectContainers = document.querySelectorAll('.select-container');
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
