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


const capsConnection = io.of('/caps');

capsConnection.on('connection', (socket) => {

  socket.on('join', (room) => {
    const valid = ['vendorDavee123'];
    if(valid.includes(room)) {
      console.log('A NEW ROOM is CREATED: ', room);
      socket.join(room);
    }
  });

  socket.on('delivered', (payload) => {
    loggerMessage('DELIVERED', payload);
    capsConnection.to('vendorDavee123').emit('delivered', payload);
  });

  socket.on('in-transit', (payload) => {
    loggerMessage('IN-TRANSIT', payload);
  });

});



function loggerMessage(event, payload) {
  console.log('============================================');
  console.log('                 ',event);
  console.log({
    // time: Date.now().toString(),
    time: new Date().toString(),
    payload: payload,
  });
  console.log('============================================');
}

