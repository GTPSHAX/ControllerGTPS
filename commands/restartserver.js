const {execSync} = require("../modules/function");
const config = require("../config.json");
const path = require('path');

function isAppRunning(appPath) {
    const appName = path.basename(appPath);
    const result = execSync(`tasklist /FI "IMAGENAME eq ${appName}"`, { stdio: 'pipe' }).toString();
    return result.includes(appName);
}

function closeApp(appPath) {
    try {
        const appName = path.basename(appPath);
        execSync(`taskkill /F /IM ${appName}`);
    } catch (error) {
        console.error(`Error closing the app: ${error.message}`);
    }
}

function runApp(appPath) {
    try {
        const appDir = path.dirname(appPath);
        const appName = path.basename(appPath);
        execSync(`cd "${appDir}" && start "" "${appName}"`, { stdio: 'ignore', detached: true });
    } catch (error) {
        console.error(`Error running the app: ${error.message}`);
    }
}

module.exports = {
    name: 'restartserver',
    description: 'Restart the server',
    execute(message) {
        if (isAppRunning(config.path.server_exe)) {
            message.reply(`The app at path "${config.path.server_exe}" is already running. Restarting...`);
            closeApp(config.path.server_exe);
        } else {
            message.reply(`The app at path "${config.path.server_exe}" is not running. Starting...`);
        }
        runApp(config.path.server_exe);
    },
};