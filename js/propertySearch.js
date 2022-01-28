import { properties } from './dummyData.js';

const searchButton = document.querySelector('.filter-button');
const resultsContainer = document.querySelector('.results-container');

let currentIndex = 0;
let currentPage = 1;
console.log('running')
const numberOfPages = Math.ceil(properties.length/5);

searchButton.addEventListener('click', () => {
    //filter results
});

const nextPageButton = () => {
    const nextPageContainer = document.createElement('div');
    nextPageContainer.classList.add('next-page-container');

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.classList.add('next-button');
        prevButton.innerText = 'Prev';
        prevButton.addEventListener('click', () => {
            currentIndex -= 5;
            currentPage--;
            displayProperties(currentIndex);
        });

        nextPageContainer.appendChild(prevButton);
    }

    const currentPageDisplay = document.createElement('h3');
    currentPageDisplay.classList.add('current-page');
    currentPageDisplay.innerText = `Page ${currentPage} of ${numberOfPages}`;
    nextPageContainer.appendChild(currentPageDisplay);

    if (currentPage < numberOfPages) {
        const nextButton = document.createElement('button');
        nextButton.classList.add('next-button');
        nextButton.innerText = 'Next';
        nextButton.addEventListener('click', () => {
            currentIndex += 5;
            currentPage++;
            displayProperties(currentIndex);
        });

        nextPageContainer.appendChild(nextButton);
    }

    resultsContainer.appendChild(nextPageContainer);
}

const displayProperties = (index) => {
    const increment = (currentPage !== numberOfPages) ? 5 : (properties.length % 5);
    console.log('Increment', increment);
    console.log('Index', currentIndex, 'Page', currentPage)

    nextPageButton();

    for (let i = index; i < index + increment; i++) {
        const property = properties[i];
        const propertyContainer = document.createElement('div');
        propertyContainer.classList.add('property-container');

        //Image

        const propertyImage = document.createElement('img');
        propertyImage.classList.add('property-image');
        propertyImage.setAttribute('src', property.mainImageURL);
        propertyImage.setAttribute('height', '300px');
        propertyImage.setAttribute('width', '300px');

        const propertyImageDiv = document.createElement('div');
        propertyImageDiv.classList.add('property-image-div');

        propertyImageDiv.appendChild(propertyImage);

        // First Text Div

        const firstPropertyText = document.createElement('div');
        firstPropertyText.classList.add('first-property-text');

        const bedrooms = document.createElement('p');
        bedrooms.classList.add('property-text');
        let grammarNazi = (property.name > 1) ? 's' : '';
        bedrooms.innerHTML = `${property.beds} Bedroom${grammarNazi}`;

        const baths = document.createElement('p');
        baths.classList.add('property-text');
        grammarNazi = (property.bath > 1) ? 's' : '';
        baths.innerHTML = `${property.bath} Bath${grammarNazi}`;

        const address = document.createElement('p');
        address.classList.add('property-text');
        address.innerHTML = `${property.address}`;

        firstPropertyText.appendChild(bedrooms);
        firstPropertyText.appendChild(baths);
        firstPropertyText.appendChild(address);

        // Seecond Test Div

        const secondPropertyText = document.createElement('div');
        secondPropertyText.classList.add('second-property-text');

        const rent = document.createElement('h2');
        rent.classList.add('property-text-big');
        rent.innerText = `$${property.rent}/Month`;

        const available = document.createElement('p');
        available.classList.add('property-text');
        const today = new Date();
        const now = (new Date(property.availability) <= today);
        const availableText = (now) ? 'NOW!' : `approximately ${property.availability.slice(5)}`
        available.innerText = `Available ${availableText}`;

        const moreInfo = document.createElement('button');
        moreInfo.classList.add('btn');
        moreInfo.classList.add('more-info');
        moreInfo.innerText = 'More Info >>';

        secondPropertyText.appendChild(rent);
        secondPropertyText.appendChild(available);
        secondPropertyText.appendChild(moreInfo);

        propertyContainer.appendChild(propertyImageDiv);
        propertyContainer.appendChild(firstPropertyText);
        propertyContainer.appendChild(secondPropertyText);
        resultsContainer.appendChild(propertyContainer);
    };
}

displayProperties(currentIndex);
