import { autoUpdater } from 'electron-updater';
import { BrowserWindow } from 'electron';

export default class Updater {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  initialize() {
    const mainWindow = this.mainWindow;
    autoUpdater.on('error', err => mainWindow.webContents.send('update-error', err.toString()));
    autoUpdater.on('checking-for-update', () => mainWindow.webContents.send('checking-for-update'));
    autoUpdater.on('update-available', () => mainWindow.webContents.send('update-available'));
    autoUpdater.on('update-downloaded', () => autoUpdater.quitAndInstall());

    Updater.checkForUpdates();
  }

  static checkForUpdates() {
    if (process.env.NODE_ENV !== 'development') {
      autoUpdater.checkForUpdates();
    }
  }

  static download() {
    autoUpdater.downloadUpdate();
  }
}
