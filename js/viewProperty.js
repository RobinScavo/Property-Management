import { properties } from './dummyData.js';

const searchHeader = document.querySelector('.search-header');
const searchMain = document.querySelector('.search-main');

let targetProperty;

export const viewProperty = (target) => {
    let displayedImageIndex = 0;
    searchHeader.innerHTML = '';
    searchMain.innerHTML = '';

    for (const property of properties) {
        if (property.id === +target) {
            targetProperty = property;
            continue;
        }
    }

    const propertyContainer = document.createElement('div');
    propertyContainer.classList.add('detail-container');

    const detailAddress = document.createElement('h1');
    detailAddress.classList.add('detail-address');
    detailAddress.innerText = `${targetProperty.address}`;

    const carousel = document.createElement('div');
    carousel.classList.add('carousel');

    // buildCarousel(targetProperty)

    const mainImage = document.createElement('img');
    mainImage.classList.add('carousel-image');
    mainImage.setAttribute('src', targetProperty.mainImageURL);
    mainImage.setAttribute('alt', `${targetProperty.alt}`);

    const carouselOverlay = document.createElement('div');
    carouselOverlay.classList.add('carousel-overlay');

    const carouselButtonContainer = document.createElement('div');
    carouselButtonContainer.classList.add('carousel-button-container');

    const leftCarouselButton = document.createElement('button');
    leftCarouselButton.classList.add('carousel-button');
    leftCarouselButton.setAttribute('id', 'left-carousel-button');
    leftCarouselButton.addEventListener('click', (e) => toggleCarousel(e));

    const rightCarouselButton = document.createElement('button');
    rightCarouselButton.classList.add('carousel-button');
    rightCarouselButton.classList.add('carousel-button-right');
    rightCarouselButton.setAttribute('id', 'right-carousel-button');
    rightCarouselButton.addEventListener('click', (e) => toggleCarousel(e))

    const carouselText = document.createElement('p');
    carouselText.classList.add('carousel-text');
    carouselText.innerText = 'test';

    carouselButtonContainer.appendChild(leftCarouselButton);
    carouselButtonContainer.appendChild(carouselText);
    carouselButtonContainer.appendChild(rightCarouselButton);

    carousel.appendChild(mainImage);
    carousel.appendChild(carouselButtonContainer);
    carousel.appendChild(carouselOverlay);

    propertyContainer.appendChild(detailAddress);
    propertyContainer.appendChild(carousel);

    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.classList.add('thumbnail-container');

    for (let i = displayedImageIndex; i < targetProperty.imageURLs.length; i++) {
        if (mainImage > targetProperty.imageURLs.length) mainImage = 0;

        const thumbnailImageDiv = document.createElement('div');
        thumbnailImageDiv.classList.add('thumbnail-image-div');

        const thumbnailImage = document.createElement('img');
        thumbnailImage.classList.add('thumbnail-image');
        thumbnailImage.setAttribute('src', targetProperty.imageURLs[i]);
        thumbnailImage.setAttribute('alt', targetProperty.imageAlts[i]);

        thumbnailImageDiv.appendChild(thumbnailImage)
        thumbnailContainer.appendChild(thumbnailImageDiv);
    }

    propertyContainer.appendChild(thumbnailContainer);

    searchMain.appendChild(propertyContainer);
}

const toggleCarousel = (e) => {
    const mainImage = document.querySelector('carousel-image');
    const thumbnailContainer = document.querySelector('thumbnail-container')
    console.log(e.target);
    if (e.target.id = 'right-carousel-button') {
        const mainImage = document.createElement('img');
        mainImage.classList.add('carousel-image');
        mainImage.setAttribute('src', targetProperty.imageURLs[displayedImageIndex]);
        mainImage.setAttribute('alt', `${targetProperty.alt}`);
    }
}
