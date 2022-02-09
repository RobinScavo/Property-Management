import { properties } from './dummyData.js';

const searchHeader = document.querySelector('.search-header');
const searchMain = document.querySelector('.search-main');

let targetProperty;
let activeSlideIndex = 0;

export const viewProperty = (target) => {
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

    const detailCity = document.createElement('p');
    detailCity.classList.add('detail-city');
    detailCity.innerText = `${targetProperty.city}`;

    propertyContainer.appendChild(detailAddress);
    propertyContainer.appendChild(detailCity);

    const carousel = buildCarousel(targetProperty);
    const thumbnails = buildThumbnails(targetProperty);
    const infoDiv = buildInfoDiv(targetProperty);

    propertyContainer.appendChild(carousel);
    propertyContainer.appendChild(thumbnails);
    propertyContainer.appendChild(infoDiv);

    searchMain.appendChild(propertyContainer);
}

const buildCarousel = (targetProperty) => {
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel-container');

    const carouselDiv = document.createElement('div');
    carouselDiv.classList.add('main-image-container');

    for (const [index, image] of targetProperty.imageURLs.entries()) {
        const mainImage = document.createElement('div');
        mainImage.classList.add('main-image');
        mainImage.setAttribute('style', `background-image: url('${image}')`);
        mainImage.setAttribute('alt', targetProperty.imageAlts[index]);

        carouselDiv.appendChild(mainImage);
    }

    const carouselOverlay = document.createElement('div');
    carouselOverlay.classList.add('carousel-overlay');

    const carouselButtonContainer = document.createElement('div');
    carouselButtonContainer.classList.add('carousel-button-container');

    const leftCarouselButton = document.createElement('button');
    leftCarouselButton.classList.add('carousel-button');
    leftCarouselButton.addEventListener('click', () => toggleCarousel('left'));

    const rightCarouselButton = document.createElement('button');
    rightCarouselButton.classList.add('carousel-button');
    rightCarouselButton.classList.add('carousel-button-right');
    rightCarouselButton.addEventListener('click', () => toggleCarousel('right'))

    const carouselText = document.createElement('p');
    carouselText.classList.add('carousel-text');
    carouselText.innerText = 'test';

    carouselButtonContainer.appendChild(leftCarouselButton);
    carouselButtonContainer.appendChild(carouselText);
    carouselButtonContainer.appendChild(rightCarouselButton);


    carouselContainer.appendChild(carouselButtonContainer);
    carouselContainer.appendChild(carouselDiv);
    carouselContainer.appendChild(carouselOverlay);

    return carouselContainer;
}

const buildThumbnails = (targetProperty) => {
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.classList.add('thumbnail-container');

    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.classList.add('thumbnail-div');

    for (const [index, image] of targetProperty.imageURLs.entries()) {
        if (index === 0) continue;
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail-image');
        thumbnail.setAttribute('style', `background-image: url('${image}')`);
        thumbnail.setAttribute('alt', targetProperty.imageAlts[index]);

        thumbnailDiv.appendChild(thumbnail);
        thumbnailContainer.appendChild(thumbnailDiv);
    }

    thumbnailContainer.appendChild(thumbnailDiv);

    return thumbnailContainer;
}

const buildInfoDiv = (targetProperty) => {
    const target = targetProperty.propertyInfo;
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');

    target.forEach((info) => {
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info-div');

        if (info.icon) {
            const infoIconDiv = document.createElement('div');
            infoIconDiv.classList.add('icon-container');
            if (info.icon === '../images/icons/pets-icon.png') {
                infoIconDiv.classList.add('info-icon-pets');
            }

            const icon = document.createElement('img');
            icon.classList.add('utilities-icon');
            icon.setAttribute('src', `${info.icon}`);

            infoIconDiv.appendChild(icon);
            infoDiv.appendChild(infoIconDiv);
        }

        const infoTitle = document.createElement('h3');
        infoTitle.classList.add('info-title');
        infoTitle.innerText = `${info.title}`;

        infoDiv.appendChild(infoTitle);

        info.infoArray.forEach((el) => {
            const infoElement = document.createElement('p');
            infoElement.classList.add('info-array-element')
            infoElement.innerText = `${el}`;

            infoDiv.appendChild(infoElement);
        });

        infoContainer.appendChild(infoDiv);
    });

    return infoContainer
}

const toggleCarousel = (direction) => {
    const carousel = document.querySelector('.carousel-container');
    const mainImage = document.querySelector('.main-image-container');
    const thumbnails = document.querySelector('.thumbnail-image');
    const thumbnailDiv = document.querySelector('.thumbnail-div');
    const slidesLength = mainImage.querySelectorAll('div').length;
    const overlay = document.querySelector('.carousel-overlay');
    const imageText = document.querySelector('.carousel-text');

    const sliderWidth = carousel.clientWidth;
    const thumbnailWidth = thumbnails.clientWidth;

    overlay.classList.add('hidden');
    imageText.classList.add('hidden');

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
}
