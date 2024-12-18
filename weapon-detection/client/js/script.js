
// Login Popup


const loginPopup = document.querySelector('.login-popup');
const popupOverlay = document.querySelector('.popup-overlay');
const loginButton = document.querySelector('.btnLogin-popup');
const closePopup = document.querySelector('.close-popup');
const userPicture = document.querySelector('.user-picture');

// Show popup on button click
loginButton.addEventListener('click', () => {
    loginPopup.classList.add('active');
    popupOverlay.classList.add('active');
});

// Hide popup when clicking the close button
closePopup.addEventListener('click', () => {
    loginPopup.classList.remove('active');
    popupOverlay.classList.remove('active');
});

// Hide popup when clicking outside the popup
popupOverlay.addEventListener('click', () => {
    loginPopup.classList.remove('active');
    popupOverlay.classList.remove('active');
});



const registrationPopup = document.querySelector('.registration-popup');
const registrationPopupOverlay = document.querySelector('.reg-popup-overlay');
const regButton = document.querySelector('.signup-link');
const closeRegPopup = document.querySelector('.close-registration-popup')

regButton.addEventListener('click', () => {
    registrationPopup.classList.add('active');
    registrationPopupOverlay.classList.add('active');
});

// Hide popup when clicking the close button
closeRegPopup.addEventListener('click', () => {
    registrationPopup.classList.remove('active');
    registrationPopupOverlay.classList.remove('active');
});

// Hide popup when clicking outside the popup
registrationPopupOverlay.addEventListener('click', () => {
    registrationPopup.classList.remove('active');
    registrationPopupOverlay.classList.remove('active');
});

// Function to register a user
async function registerUser(username, email, password) {
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.text();
    alert(data);
}

// Function to login a user
// Function to login a user
async function loginUser(username, password) {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Match server keys
    });

    const data = await response.text();
    if (response.ok) {
        alert('Login successful');
        // Replace the Login Button with the user picture
        loginButton.style.display = 'none';
        userPicture.style.display = 'block';
    } else {
        alert(data);
    }
}


// Add event listeners for form submissions
document.getElementById('registration-form').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confpswrd = document.getElementById('regConfirmPassword').value;
    
    if (confpswrd != password){
        document.getElementById('passwords-equal').style.display = "block";
    }
    else {
        document.getElementById('passwords-equal').style.display = "none";
        registrationPopup.classList.remove('active');
        registrationPopupOverlay.classList.remove('active');
        registerUser(username, email, password);
    }

});

document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const logusername = document.getElementById('loginUsername').value;
    const logpassword = document.getElementById('loginPassword').value;
    loginPopup.classList.remove('active');
    popupOverlay.classList.remove('active');
    loginUser(logusername, logpassword);

});