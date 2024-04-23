import * as dotenv from "dotenv";
import electron, { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { AppDataSource } from "./src/database/data-source.js";
import "./src/ipc/ipcMain.js";


dotenv.config();

function databaseInitialize(): void {
    AppDataSource.initialize()
        .then(async () => {
            console.log("Data Source has been initialized!");
        })
        .catch((error) => console.log(error));
} 
const FRONTEND_PROJECT_NAME = 'frontend';
const FRONTEND_DIST_PATH = path.join(__dirname, '..', '..', FRONTEND_PROJECT_NAME, 'dist');
const FRONTEND_INDEX_PATH = path.join(FRONTEND_DIST_PATH, FRONTEND_PROJECT_NAME, 'browser', 'index.html');
const ELECTRON_EXEC_PATH = path.resolve(__dirname, '..', 'node_modules', 'electron', 'dist', 'electron');
 
// electronReload(FRONTEND_DIST_PATH, {
//     forceHardReset: true,
//     electron: ELECTRON_EXEC_PATH,
// });
require('electron-reload')(FRONTEND_DIST_PATH, {
    forceHardReset: true,
    electron: ELECTRON_EXEC_PATH,
});

export default class Main {
    static mainWindow: Electron.BrowserWindow | null;
    static application: Electron.App;
    static BrowserWindow;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onReady() {
        // Segundo monitor
        let displays = electron.screen.getAllDisplays()
        let extDisplay = displays.find((display) => {
            return display.bounds.x !== 0 || display.bounds.y !== 0
        })
        const x = extDisplay ? extDisplay.bounds.x + 50 : 0;
        const y = extDisplay ? extDisplay.bounds.y + 50 : 0;
        Main.mainWindow = new Main.BrowserWindow({
            show: false,
            autoHideMenuBar: true,
            titleBarStyle: 'hidden',
            titleBarOverlay: {
                color: '#1f1f1f',
                symbolColor: '#555555'
            },
            x,
            y,
            backgroundColor: '#1F2020',
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true,
                nodeIntegrationInWorker: true
            }
        });
        Main.mainWindow?.maximize();
        Main.mainWindow?.show();
        Main.mainWindow?.webContents.openDevTools()
        Main.mainWindow?.loadURL(
            url.format({
                pathname: path.join(FRONTEND_INDEX_PATH),
                protocol: "file:",
                slashes: true
            })
        );

        databaseInitialize();

        Main.mainWindow?.on('closed', () => {
            Main.mainWindow = null;
        });
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        Main.application.on('activate', () => { if (Main.mainWindow === null) Main.onReady() });
    }
}

Main.main(app, BrowserWindow)
