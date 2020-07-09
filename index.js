require("v8-compile-cache");

const { electron, app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");

function createWin() {
    let win = new BrowserWindow({
        width: 900,
        height: 800,
        resizable: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile("ui/html/index.html");
    win.webContents.openDevTools(); // @dev
    
    win.once("ready-to-show", () => {
        win.show();
    });

}

app.whenReady().then(createWin);

// Disable menu for all windows
app.on("browser-window-created", function(e, win) {
    win.setMenu(null);
});

// Listen for renderer calls
ipcMain.on("run-shell-command", (event, args) => {
    console.log("[run-shell-command] - attempting to run shell command...");
    const command = exec(args.command);

    command.stdout.on("data", data => {
        console.log("[run-shell-command] - success. stdout: " + data);
        event.returnValue = data;
    });

    command.stderr.on("data", data => {
        console.log("[run-shell-command] - stderr: " + data);
        event.returnValue = data;
    });

    command.on("error", (error) => {
        console.log("[run-shell-command] - error: " + error.message);
        event.returnValue = data;
    });

    command.on("close", code => {
        console.log("[run-shell-command] - child process finished w/ code " + code);
    });

});