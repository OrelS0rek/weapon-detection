
// Login Popup
const loginPopup = document.querySelector('.login-popup');
const popupOverlay = document.querySelector('.popup-overlay');
const loginButton = document.querySelector('.btnLogin-popup');
const closePopup = document.querySelector('.close-popup');
const userPicture = document.querySelector('.user-picture');
const startdetect = document.querySelector('.start-detecting-btn')
const userNavbar = document.getElementById("user-navbar");

// Show popup on button click
loginButton.addEventListener('click', () => {
    loginPopup.classList.add('active');
    popupOverlay.classList.add('active');
});

startdetect.addEventListener('click', () => {
    loginPopup.classList.add('active')
    popupOverlay.classList.add('active')
} )
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

async function handleLogin(username, password) {
    try {
        // Send login request to the server
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            const token = data.token;
            console.log('Token received:', token);
            await window.electronAPI.setStoredToken(token);  // Store token locally
            alert('Login successful, token stored');
            window.location.href = '../client/home.html';
        } else {
            alert('Login failed: ' + data.message);  // Display error message
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed');
    }
}


async function loginUser(username, password) {    
    handleLogin(username, password);  // Call the new function
}



// In your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', async () => {
    const isValid = await window.electronAPI.validateToken();
    if (isValid) {
        window.location.href = '../home.html';  // Updated path
    }
});
// Add event listeners for form submissions
document.getElementById('registration-form').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confpswrd = document.getElementById('regConfirmPassword').value;
    
    if (confpswrd != password){
        document.getElementById('passwords-equal').style.display = "block";
        document.getElementById('regPassword').style.borderColor = 'red';
        document.getElementById('regConfirmPassword').style.borderColor = 'red';
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

