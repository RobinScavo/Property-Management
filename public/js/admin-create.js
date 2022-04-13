const addthumbnailButton = document.getElementById('add-thumbnail-button');
const thumbnailAddContainer = document.querySelector('.thumbnailAddContainer');
const addListingMainImageText = document.getElementById('add-listing-main-image-text');
const addListingMainImageInput = document.getElementById('add-listing-main-image-input');
const addListingMainImageURLInput = document.getElementById('add-listing-main-image-url-input');

addListingMainImageInput.addEventListener('keydown', (e) => {
    if (addListingMainImageText.innerHTML === 'No Image Available') addListingMainImageText.innerHTML = '';
    addListingMainImageText.innerHTML += e.key;
});

addListingMainImageURLInput.addEventListener('paste', (url, msg) => {
    const addListingMainImageURL = document.getElementById('add-listing-main-image-url');
    testImage(addListingMainImageURLInput.value, () => {
        console.log(addListingMainImageURLInput.value)
        if (msg === 'success') {
            addListingMainImageURL.style.backgroundImage = `url(${url})`;
        } else {
            addListingMainImageURL.style.backgroundImage = `url(../images/unavailable.jpeg)`
        }
    })
});

addListingMainImageURLInput.addEventListener('keydown', () => {
    const addListingMainImageURL = document.getElementById('add-listing-main-image-url');
    testImage(addListingMainImageURLInput.value, (url, msg) => {
        console.log(addListingMainImageURLInput.value)
        console.log(msg)
        if (msg === 'success') {
            addListingMainImageURL.style.backgroundImage = `url(${url})`;
        } else {
            addListingMainImageURL.style.backgroundImage = `url(../images/unavailable.jpeg)`
        }
    })
});

const testImage = (url, callback, timeout) => {
    timeout = timeout || 5000;
    const timedOut = false
    let timer;
    const img = new Image();
    img.onerror = img.onabort = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "error");
        }
    };
    img.onload = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "success");
        }
    };
    img.src = url;
    timer = setTimeout(function() {
        timedOut = true;
        // reset .src to invalid URL so it stops previous
        // loading, but doesn't trigger new load
        img.src = "../images/unavailable.jpeg";
        callback(url, "timeout");
    }, timeout);
}

addthumbnailButton.addEventListener('click', (e) => {
    e.preventDefault();
    const thumbnailLength = Math.ceil((thumbnailAddContainer.childNodes.length+1)/2)

    const urlInput = document.createElement('input');
    urlInput.classList.add('editInput');
    urlInput.classList.add('mediumInput');
    urlInput.setAttribute('type', 'text');
    urlInput.setAttribute('placeholder', '../images/property-images/bathroom.jpg');
    urlInput.setAttribute('name', `imageURLs`);

    const urlLabel = document.createElement('label');
    urlLabel.classList.add('edit-label');
    urlLabel.setAttribute('for', `#${thumbnailLength}imageURL`);
    urlLabel.innerHTML = `#${thumbnailLength} Image URL:`;

    urlLabel.appendChild(urlInput);

    const textInput = document.createElement('input');
    textInput.classList.add('editInput');
    textInput.classList.add('mediumInput');
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('placeholder', 'Full Bathroom');
    textInput.setAttribute('name', `imageTextArray`);

    const textLabel = document.createElement('label');
    textLabel.classList.add('edit-label');
    textLabel.setAttribute('for', `#${thumbnailLength}imageText`);
    textLabel.innerHTML = `#${thumbnailLength} Image Text:`;

    textLabel.appendChild(textInput);

    thumbnailAddContainer.appendChild(urlLabel);
    thumbnailAddContainer.appendChild(textLabel);
})
