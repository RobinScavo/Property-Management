const addthumbnailButton = document.getElementById('add-thumbnail-button');
const thumbnailAddContainer = document.querySelector('.thumbnailAddContainer');

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
