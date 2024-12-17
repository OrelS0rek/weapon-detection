
// Login Popup


const loginPopup = document.querySelector('.login-popup');
const popupOverlay = document.querySelector('.popup-overlay');
const loginButton = document.querySelector('.btnLogin-popup');
const closePopup = document.querySelector('.close-popup');

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
async function loginUser(username, password) {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert('Login successful');
        console.log('Token:', data.token);
        //replacing the Login Button with the user picture
        document.querySelector('btnLogin-popup').style.display = 'none';
        document.getElementById('user-picture').style.display = 'block';

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
    
    registrationPopup.classList.remove('active');
    registrationPopupOverlay.classList.remove('active');
    registerUser(username, email, password);
});

document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const logusername = document.getElementById('loginUsername').value;
    const logpassword = document.getElementById('loginPassword').value;
    loginPopup.classList.remove('active');
    popupOverlay.classList.remove('active');
    loginUser(logusername, logpassword);

});


