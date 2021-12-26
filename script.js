const testimonials = document.querySelector('.testimonials-div');

const testimonialArray = [
    'Leapold was very helpful during an emergency I had with my apartment. She had the maintenence crew respond quickly and even followed up later to see that it was resolved. Thank you so much!',
    'Billings Property Management was real easy to work with. Robin was friendly, professional and responsive. I will certainly use BPM in the future.',
    'Leapold was very helpful!',
    'I highly recommend Leapold to anyone seeking',
    'Prompt and professional!',
]

const dates = ['Nov 10 2021', 'Nov 17 2021', 'Nov 22 2021', 'Dec 3 2021', 'Dec 8 2021', 'Dec 18 2021', 'Dec 23 2021', 'Dec 29 2021', 'Jan 5 2022', 'Jan 11 2022']

async function getUsers() {
    let response = await fetch('https://randomuser.me/api/?results=5&inc=name,picture&nat=US');
    let data = await response.json();

    return data;
}

let counter = 0;

const createCard = ({results}) => {
    const stars = createStars();
    console.log(stars);
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

    newCard.innerHTML = `${cardInnerHTML}`
    testimonials.appendChild(newCard);
}

const createStars = () => {
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += '<i class="fas fa-solid fa-star"></i>&nbsp'
    }
    return result
}

getUsers()
    .then(data => createCard(data))







// const galleryList = document.querySelector('.gallery-list');
// const galleryItems = document.querySelectorAll('.gallery-item');

// const galleryImages = [
//     'apt.jpg',
//     'moving.jpg',
//     'pexels-arthouse-studio-4413755.jpg',
//     'pexels-cottonbro-4056535.jpg',
//     'pexels-luis-quintero-2564873.jpg',
//     'pexels-pixabay-221506.jpg',
//     'pexels-spencer-gurley-1448055.jpg',
//     'pexels-vincent-rivaud-2265881.jpg'
// ]



// for (const item of galleryImages) {
//     const location = `url(images/gallery/${item})`;

//     const newItem = document.createElement('div');

//     const imageInnerHTML = `
//         <li class='gallery-item' style='background:${location};background-size:cover'>
//             <h2>fff</h2>
//         </li>
//     `
//     newItem.innerHTML = imageInnerHTML;

//     galleryList.appendChild(newItem);
// }
