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
    icon: '/tmp/icon.png',
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: false
    // }
  });

  const url = 'https://notion.so';
  const faviconUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/2048px-Notion-logo.svg.png" //await getFavicon(url);
  if (faviconUrl) {
    try {
      const response = await fetch(faviconUrl);
      const buffer = await response.arrayBuffer();
      const nativeImage = require('electron').nativeImage;
      // const image = nativeImage.createFromBuffer(Buffer.from(buffer));
      const image = nativeImage.createFromPath('/tmp/icon.png');
      win.setIcon(image);
        app.setAboutPanelOptions({
          iconPath: '/tmp/icon.png'
        })
win.setOverlayIcon(image, 'Description for overlay')
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