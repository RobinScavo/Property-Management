const deleteButtons = document.querySelectorAll('.admin-delete-button');
const resultsContainer = document.querySelector('.results-container');

deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const alert = document.createElement('div');
        alert.classList.add('alert');

        const alertTextEl = document.createElement('h2');
        alertTextEl.innerHTML = "Remove this listing from the database?";

        const cancelDelete = document.createElement('button');
        cancelDelete.classList.add('btn');
        cancelDelete.classList.add('cancel-delete-button');
        cancelDelete.innerHTML = 'Cancel';
        cancelDelete.addEventListener('click', () => {
            resultsContainer.removeChild(alert)
        });

        const confirmDelete = document.createElement('button');
        confirmDelete.classList.add('btn');
        confirmDelete.innerHTML = 'Delete';
        confirmDelete.addEventListener('click', () => {
            const endpoint = `/listings/${button.id}`;

            fetch (endpoint, {
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((data) => window.location.href = data.redirect)
            .catch(err => console.log(err))
        })

        alert.appendChild(alertTextEl);
        alert.appendChild(confirmDelete);
        alert.appendChild(cancelDelete);

        resultsContainer.appendChild(alert);
        alert.scrollIntoView();
    })
})
