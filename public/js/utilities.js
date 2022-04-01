// CALL BUTTON

const callButtons = document.querySelectorAll('.call-button');

const isMobile = window.matchMedia("only screen and (max-width:600px)").matches;

callButtons.forEach((callButton) => {
    callButton.addEventListener('click', () => {
        if (isMobile) {
            window.open('tel:4065551212')
        } else {
            callButton.innerHTML = '406-555-1212';
        }
    })
});
