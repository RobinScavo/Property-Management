const forwardButton = document.getElementById("right-carousel-button");
const backButton = document.getElementById("left-carousel-button");
const thumbnails = document.querySelectorAll(".thumbnail-image");
const thumbnail = document.querySelector(".thumbnail-image");
const carousel = document.querySelector(".carousel-container");
const mainImage = document.querySelector(".main-image-container");
const thumbnailDiv = document.querySelector(".thumbnail-div");
const slidesLength = mainImage.querySelectorAll("div").length;
const overlay = document.querySelector(".carousel-overlay");
const imageText = document.querySelector(".carousel-text");
const imageURLs = document.querySelector(".image-urls").innerHTML.split(",");
const imageTextArray = document
  .querySelector(".image-text-array")
  .innerHTML.split(",");

let targetProperty;
let activeSlideIndex = 0;
let runSlideShow;
let manuallyToggling = false;

backButton.addEventListener("click", () => {
  manuallyToggling = true;
  clearTimeout(runSlideShow);
  toggleCarousel("left", activeSlideIndex);
});

forwardButton.addEventListener("click", () => {
  manuallyToggling = true;
  clearTimeout(runSlideShow);
  toggleCarousel("right", activeSlideIndex);
});

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    manuallyToggling = true;
    toggleCarousel(null, index + 1);
  });
});

const toggleCarousel = (direction, index) => {
  const sliderWidth = carousel.clientWidth;

  activeSlideIndex = index;

  overlay.classList.remove("carousel-visible");
  imageText.classList.remove("carousel-text-visible");
  overlay.classList.add("carousel-hidden");
  imageText.classList.add("carousel-text-hidden");

  if (direction === "right") {
    activeSlideIndex++;
    if (activeSlideIndex > slidesLength - 1) {
      activeSlideIndex = 0;
    }
  } else if (direction === "left") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesLength - 1;
    }
  }
  mainImage.style.transform = `translateX(-${
    activeSlideIndex * sliderWidth
  }px)`;
  if (thumbnails.length > 0) {
    const thumbnailWidth = thumbnail.clientWidth;
    thumbnailDiv.style.transform = `translateX(-${
      activeSlideIndex * (thumbnailWidth + 30)
    }px)`;
  }

  if (!manuallyToggling) {
    setTimeout(function () {
      slideShow(activeSlideIndex);
    }, 1500);
  }
};

const slideShow = (index) => {
  imageText.innerText = imageTextArray[index];

  overlay.classList.add("carousel-visible");
  overlay.classList.remove("carousel-hidden");
  imageText.classList.add("carousel-text-visible");
  imageText.classList.remove("carousel-text-hidden");

  runSlideShow = setTimeout(() => toggleCarousel("right", index), 3500);
};

if (slidesLength) {
  setTimeout(() => slideShow(activeSlideIndex), 1000);
}
