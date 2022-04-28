const addthumbnailButton = document.getElementById("add-thumbnail-button");
const thumbnailAddContainer = document.querySelector(".thumbnailAddContainer");
const thumbnailDisplay = document.getElementById(
  "add-listing-thumbnail-display"
);
const addListingMainImageText = document.getElementById(
  "add-listing-main-image-text"
);
const addListingMainImageInput = document.getElementById(
  "add-listing-main-image-input"
);
const addListingMainImageURLInput = document.getElementById(
  "add-listing-main-image-url-input"
);
const createButton = document.getElementById("edit-form-submit");
const detailContainer = document.querySelector(".detail-container");
const overlay = document.querySelector(".overlay");

// Image update
addListingMainImageInput.addEventListener("keydown", (e) => {
  if (addListingMainImageText.innerHTML === "No Image Available")
    addListingMainImageText.innerHTML = "";
  addListingMainImageText.innerHTML += e.key;
  if (e.key === "Backspace") addListingMainImageText.innerHTML = "";
});

addListingMainImageURLInput.addEventListener("paste", () => setImage());
addListingMainImageURLInput.addEventListener("keydown", () => setImage());

const setImage = () => {
  const addListingMainImageURL = document.getElementById(
    "add-listing-main-image-url"
  );

  setTimeout(() => {
    testImage(
      addListingMainImageURLInput.value,
      (url, msg) => {
        console.log(url, msg);
        if (msg === "success") {
          addListingMainImageURL.style.backgroundImage = `url(${url})`;
        } else {
          addListingMainImageURL.style.backgroundImage = `url(../images/unavailable.jpeg)`;
        }
      },
      1000
    );
  });
};

const testImage = (url, callback, timeout) => {
  timeout = timeout || 5000;
  console.log(timeout);
  let timedOut = false;
  let timer;
  const img = new Image();
  img.onerror = img.onabort = function () {
    if (!timedOut) {
      clearTimeout(timer);
      callback(url, "error");
    }
  };
  img.onload = function () {
    if (!timedOut) {
      clearTimeout(timer);
      callback(url, "success");
    }
  };
  img.src = url;
  timer = setTimeout(function () {
    timedOut = true;
    // reset .src to invalid URL so it stops previous
    // loading, but doesn't trigger new load
    img.src = "../images/unavailable.jpeg";
    callback(url, "timeout");
  }, timeout);
};

// Add thumbnail
addthumbnailButton.addEventListener("click", (e) => {
  e.preventDefault();
  const thumbnailLength = Math.ceil(
    (thumbnailAddContainer.childNodes.length + 1) / 2
  );

  const newThumbnailImage = document.createElement("div");
  newThumbnailImage.classList.add("thumbnail-image");
  newThumbnailImage.classList.add("editThumbnail");
  newThumbnailImage.setAttribute(
    "style",
    "background-image: url('../images/unavailable.jpeg')"
  );

  const newThumbnailOverlay = document.createElement("div");
  newThumbnailOverlay.classList.add("thumbnailTextOverlay");

  const newThumbnailText = document.createElement("p");
  newThumbnailText.classList.add("thumbnail-text");
  newThumbnailText.innerHTML = "Image Description";

  newThumbnailOverlay.appendChild(newThumbnailText);
  newThumbnailImage.appendChild(newThumbnailOverlay);
  thumbnailDisplay.appendChild(newThumbnailImage);

  const urlInput = document.createElement("input");
  urlInput.classList.add("editInput");
  urlInput.classList.add("mediumInput");
  urlInput.setAttribute("type", "text");
  urlInput.setAttribute("placeholder", "../images/unavailable.jpeg");
  urlInput.setAttribute("name", `imageURLs`);
  urlInput.addEventListener("click", () => setImage());
  urlInput.addEventListener("paste", () => setImage());

  const urlLabel = document.createElement("label");
  urlLabel.classList.add("edit-label");
  urlLabel.setAttribute("for", `#${thumbnailLength}imageURL`);
  urlLabel.innerHTML = `#${thumbnailLength} Image URL:`;

  urlLabel.appendChild(urlInput);

  const textInput = document.createElement("input");
  textInput.classList.add("editInput");
  textInput.classList.add("mediumInput");
  textInput.setAttribute("type", "text");
  textInput.setAttribute("placeholder", "Image Description");
  textInput.setAttribute("name", `imageTextArray`);
  textInput.addEventListener("click", () => setImage());
  textInput.addEventListener("paste", () => setImage());

  const textLabel = document.createElement("label");
  textLabel.classList.add("edit-label");
  textLabel.setAttribute("for", `#${thumbnailLength}imageText`);
  textLabel.innerHTML = `#${thumbnailLength} Image Text:`;

  textLabel.appendChild(textInput);

  thumbnailAddContainer.appendChild(urlLabel);
  thumbnailAddContainer.appendChild(textLabel);
});

createButton.addEventListener("click", (e) => {
  e.preventDefault();

  const alert = document.createElement("div");
  alert.classList.add("alert");

  const alertTextEl = document.createElement("h2");
  alertTextEl.innerHTML =
    "I'm sorry. The demo admin cannot add listings to the database.";

  const closeButton = document.createElement("div");
  closeButton.classList.add("modal-close");
  closeButton.innerText = "X";
  closeButton.addEventListener("click", () => {
    detailContainer.removeChild(alert);
    overlay.classList.remove("overlay-visible");
  });

  alert.appendChild(closeButton);
  alert.appendChild(alertTextEl);

  overlay.classList.add("overlay-visible");
  detailContainer.appendChild(alert);
  alert.scrollIntoView();
});
