import * as path from "path";
import { app, BrowserWindow } from "electron";


let mainWindow: Electron.BrowserWindow;


function createMainWindow(): void {
    mainWindow = new BrowserWindow({
        height:         600,
        webPreferences: {
            nodeIntegration: true,
            preload:         path.join(__dirname, "../dist/preload.js")
        },
        width: 800
    });

    mainWindow.loadFile(path.join(__dirname, "../view/index.html"));

    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}


// When ready create new window.
app.on("ready", createMainWindow);


// Quit when all windows are closed.
app.on("window-all-closed", () => {
    app.quit();
});
