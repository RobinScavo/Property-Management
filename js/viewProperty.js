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

    // const carousel = document.createElement('div');
    // carousel.classList.add('carousel');

    // buildCarousel(targetProperty)

    // const mainImage = document.createElement('img');
    // mainImage.classList.add('carousel-image');
    // mainImage.setAttribute('src', targetProperty.mainImageURL);
    // mainImage.setAttribute('alt', `${targetProperty.alt}`);


    // const carouselButtonContainer = document.createElement('div');
    // carouselButtonContainer.classList.add('carousel-button-container');

    // const leftCarouselButton = document.createElement('button');
    // leftCarouselButton.classList.add('carousel-button');
    // leftCarouselButton.setAttribute('id', 'left-carousel-button');
    // leftCarouselButton.addEventListener('click', (e) => toggleCarousel(e));

    // const rightCarouselButton = document.createElement('button');
    // rightCarouselButton.classList.add('carousel-button');
    // rightCarouselButton.classList.add('carousel-button-right');
    // rightCarouselButton.setAttribute('id', 'right-carousel-button');
    // rightCarouselButton.addEventListener('click', (e) => toggleCarousel(e))

    // const carouselText = document.createElement('p');
    // carouselText.classList.add('carousel-text');
    // carouselText.innerText = 'test';

    // carouselButtonContainer.appendChild(leftCarouselButton);
    // carouselButtonContainer.appendChild(carouselText);
    // carouselButtonContainer.appendChild(rightCarouselButton);

    // carousel.appendChild(mainImage);
    // carousel.appendChild(carouselButtonContainer);
    // carousel.appendChild(carouselOverlay);

    // propertyContainer.appendChild(carousel);

    // const thumbnailContainer = document.createElement('div');
    // thumbnailContainer.classList.add('thumbnail-container');

    // for (let i = displayedImageIndex; i < targetProperty.imageURLs.length; i++) {
    //     if (mainImage > targetProperty.imageURLs.length) mainImage = 0;

    //     const thumbnailImageDiv = document.createElement('div');
    //     thumbnailImageDiv.classList.add('thumbnail-image-div');

    //     const thumbnailImage = document.createElement('img');
    //     thumbnailImage.classList.add('thumbnail-image');
    //     thumbnailImage.setAttribute('src', targetProperty.imageURLs[i]);
    //     thumbnailImage.setAttribute('alt', targetProperty.imageAlts[i]);

    //     thumbnailImageDiv.appendChild(thumbnailImage)
    //     thumbnailContainer.appendChild(thumbnailImageDiv);
    // }

    const infoDiv = buildInfoDiv(targetProperty);

    // propertyContainer.appendChild(thumbnailContainer);
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
    const thumbnails = document.querySelector('.thumbnail-container')
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
    thumbnailDiv.style.transform = `translateX(-${activeSlideIndex * thumbnailWidth}px)`;
}
