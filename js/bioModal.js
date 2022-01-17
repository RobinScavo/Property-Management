const leapold = document.querySelector('.leapold');
const robin = document.querySelector('.samuii');
const modal = document.querySelector('.bio-modal');
// const body = document.querySelector('body');
const overlay = document.querySelector('.full-overlay');

const targets = [
    {name: 'Leapold Lionheart', titles: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero culpa, voluptates cupiditate aliquam corporis vitae nam. Iure sit minus cupiditate, corrupti accusantium, maiores eius quas cum hic dicta exercitationem asperiores.', bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione culpa qui pariatur ab nam excepturi nobis voluptatem, numquam quae animi, vero similique alias facere quidem possimus quis. Vero, totam aspernatur!'},
    {name: 'Robin Scavo', titles: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero culpa, voluptates cupiditate aliquam corporis vitae nam. Iure sit minus cupiditate, corrupti accusantium, maiores eius quas cum hic dicta exercitationem asperiores.', bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione culpa qui pariatur ab nam excepturi nobis voluptatem, numquam quae animi, vero similique alias facere quidem possimus quis. Vero, totam aspernatur!'}
]

const showModal = (target) => {
    overlay.classList.add('overlay-visible');
    modal.classList.add('visible');

    const closeButton = document.createElement('div');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'X';
    closeButton.addEventListener('click', () => {
        modal.innerHTML = '';
        modal.classList.remove('visible');
        overlay.classList.remove('overlay-visible');
    });

    const modalName = document.createElement('div');
    modalName.classList.add('modal-name');
    modalName.innerText = target.name;

    const modalTitles = document.createElement('p');
    modalTitles.classList.add('modal-text');
    modalTitles.innerText = target.titles;

    const modalBio = document.createElement('p');
    modalBio.classList.add('modal-text');
    modalBio.innerText = target.bio;

    modal.appendChild(closeButton);
    modal.appendChild(modalName);
    modal.appendChild(modalTitles);
    modal.appendChild(modalBio);
}

leapold.addEventListener('click', () => {
    showModal(targets[0])
});

robin.addEventListener('click', () => {
    showModal(targets[1])
})
