// home icon to redirect to home window
homeIcon = document.querySelector('.home-icon');

homeIcon.addEventListener("click", e => {
    window.location.href = "home.html";
});

userPicture = document.querySelector('.user-picture');
userNavbar = document.getElementById('user-navbar');
userPicture.addEventListener("click", e => {
    if (userNavbar.style.display === 'none'){
        userNavbar.style.display = "block";
    } else {
        userNavbar.style.display = "none";
    }
});

document.getElementById('collapse-toggle').addEventListener('click', function () {
    const sidebar = document.querySelector('.sidebar');
    const isCollapsed = sidebar.getAttribute('data-collapsed') === 'true';

    sidebar.setAttribute('data-collapsed', !isCollapsed);
});

async function handleLogout() {
    try {
        await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include'
        });

        await window.electronAPI.clearStoredToken();
        window.location.href = "welcome.html" ; 
    } catch (err) {
        console.error('Logout error:', err)
    }
}


logOutBtn = document.getElementById('LogOut');
logOutBtn.addEventListener("click", e => {
    handleLogout();
})