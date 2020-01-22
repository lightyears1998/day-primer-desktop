import * as path from "path";
import * as chokidar from "chokidar";
import { app, BrowserWindow } from "electron";
import { isUnderDevelopment } from "./util";


let mainWindow: Electron.BrowserWindow;


// When it is under development,
// relaunch the application if any file has changed.
function setupRelaunchWhenFileChanged(): void {
    const watchOpts: chokidar.WatchOptions = {
        persistent: true,
        ignored:    ["node_modules", ".git"]
    };

    // If main.ts changes, relaunch the application.
    chokidar.watch(path.join(__dirname, "../dist/main.js"), watchOpts).on("change", () => {
        app.relaunch();
        app.exit(0);
    });

    // If some file (excluding main.ts) in `src` folder changes, reload the `mainWindow`.
    watchOpts.ignored.push("main.js");
    chokidar.watch(path.join(__dirname, "../dist/"), watchOpts).on("change", () => {
        mainWindow.reload();
    });
}


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

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    if (isUnderDevelopment()) {
        mainWindow.webContents.openDevTools();
    }
}


// When ready create new window.
app.on("ready", () => {
    if (isUnderDevelopment()) {
        setupRelaunchWhenFileChanged();
    }
    createMainWindow();
});


// Quit when all windows are closed.
app.on("window-all-closed", () => {
    app.quit();
});
