const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function create() {
  const w = new BrowserWindow({
    width: 1280, height: 720, useContentSize: true,
    backgroundColor: '#17120d', title: 'Timberdale',
    icon: path.join(__dirname, 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: { autoplayPolicy: 'no-user-gesture-required' }
  });
  Menu.setApplicationMenu(null);
  w.setAspectRatio(16 / 9);
  w.loadFile('index.html');
  w.webContents.on('before-input-event', (e, i) => {
    if (i.type !== 'keyDown') return;
    if (i.key === 'F11') { w.setFullScreen(!w.isFullScreen()); e.preventDefault(); }
    if (i.key === 'Escape' && w.isFullScreen()) { w.setFullScreen(false); e.preventDefault(); }
  });
}

app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
