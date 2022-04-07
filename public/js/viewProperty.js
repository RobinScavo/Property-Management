const forwardButton = document.getElementById('right-carousel-button');
const backButton = document.getElementById('left-carousel-button');
const thumbnails = document.querySelectorAll('.thumbnail-image');
const thumbnail = document.querySelector('.thumbnail-image');
const carousel = document.querySelector('.carousel-container');
const mainImage = document.querySelector('.main-image-container');
const thumbnailDiv = document.querySelector('.thumbnail-div');
const slidesLength = mainImage.querySelectorAll('div').length;
const overlay = document.querySelector('.carousel-overlay');
const imageText = document.querySelector('.carousel-text');
const imageURLs = document.querySelector('.image-urls').innerHTML.split(',');
const imageTextArray = document.querySelector('.image-text-array').innerHTML.split(',');

let targetProperty;
let activeSlideIndex = 0;
let runSlideShow;
let manuallyToggling = false;

backButton.addEventListener('click', () => {
    manuallyToggling  = true;
    clearTimeout(runSlideShow);
    toggleCarousel('left', activeSlideIndex);
});

forwardButton.addEventListener('click', () => {
    manuallyToggling  = true;
    clearTimeout(runSlideShow);
    toggleCarousel('right', activeSlideIndex);
});

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        console.log(index)
        manuallyToggling  = true;
        toggleCarousel(null, index+1);
    });
})

const toggleCarousel = (direction, index) => {
    const sliderWidth = carousel.clientWidth;
    const thumbnailWidth = thumbnail.clientWidth;

    activeSlideIndex = index;

    overlay.classList.remove('carousel-visible');
    imageText.classList.remove('carousel-text-visible');
    overlay.classList.add('carousel-hidden');
    imageText.classList.add('carousel-text-hidden');

    if (direction === 'right') {
        activeSlideIndex++;
        if (activeSlideIndex > slidesLength - 1) {
            activeSlideIndex = 0;
        }
    } else if (direction === 'left') {
        activeSlideIndex--;
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesLength -1;
        }
    }

    mainImage.style.transform = `translateX(-${activeSlideIndex * sliderWidth}px)`;
    thumbnailDiv.style.transform = `translateX(-${activeSlideIndex * (thumbnailWidth + 30)}px)`;

    if (!manuallyToggling) {
        setTimeout(function() {
            slideShow(imageURLs, activeSlideIndex)
        }, 1500);
    }
}

const slideShow = (imageURLs, index) => {
    imageText.innerText = imageTextArray[index];

    overlay.classList.add('carousel-visible');
    overlay.classList.remove('carousel-hidden');
    imageText.classList.add('carousel-text-visible');
    imageText.classList.remove('carousel-text-hidden');

    runSlideShow = setTimeout(() => toggleCarousel('right', index), 3500)

}

setTimeout(() => slideShow(imageURLs, activeSlideIndex), 1000)

// const viewProperty = (target) => {
//     searchHeader.classList.add('undisplayed');
//     if (searchMain.contains(resultsContainer)) {
//         searchMain.removeChild(resultsContainer);
//     }
//     mapButton.classList.add('undisplayed');
//     mapEl.classList.remove('undisplayed');

//     for (const property of properties) {
//         if (property.id === +target) {
//             targetProperty = property;
//             continue;
//         }
//     }

//     const propertyContainer = document.createElement('div');
//     propertyContainer.classList.add('detail-container');

//     const backButton = document.createElement('button');
//     backButton.classList.add('btn');
//     backButton.classList.add('back-button');
//     backButton.innerText = 'Back to Results';
//     backButton.addEventListener('click', () => {
//         clearTimeout(runSlideShow);
//         searchMain.removeChild(propertyContainer);
//         searchMain.appendChild(resultsContainer);
//         displayProperties(currentIndex);
//     });

//     const detailAddress = document.createElement('h1');
//     detailAddress.classList.add('detail-address');
//     detailAddress.innerText = `${targetProperty.address}`;

//     const detailCity = document.createElement('p');
//     detailCity.classList.add('detail-city');
//     detailCity.innerText = `${targetProperty.city}`;

//     propertyContainer.appendChild(backButton);
//     propertyContainer.appendChild(detailAddress);
//     propertyContainer.appendChild(detailCity);

//     const carousel = buildCarousel(targetProperty);
//     const thumbnails = buildThumbnails(targetProperty);
//     const infoDiv = buildInfoDiv(targetProperty);
//     initMap([targetProperty]);

//     propertyContainer.appendChild(carousel);
//     propertyContainer.appendChild(thumbnails);
//     propertyContainer.appendChild(infoDiv);

//     searchMain.appendChild(propertyContainer);

//     setTimeout(() => slideShow(targetProperty, activeSlideIndex), 1000)
// }

