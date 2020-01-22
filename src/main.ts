import { app, BrowserWindow } from "electron";
import * as path from "path";


let mainWindow: Electron.BrowserWindow;


function createMainWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        width:  800
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
