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
            <img class='user-image' src="${results[counter].picture.thumbnail}">
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
