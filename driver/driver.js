'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const capsConnection = io.connect(host);


capsConnection.on('pickup', logPickUpMessage);
capsConnection.on('pickup', logDelivered);





function logPickUpMessage(payload) {
  setTimeout( () => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    capsConnection.emit('in-transit', payload);
  }, 1000);
}

function logDelivered(payload) {
  setTimeout( () => {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    capsConnection.emit('delivered', payload);
  }, 3000);
}
