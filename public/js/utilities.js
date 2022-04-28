const resultsContainer = document.querySelector(".results-container");
const adminLogin = document.getElementById("admin-login-button");
const header = document.querySelector(".header");
const body = document.querySelector("body");

// CALL BUTTON
const callButtons = document.querySelectorAll(".call-button");

const isMobile = window.matchMedia("only screen and (max-width:600px)").matches;

callButtons.forEach((callButton) => {
  callButton.addEventListener("click", () => {
    if (isMobile) {
      window.open("tel:4065551212");
    } else {
      callButton.innerHTML = "406-555-1212";
    }
  });
});

// ADMIN LOGIN
adminLogin.addEventListener("click", () => {
  const overlay = document.createElement("div");
  overlay.classList.add("full-overlay");
  overlay.classList.add("overlay-visible");

  const headerOverlay = document.createElement("div");
  headerOverlay.classList.add("full-overlay");
  headerOverlay.classList.add("overlay-visible");

  const loginModal = document.createElement("div");
  loginModal.classList.add("login-modal");

  const loginTitle = document.createElement("h1");
  loginTitle.classList.add("modal-name");
  loginTitle.innerHTML = "Administrator Login";

  const userLabel = document.createElement("label");
  userLabel.classList.add("login-label");
  userLabel.innerHTML = "Admin Name";

  const userInput = document.createElement("input");
  userInput.classList.add("login-input");
  userInput.classList.add("login-input-name");
  userInput.setAttribute("type", "text");

  const passwordLabel = document.createElement("label");
  passwordLabel.classList.add("login-label");
  passwordLabel.innerHTML = "Admin Password";

  const passwordInput = document.createElement("input");
  passwordInput.classList.add("login-input");
  passwordInput.classList.add("login-input-password");
  passwordInput.setAttribute("type", "password");

  const loginButton = document.createElement("button");
  loginButton.classList.add("btn");
  loginButton.classList.add("login-btn");
  loginButton.innerHTML = "Log In";
  loginButton.addEventListener("click", () => {
    console.log("login");
  });

  const closeButton = document.createElement("div");
  closeButton.classList.add("modal-close");
  closeButton.innerText = "X";
  closeButton.addEventListener("click", () => {
    body.removeChild(overlay);
    header.removeChild(headerOverlay);
    header.removeChild(loginModal);
  });

  const demoLoginButton = document.createElement("button");
  demoLoginButton.classList.add("btn");
  demoLoginButton.classList.add("demo-btn");
  demoLoginButton.innerHTML = "Demo Log In";
  demoLoginButton.addEventListener("click", () => {
    const loginName = document.querySelector(".login-input-name");
    loginName.value = "Demo Admin";
    const loginPassword = document.querySelector(".login-input-password");
    loginPassword.value = "password";
    setTimeout(() => {
      window.location.href = "/admin";
    }, 1500);
  });

  loginModal.appendChild(loginTitle);
  loginModal.appendChild(userLabel);
  loginModal.appendChild(userInput);
  loginModal.appendChild(passwordLabel);
  loginModal.appendChild(passwordInput);
  loginModal.appendChild(loginButton);
  loginModal.appendChild(closeButton);
  loginModal.appendChild(demoLoginButton);

  body.appendChild(overlay);
  header.appendChild(headerOverlay);
  header.appendChild(loginModal);
});
