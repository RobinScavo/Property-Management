const updateButton = document.getElementById("update-listing-button");
const thumbnailDiv = document.querySelector(".thumbnail-div");
const overlay = document.querySelector(".overlay");

updateButton.addEventListener("click", (e) => {
  e.preventDefault();

  const alert = document.createElement("div");
  alert.classList.add("alert");

  const alertTextEl = document.createElement("h2");
  alertTextEl.innerHTML =
    "I'm sorry. The demo admin cannot update listings from the database.";

  const closeButton = document.createElement("div");
  closeButton.classList.add("modal-close");
  closeButton.innerText = "X";
  closeButton.addEventListener("click", () => {
    thumbnailDiv.removeChild(alert);
  });

  alert.appendChild(closeButton);
  alert.appendChild(alertTextEl);

  thumbnailDiv.appendChild(alert);
  alert.scrollIntoView();
});
