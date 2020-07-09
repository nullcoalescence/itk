/*
* Handles click methods throughout the app's html
*/

// DOM references
var inputContainer;

// Constants
var appVersion = "1.0";

// On window load
window.onload = function() {

    // Assign DOM variables
    inputContainer = document.getElementById("input-container");

    // If we have any of the following fields, fill them in
    if (document.getElementById("app-version")) {
        document.getElementById("app-version").innerHTML = appVersion;
    }

}

// Electron stuff
const { ipcRenderer } = require("electron");
const { BrowserWindow } = require("electron").remote;
const { exec } = require("child_process");

/*
*   UI helper methods
*/
function getInput(prompt) {
    inputContainer.style.display = "block";
    document.getElementById("input-container--prompt").innerHTML = prompt;
    document.getElementById("input-container--submit-btn").onclick = function() {
        if (document.getElementById("input-container--field").value == "" || document.getElementById("input-container--field").value == null) {
            return;
        }
        return document.getElementById("input-container--field").value.toString();
    }
}
                               
// Runs a shell command and returns the output as a string, also supports error handling    
function runShell(commandStr, method) {
    var result = ipcRenderer.sendSync("run-shell-command", { command: commandStr });
    method(result);
}