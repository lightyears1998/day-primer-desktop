// This script executes when BrowserWindow is created.

import { isUnderDevelopment } from "./util";


// Install Electron DevTool Devtron
if (isUnderDevelopment()) {
    require("devtron").install();
}
