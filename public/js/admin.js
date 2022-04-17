const deleteButtons = document.querySelectorAll('.admin-delete-button');
const resultsContainer = document.querySelector('.results-container');
const adminLogin = document.getElementById('admin-login-button');
const footer = document.querySelector('.footer');
const body = document.querySelector('body');

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

adminLogin.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('full-overlay');
    overlay.classList.add('overlay-visible');

    const loginModal = document.createElement('div');
    loginModal.classList.add('login-modal');

    const loginTitle = document.createElement('h1');
    loginTitle.classList.add('modal-name');
    loginTitle.innerHTML = 'Administrator Login';

    const userLabel = document.createElement('label');
    userLabel.classList.add('login-label');
    userLabel.innerHTML = 'Admin Name';

    const userInput = document.createElement('input');
    userInput.classList.add('login-input');
    userInput.classList.add('login-input-name');
    userInput.setAttribute('type', 'text');


    const passwordLabel = document.createElement('label');
    passwordLabel.classList.add('login-label');
    passwordLabel.innerHTML = 'Admin Password';

    const passwordInput = document.createElement('input');
    passwordInput.classList.add('login-input');
    passwordInput.classList.add('login-input-password');
    passwordInput.setAttribute('type', 'password');

    const loginButton = document.createElement('button');
    loginButton.classList.add('btn');
    loginButton.classList.add('login-btn');
    loginButton.innerHTML = 'Log In';
    loginButton.addEventListener('click', () => {
        console.log('login')
    });

    const closeButton = document.createElement('div');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'X';
    closeButton.addEventListener('click', () => {
        footer.removeChild(overlay);
        footer.removeChild(loginModal);
    });

    const demoLoginButton = document.createElement('button');
    demoLoginButton.classList.add('btn');
    demoLoginButton.classList.add('demo-btn');
    demoLoginButton.innerHTML = 'Demo Log In';
    demoLoginButton.addEventListener('click', () => {
        const loginName = document.querySelector('.login-input-name');
        loginName.value = 'Demo Admin';
        const loginPassword = document.querySelector('.login-input-password');
        loginPassword.value = 'password';
    });

    loginModal.appendChild(loginTitle);
    loginModal.appendChild(userLabel);
    loginModal.appendChild(userInput);
    loginModal.appendChild(passwordLabel);
    loginModal.appendChild(passwordInput);
    loginModal.appendChild(loginButton);
    loginModal.appendChild(closeButton);
    loginModal.appendChild(demoLoginButton);

    footer.appendChild(overlay);
    footer.appendChild(loginModal);
})
