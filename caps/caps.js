'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);


io.on('connection', (socket) => {
  console.log('CONNECTED', socket.id);

  socket.on('pickup', (payload) => {
    loggerMessage('PICKUP', payload);
    io.emit('pickup', payload);
  });

});


const caps = io.of('/caps');

caps.on('connection', (socket) => {

  socket.on('delivered', (payload) => {
    loggerMessage('DELIVERED', payload);
    caps.emit('delivered', payload);
  });

  socket.on('in-transit', (payload) => {
    loggerMessage('IN-TRANSIT', payload);
  });

});



function loggerMessage(event, payload) {
  console.log('============================================');
  console.log('                 ',event);
  console.log({
    time: Date.now(),
    payload: payload,
  });
  console.log('============================================');
}

