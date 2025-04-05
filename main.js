const { app, BrowserWindow } = require('electron');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');
const fs = require('fs');

async function getFavicon(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const faviconMatch = html.match(/<link[^>]*rel="(?:icon|shortcut icon)"[^>]*href="([^"]+)"/i);
    
    if (faviconMatch) {
      let faviconUrl = faviconMatch[1];
      if (!faviconUrl.startsWith('http')) {
        const baseUrl = new URL(url);
        faviconUrl = new URL(faviconUrl, baseUrl.origin).href;
      }
      return faviconUrl;
    }
    
    // Fallback to default favicon location
    const baseUrl = new URL(url);
    return `${baseUrl.origin}/favicon.ico`;
  } catch (error) {
    console.error('Error fetching favicon:', error);
    return null;
  }
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const url = 'https://notion.so';
  const faviconUrl = await getFavicon(url);
  
  if (faviconUrl) {
    try {
      const response = await fetch(faviconUrl);
      const buffer = await response.arrayBuffer();
      const iconPath = path.join(app.getPath('temp'), 'app-icon.ico');
      fs.writeFileSync(iconPath, buffer);
      win.setIcon(iconPath);
    } catch (error) {
      console.error('Error setting icon:', error);
    }
  }

  win.loadURL(url);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}); 