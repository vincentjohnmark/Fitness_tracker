// Loading Animation Removal
window.onload = function () {
    document.getElementById('loader').style.display = 'none';
};

// Smooth Scroll to Features Section and Section Visibility
function scrollToSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Modal Controls
const showLoginBtn = document.querySelector(".login-btn"); // Login button in the header
const showSignupBtn = document.querySelector("#signup-bar .cta-btn"); // Signup button in the "Ready to transform?" section
const hidePopupBtns = document.querySelectorAll(".form-box .close-btn");
const signupLink = document.getElementById("signup-link");
const loginLink = document.getElementById("login-link");
const loginForm = document.querySelector(".form-box.login");
const signupForm = document.querySelector(".form-box.signup");
const formPopup = document.querySelector(".form-popup");

// Show the login popup when the Login button is clicked
showLoginBtn.addEventListener("click", () => {
    document.body.classList.add("show-popup");
    formPopup.style.display = 'flex';
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
});

// Show the signup popup when the Signup button in the "Ready to transform?" section is clicked
showSignupBtn.addEventListener("click", () => {
    document.body.classList.add("show-popup");
    formPopup.style.display = 'flex';
    signupForm.style.display = 'flex';
    loginForm.style.display = 'none';
});

// Hide both popups when the close button is clicked
hidePopupBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.classList.remove("show-popup");
        formPopup.style.display = 'none';
    });
});

// Switch to signup form when "Don't have an account?" is clicked in the login form
signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'flex';
});

// Switch to login form when "Already have an account?" is clicked in the signup form
loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'flex';
});

const scriptURL = 'AKfycby1YEbqm6oMQLuOrmiUU23gEo-MOgF1uOWVohSOAhAxoKSUubn0Jt_T5hRLtPQUNdb76Q'; // Replace with your Google Apps Script web app URL

// Submit signup data
