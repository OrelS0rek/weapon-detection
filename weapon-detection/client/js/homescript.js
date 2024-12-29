const userPicture = document.querySelector('.user-picture');
const userNavbar = document.getElementById("user-navbar");
const Profile = document.getElementById("Profile")

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


