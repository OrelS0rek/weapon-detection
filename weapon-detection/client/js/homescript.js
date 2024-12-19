const userPicture = document.querySelector('.user-picture');
const userNavbar = document.getElementById("user-navbar");




if (userPicture && userNavbar) {
    userPicture.addEventListener("click", () => {
        console.log('User picture clicked');
        if (userNavbar.style.display === "none" || userNavbar.style.display === "") {
            console.log('Showing navbar');
            userNavbar.style.display = "block"; // Show navbar
        } else {
            console.log('Hiding navbar');
            userNavbar.style.display = "none"; // Hide navbar
        }
    });
}

// In your logout function
async function handleLogout() {
    try {
        await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include' // Ensure cookies are included
        });
        // Clear the token from electron-store
        await window.electronAPI.clearStoredToken();
        console.log('Logged out, token cleared');
        // Redirect to welcome page or show login page
        window.location.href = 'welcome.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

document.getElementById('LogOut').addEventListener('click', e => {
    handleLogout();
});


document.getElementById('collapse-toggle').addEventListener('click', function () {
    const sidebar = document.querySelector('.sidebar');
    const isCollapsed = sidebar.getAttribute('data-collapsed') === 'true';

    // Toggle the `data-collapsed` attribute
    sidebar.setAttribute('data-collapsed', !isCollapsed);
});
