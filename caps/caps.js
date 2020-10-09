'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);


io.on('connection', (socket) => {
  console.log('CONNECTED', socket.id);

  socket.on('pickup', (payload) => {
    loggerMessage('pickup', payload);
    io.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    loggerMessage('in-transit', payload);
  });
  
});


const driverToVendor = io.of('/delivered');

driverToVendor.on('connection', (socket) => {
  socket.on('delivered', (payload) => {
    loggerMessage('delivered', payload);
    driverToVendor.emit('delivered', payload);
  });
});



function loggerMessage(event, payload) {
  console.log({
    event: event,
    time: Date.now(),
    payload: payload,
  });
}

