const testimonials = document.querySelector('.testimonials-div');

const testimonialArray = [
    'Leapold was very helpful during an emergency I had with my apartment. She had the maintenence crew respond quickly and even followed up later to see that it was resolved. Thank you so much!',
    'Billings Property Management was real easy to work with. Robin was friendly, professional and responsive. I will certainly use BPM in the future.',
    'Leapold was very helpful!',
    'I highly recommend Leapold to anyone seeking a rental.',
    'Prompt and professional!',
]

const dates = ['Nov 10 2021', 'Nov 17 2021', 'Nov 22 2021', 'Dec 3 2021', 'Dec 8 2021', 'Dec 18 2021', 'Dec 23 2021', 'Dec 29 2021', 'Jan 5 2022', 'Jan 11 2022']

let counter = 0;
let results = {};

async function getUsers() {
    let response = await fetch('https://randomuser.me/api/?results=5&inc=name,picture&nat=US');
    let data = await response.json();

    return data;
}


const createCard = ({results}) => {
    const stars = createStars();
    const newCard = document.createElement('div');
    newCard.classList.add('testimonial-card');

    const cardInnerHTML = `
        <div class='user-profile'>
            <img class='user-image' src="${results[counter].picture.thumbnail}" alt='random user image'>
            <div class='user-text'>
                <h2 class='user-name'>${results[counter].name.first} ${results[counter].name.last}</h2>
                <h3 class='user-date'>${dates[counter]}</h3>
            </div>
        </div>
        <div class='rating'><div class='rating-num'>5.0</div>${stars}</div>
        <div class='quote scrollbar-hidden'>"${testimonialArray[counter]}"</div>
    `

    newCard.innerHTML = `${cardInnerHTML}`;
    testimonials.appendChild(newCard);
    newCard.classList.add('fade-in');
}

const createStars = () => {
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += '<i class="fas fa-solid fa-star"></i>&nbsp'
    }
    return result
}

getUsers()
    .then(data => Object.assign(results, data))
    .then(results => createCard(results));


// Cycle cards on scroll
let lastKnownScrollPosition = 0;
let cycling = false;
let cyclingCards;

const cycleCards  = () => {
    const currentTestimonial = document.querySelector('.testimonial-card');
    if (counter === 4) counter = -1;
    counter++;

    if (currentTestimonial) {
        currentTestimonial.classList.add('fade-out');
        setTimeout(() => {
            testimonials.removeChild(currentTestimonial);
            createCard(results);
        }, 1000)
    }
}
// setInterval(cycleCards, 4000)
document.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = window.scrollY;

    if (!cycling && lastKnownScrollPosition > 745 && lastKnownScrollPosition < 1400) {
        window.requestAnimationFrame(function()  {
            cycling = true;
            cyclingCards = setInterval(cycleCards, 4000);
        });
    }

    if (cycling && (lastKnownScrollPosition < 745 || lastKnownScrollPosition > 1400)) {
        cycling = false;
        clearInterval(cyclingCards);
    }
});


const formButton = document.querySelector('.form-btn');
const form = document.querySelector('form');

// formButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     const alertText = validateMessage();

//     const alert = document.createElement('div');
//     alert.classList.add('alert');

//     const alertTextEl = document.createElement('h2');
//     alertTextEl.innerHTML = alertText;
//     alert.appendChild(alertTextEl);

//     const okButton = document.createElement('button');
//     okButton.classList.add('btn');
//     okButton.classList.add('okButton');
//     okButton.innerText = 'OK';
//     okButton.addEventListener('click', () => form.removeChild(alert));

//     alert.appendChild(okButton);
//     form.appendChild(alert);
//     if (alertText === 'Your message has been sent. Thank you!') {
//       for (let i = 1; i <= 5; i++) {
//         form.elements[i].value = '';
//       }
//     }
// });

// function validateMessage () {
//     let alertText = 'Your message has been sent. Thank you!';
//     const name = form.elements[2].value;
//     const email = form.elements[3].value;
//     const phone = form.elements[4].value;
//     const message = form.elements[5].value;
//     let validEmail, validPhone;

//     if (email) validEmail = validateEmail(email);
//     if (phone) validPhone = validatePhone(phone);
//     // console.log(validEmail, validPhone, email,  phone)

//     if (!name) alertText = 'Please include your name';
//     if (!message) alertText = 'Please include a message';
//     if (!email && !phone) alertText = 'Please include a valid phone number or a valid email address';
//     if (!validEmail && !validPhone) alertText = 'Please include a valid phone number or a valid email address';

//     return alertText;
// }

// function validateEmail (emailAddress) {
//   let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (emailAddress.match(regexEmail)) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function validatePhone (phoneNumber) {
//     let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

//     if (phoneNumber.match(regexPhone)) {
//         return true;
//     } else {
//         return false;
//     }
// }
