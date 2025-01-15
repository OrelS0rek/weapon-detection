const userPicture = document.querySelector('.user-picture');
const userNavbar = document.getElementById("user-navbar");
const Profile = document.getElementById("Profile");
const CnctpopupOverlay = document.querySelector('.cnct-popup-overlay');
const CnctPopup = document.querySelector('.cnct-popup');
const closeCnctPopup = document.querySelector('.cnct-close-popup');
const addCameraBtn = document.querySelector('.add-camera-btn');
const connectionForm = document.getElementById('connection-form')
const rtspRadio = document.getElementById("RTSP-URL");
const localCameraRadio = document.getElementById("local-camera");
const rtspTextInput = document.getElementById("RTSP-text");


if (userPicture && userNavbar) {
    userPicture.addEventListener("click", () => {
        console.log('User picture clicked');
        if (userNavbar.style.display === "none" || userNavbar.style.display === "") {
            userNavbar.style.display = "block"; // Show navbar
        } else {
            userNavbar.style.display = "none"; // Hide navbar
        }
    });
}

async function handleLogout() {
    try {
        await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include' 
        });
        // Clear the token from electron-store
        await window.electronAPI.clearStoredToken();
        console.log('Logged out, token cleared');
        // Redirect to welcome page
        window.location.href = 'welcome.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

async function handleProfile() {
    window.location.href = 'profile.html';
}

Profile.addEventListener('click', e => {
    handleProfile();
});


document.getElementById('LogOut').addEventListener('click', e => {
    handleLogout();
});


document.getElementById('collapse-toggle').addEventListener('click', function () {
    const sidebar = document.querySelector('.sidebar');
    const isCollapsed = sidebar.getAttribute('data-collapsed') === 'true';

    sidebar.setAttribute('data-collapsed', !isCollapsed);
});

addCameraBtn.addEventListener('click', () => {
    CnctPopup.classList.add('active');
    CnctpopupOverlay.classList.add('active');
});

closeCnctPopup.addEventListener('click', () => {
    CnctPopup.classList.remove('active');
    CnctpopupOverlay.classList.remove('active');
});

// Hide popup when clicking outside the popup
CnctpopupOverlay.addEventListener('click', () => {
    CnctPopup.classList.remove('active');
    CnctpopupOverlay.classList.remove('active');
});

rtspRadio.addEventListener("click", () => {
    rtspTextInput.style.display = "block";
    rtspTextInput.setAttribute("required", "") 
});

localCameraRadio.addEventListener("click", () => {
    rtspTextInput.style.display = "none"; 
});


document.addEventListener("DOMContentLoaded", () => {
    const connectionForm = document.getElementById('connection-form');

    connectionForm.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const cameraName = formData.get('camera-name');
        const cameraLocation = formData.get('camera-location');
        const cameraType = formData.get('camera');
        const rtspURL = formData.get('camera-url');
        CnctPopup.classList.remove('active');
        CnctpopupOverlay.classList.remove('active');
        if (cameraType === "connect to local camera") {
            try {
                var video = document.createElement("video");
                video.setAttribute('autoplay', '');
                video.setAttribute('controls', '');
                video.setAttribute('class', 'camera-feed')
                document.getElementById('video-container').appendChild(video);

                var camName = document.createElement("p");
                camName.setAttribute('class','video-text')
                var camLoc = document.createElement("p");
                camLoc.setAttribute('class','video-text')
                document.getElementById('video-container').appendChild(camLoc);
                document.getElementById('video-container').appendChild(camName);

                camLoc.srcObject = cameraLocation;
                camName.srcObject = cameraName;

                navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: true
                })
                .then(stream => {
                    video.srcObject = stream;
                })
                .catch(err => {
                    console.error("Unable to connect to local camera:", err);
                });
            } catch (err) {
                console.error("Error initializing video element:", err);
            }
        } else if (cameraType === "connect to remote camera with RTSP url" && rtspURL) {
            console.log('Connecting to remote camera with RTSP URL:', rtspURL);
        }
    });
});
