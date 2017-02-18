const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const express = require('express');
const server = new express();

let mainWindow;


function createWindow () {
  mainWindow = new BrowserWindow({width: 1024, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
server.get('/messages', function(req, res){
  const messages = require('./messages.json');
  res.send(messages);
});

server.listen(3000);

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
