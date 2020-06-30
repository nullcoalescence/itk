/*
* Handles click methods throughout the app's html
*/

// Constants
var appVersion = "1.0";

// On window load
window.onload = function() {

    // If we have any of the following fields, fill them in
    if (document.getElementById("app-version")) {
        document.getElementById("app-version").innerHTML = appVersion;
    }

}

// Electron stuff
const { ipcRenderer } = require("electron");
const { BrowserWindow } = require("electron").remote;
const { exec } = require("child_process");

// Open's a dialog
function openWin(htmlPath, winWidth, winHeight) {

    document.getElementById("log").innerHTML = "Generating " + htmlPath + "... <img height='20px' width='20px' src='img/loading.gif'>"; // this is good ux

    let childWin = new BrowserWindow({
        width: winWidth,
        height: winHeight,
        resizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    //childWin.webContents.openDevTools(); // @dev

    childWin.loadFile(htmlPath);

    childWin.on("ready-to-show", () => {
        childWin.show();
        document.getElementById("log").innerHTML = ""; // Reset log
    });

}
                               
// Runs a shell command and returns the output as a string, also supports error handling    
function runShell(commandStr) {
    console.log("attempting to send synchronous message to main thread...");
    return ipcRenderer.sendSync("run-shell-command", { command: commandStr });
}