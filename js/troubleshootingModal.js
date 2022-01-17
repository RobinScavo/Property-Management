const button = document.querySelector('.troubleshoot-button');
const modal = document.querySelector('.trouble-modal');
const overlay = document.querySelector('.full-overlay')

button.addEventListener('click', () => {
    overlay.classList.add('overlay-visible');
    modal.classList.add('visible');
});
