import electron from "electron";

// Make it works on both main process and render process.
const app = electron.app || electron.remote.app;


// Return true if application is under development.
export function isUnderDevelopment(): boolean {
    return process.env.APP_ENV ? process.env.APP_ENV === "development" : !app.isPackaged;
}