const buildCarousel = (targetProperty) => {
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel-container');

    const carouselDiv = document.createElement('div');
    carouselDiv.classList.add('main-image-container');

    const carouselOverlay = document.createElement('div');
    carouselOverlay.classList.add('carousel-overlay');
    carouselOverlay.classList.add('carousel-hidden');

    const carouselButtonContainer = document.createElement('div');
    carouselButtonContainer.classList.add('carousel-button-container');

    const leftCarouselButton = document.createElement('button');
    leftCarouselButton.classList.add('carousel-button');
    leftCarouselButton.addEventListener('click', () => {
        manuallyToggling  = true;
        clearTimeout(runSlideShow);
        toggleCarousel('left', activeSlideIndex);
    });

    const rightCarouselButton = document.createElement('button');
    rightCarouselButton.classList.add('carousel-button');
    rightCarouselButton.classList.add('carousel-button-right');
    rightCarouselButton.addEventListener('click', () => {
        manuallyToggling  = true;
        clearTimeout(runSlideShow);
        toggleCarousel('right', activeSlideIndex);
    });

    const carouselText = document.createElement('p');
    carouselText.classList.add('carousel-text');
    carouselText.classList.add('carousel-text-hidden');
    carouselText.innerText = '';

    for (const [index, image] of targetProperty.imageURLs.entries()) {
        const mainImage = document.createElement('div');
        mainImage.classList.add('main-image');
        mainImage.setAttribute('style', `background-image: url('${image}')`);
        mainImage.setAttribute('alt', targetProperty.imageAlts[index]);

        carouselDiv.appendChild(mainImage);
    }

    carouselButtonContainer.appendChild(leftCarouselButton);
    carouselButtonContainer.appendChild(carouselText);
    carouselButtonContainer.appendChild(rightCarouselButton);

    carouselContainer.appendChild(carouselButtonContainer);
    carouselContainer.appendChild(carouselDiv);
    carouselContainer.appendChild(carouselOverlay);

    return carouselContainer;
}

// const buildThumbnails = (targetProperty) => {
//     const thumbnailContainer = document.createElement('div');
//     thumbnailContainer.classList.add('thumbnail-container');

//     const thumbnailDiv = document.createElement('div');
//     thumbnailDiv.classList.add('thumbnail-div');

//     for (const [index, image] of targetProperty.imageURLs.entries()) {
//         if (index === 0) continue;
//         const thumbnail = document.createElement('div');
//         thumbnail.classList.add('thumbnail-image');
//         thumbnail.setAttribute('style', `background-image: url('${image}')`);
//         thumbnail.setAttribute('alt', targetProperty.imageAlts[index]);
//         thumbnail.addEventListener('click', () => {
//             manuallyToggling  = true;
//             toggleCarousel(null, index);
//         });

//         thumbnailDiv.appendChild(thumbnail);
//         thumbnailContainer.appendChild(thumbnailDiv);
//     }

//     thumbnailContainer.appendChild(thumbnailDiv);

//     return thumbnailContainer;
// }

// const buildInfoDiv = (targetProperty) => {
//     const target = targetProperty.propertyInfo;
//     const infoContainer = document.createElement('div');
//     infoContainer.classList.add('info-container');

//     target.forEach((info) => {
//         const infoDiv = document.createElement('div');
//         infoDiv.classList.add('info-div');

//         if (info.icon) {
//             const infoIconDiv = document.createElement('div');
//             infoIconDiv.classList.add('icon-container');
//             if (info.icon === '../images/icons/pets-icon.png') {
//                 infoIconDiv.classList.add('info-icon-pets');
//             }

//             const icon = document.createElement('img');
//             icon.classList.add('property-details-icon');
//             icon.setAttribute('src', `${info.icon}`);

//             infoIconDiv.appendChild(icon);
//             infoDiv.appendChild(infoIconDiv);
//         }

//         const infoTitle = document.createElement('h3');
//         infoTitle.classList.add('info-title');
//         infoTitle.innerText = `${info.title}`;

//         infoDiv.appendChild(infoTitle);

//         info.infoArray.forEach((el) => {
//             const infoElement = document.createElement('p');
//             infoElement.classList.add('info-array-element')
//             infoElement.innerText = `${el}`;

//             infoDiv.appendChild(infoElement);
//         });

//         infoContainer.appendChild(infoDiv);
//     });

//     return infoContainer
// }

// const toggleCarousel = (direction, index) => {
//     const carousel = document.querySelector('.carousel-container');
//     const mainImage = document.querySelector('.main-image-container');
//     const thumbnails = document.querySelector('.thumbnail-image');
//     const thumbnailDiv = document.querySelector('.thumbnail-div');
//     const slidesLength = mainImage.querySelectorAll('div').length;
//     const overlay = document.querySelector('.carousel-overlay');
//     const imageText = document.querySelector('.carousel-text');

//     const sliderWidth = carousel.clientWidth;
//     const thumbnailWidth = thumbnails.clientWidth;

//     activeSlideIndex = index;

//     overlay.classList.remove('carousel-visible');
//     imageText.classList.remove('carousel-text-visible');
//     overlay.classList.add('carousel-hidden');
//     imageText.classList.add('carousel-text-hidden');

//     if (direction === 'right') {
//         activeSlideIndex++;
//         if (activeSlideIndex > slidesLength - 1) {
//             activeSlideIndex = 0;
//         }
//     } else if (direction === 'left') {
//         activeSlideIndex--;
//         if (activeSlideIndex < 0) {
//             activeSlideIndex = slidesLength -1;
//         }
//     }

//     mainImage.style.transform = `translateX(-${activeSlideIndex * sliderWidth}px)`;
//     thumbnailDiv.style.transform = `translateX(-${activeSlideIndex * (thumbnailWidth + 30)}px)`;

//     if (!manuallyToggling) {
//         setTimeout(function() {
//             slideShow(targetProperty, activeSlideIndex)
//         }, 1500);
//     }
// }

// const slideShow = (targetProperty, index) => {
//     const overlay = document.querySelector('.carousel-overlay');
//     const imageText = document.querySelector('.carousel-text');

//     if (searchMain.contains(resultsContainer)) return;

//     imageText.innerText = targetProperty.imageTextArray[index];

//     overlay.classList.add('carousel-visible');
//     overlay.classList.remove('carousel-hidden');
//     imageText.classList.add('carousel-text-visible');
//     imageText.classList.remove('carousel-text-hidden');

//     runSlideShow = setTimeout(() => toggleCarousel('right', index), 3500)

// }
