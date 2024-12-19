const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Import electron-store dynamically
let Store;
(async () => {
    const storeModule = await import('electron-store');
    Store = storeModule.default;
})();

let store;
let mainWindow;

async function createWindow() {
    // Initialize store after dynamic import
    if (!store && Store) {
        store = new Store();
    }

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'client/js/preload.js'),
        }
    });

    // Check for stored token and validate it
    const token = store ? store.get('authToken') : null;
    if (token) {
        validateStoredToken(token)
            .then(isValid => {
                if (isValid) {
                    // If token is valid, load the home page
                    mainWindow.loadFile(path.join(__dirname, 'client/home.html'));
                } else {
                    // If token is invalid, load the welcome page
                    mainWindow.loadFile(path.join(__dirname, 'client/welcome.html'));
                }
            })
            .catch(() => {
                // If token validation fails, load the welcome page
                mainWindow.loadFile(path.join(__dirname, 'client/welcome.html'));
            });
    } else {
        // If no token, load the welcome page
        mainWindow.loadFile(path.join(__dirname, 'client/welcome.html'));
    }
}

// Validate stored token
async function validateStoredToken(token) {
    try {
        const response = await fetch('http://localhost:3000/auth/validate-token', {
            headers: {
                'Cookie': `token=${token}`
            }
        });
        const data = await response.json();
        return data.valid;
    } catch (error) {
        console.error('Token validation error:', error);
        return false;
    }
}

// IPC handlers to interact with electron-store
ipcMain.handle('get-stored-token', () => {
    return store ? store.get('authToken') : null;
});

ipcMain.handle('set-stored-token', (event, token) => {
    if (store) {
        store.set('authToken', token);  // Store the token
        console.log('Token stored in electron-store:', token);
    }
});

ipcMain.handle('clear-stored-token', () => {
    if (store) {
        store.delete('authToken');  // Clear the stored token
    }
});

ipcMain.handle('validate-token', async () => {
    const token = store ? store.get('authToken') : null;
    if (!token) return false;
    return await validateStoredToken(token);
});

ipcMain.handle('get-current-window', () => {
    return mainWindow;
});

// Wait for both app ready and Store import
Promise.all([app.whenReady(), (async () => {
    const storeModule = await import('electron-store');
    Store = storeModule.default;
    store = new Store();
})()]).then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
