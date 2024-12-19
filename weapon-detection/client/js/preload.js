const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getStoredToken: () => ipcRenderer.invoke('get-stored-token'),
    setStoredToken: (token) => ipcRenderer.invoke('set-stored-token', token),
    clearStoredToken: () => ipcRenderer.invoke('clear-stored-token'),
    validateToken: () => ipcRenderer.invoke('validate-token'),
    getCurrentWindow: () => ipcRenderer.invoke('get-current-window'),
});
