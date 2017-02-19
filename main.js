const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const express = require('express');
const server = new express();
const bodyparser = require('body-parser');
const fs = require('fs');


process.on('uncaughtException', function (err) {
  console.log('===>UNEXPECTED ERROR OCCURRED', err);
})

server.use(bodyparser.json())

var ws = require('http').Server(server);

var io = require('socket.io')(ws);
let socket;

let master = null;

io.on('connection', function (socket) {
  if(!master){
    console.log('MASTER', socket.id); //TODO: REMOVE
    master = socket.id;
  }
  console.log('a user connected', socket.id);

  io.to(socket.id).emit('whoareyou','');

  socket.on('message', function (msg) {
    io.emit('message', msg);
    console.log('message: ' + msg);
  });

  socket.on('whoami', function(msg){

    if(msg.clientid === '0'){
      msg.clientid = socket.id;
    }
    console.log('WE HAVE CLIENT', msg )
    if(master){
      io.to(master).emit('clientin', msg);
    }
  });
  socket.on('ack', function(msg){

    console.log('ACK', msg );
    if(master){
      io.to(master).emit('clientack', socket.id);
    }
  });

  socket.on('resp', function(msg){
    console.log('RESPONSE', socket.id, msg)
    if(master){
      io.to(master).emit('clientresp', {client: socket.id, resp: msg.resp});
    }
  });

  socket.on('disconnect', function () {
    if(master){
      io.to(master).emit('clientout', socket.id)
    }
    console.log('DISCONNECTIION', socket.id)
  })
});




let mainWindow;


function createWindow() {
  mainWindow = new BrowserWindow({width: 1024, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
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
server.post('/messages', function (req, res, next) {

  fs.writeFile('./messages.json', JSON.stringify(req.body), function (err) {
    if (err) return next(err);
    res.send('file saved')
  });



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
