const galleryList = document.querySelector('.gallery-list');
const galleryItems = document.querySelectorAll('.gallery-item');

const galleryImages = [
    'apt.jpg',
    'moving.jpg',
    'pexels-arthouse-studio-4413755.jpg',
    'pexels-cottonbro-4056535.jpg',
    'pexels-luis-quintero-2564873.jpg',
    'pexels-pixabay-221506.jpg',
    'pexels-spencer-gurley-1448055.jpg',
    'pexels-vincent-rivaud-2265881.jpg'
]



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
