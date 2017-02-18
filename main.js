const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const express = require('express');
const server = new express();

var ws = require('http').Server(server);

var io = require('socket.io')(ws);
let socket;

io.on('connection', function (socketinstance) {
  console.log('a user connected', socketinstance);
  socket = socketinstance;
  socket.on('message', function (msg) {
    io.emit('message', msg);
    console.log('message: ' + msg);
  });
});

if(socket){
  console.log('We have socjet, set up listener' ); //TODO: REMOVE

}

let mainWindow;


function createWindow() {
  mainWindow = new BrowserWindow({width: 1024, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if(process.platform!=='darwin'){
    app.quit();
  }
});
server.get('/messages', function (req, res) {
  const messages = require('./messages.json');
  res.send(messages);
});

server.listen(3000);

ws.listen(3003, function () {
  console.log('listening on *:3003');
});

app.on('activate', function () {
  if(mainWindow===null){
    createWindow();
  }
});
