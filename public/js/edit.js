const thumbnails = document.querySelectorAll('.thumbnail-image');
const thumbnailURLTitle = document.querySelector('.thumbnail-URL-title');
const thumbnailTextTitle = document.querySelector('.thumbnail-text-title');
const thumbnailURLInput = document.querySelector('#thumbnail-URL-input')
const thumbnailTextInput = document.querySelector('#thumbnail-text-input')

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', (e) => {
        selectThumbnail(e.target)
    });
})

const selectThumbnail = (e) => {
    const index = e.id
    const url = e.style.backgroundImage;
    const overlayText = e.childNodes[1].childNodes[1].innerText;

    thumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove('selected-thumbnail');
    });
    e.classList.add('selected-thumbnail');

    thumbnailURLTitle.innerHTML = `#${index} Image URL`
    thumbnailTextTitle.innerHTML = `#${index} Text Overlay`
}
