const deleteButtons = document.querySelectorAll('.admin-delete-button');
const resultsContainer = document.querySelector('.results-container');
const overlay = document.querySelector('.overlay');


deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const alert = document.createElement('div');
        alert.classList.add('alert');

        const alertTextEl = document.createElement('h2');
        alertTextEl.innerHTML = "I'm sorry. The demo admin cannot delete listings from the database.";

        const closeButton = document.createElement('div');
        closeButton.classList.add('modal-close');
        closeButton.innerText = 'X';
        closeButton.addEventListener('click', () => {
            resultsContainer.removeChild(alert)
            overlay.classList.remove('overlay-visible');
        });

        alert.appendChild(closeButton);
        alert.appendChild(alertTextEl);

        overlay.classList.add('overlay-visible');
        resultsContainer.appendChild(alert);
        alert.scrollIntoView();
    })
});
