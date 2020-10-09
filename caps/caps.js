'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);


io.on('connection', (socket) => {
  console.log('CONNECTED', socket.id);

  socket.on('pickup', logPickupEvent);
  socket.on('in-transit', logInTransitEvent);
  socket.on('delivered', logDeliveredEvent);
});




function logPickupEvent(payload) {
  let event = {
    event: 'pickup',
    time: Date.now(),
    payload: payload,
  };
  console.log(event);
  io.emit('pickup', payload);
}

function logInTransitEvent(payload) {
  let event = {
    event: 'in-transit',
    time: Date.now(),
    payload: payload,
  };
  console.log(event);
  io.emit('in-transit', payload);
}

function logDeliveredEvent(payload) {
  let event = {
    event: 'delivered',
    time: Date.now(),
    payload: payload,
  };
  console.log(event);
  io.emit('delivered', payload);
}