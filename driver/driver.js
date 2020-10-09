'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const mainConnection = io.connect(host);
const capsConnection = io.connect(`${host}/caps`);

mainConnection.on('pickup', logPickUpMessage);
mainConnection.on('pickup', logDelivered);





function logPickUpMessage(payload) {
  setTimeout( () => {
    console.log(`DRIVER: Picked Up ${payload.orderId}`);
    capsConnection.emit('in-transit', payload);
  }, 1000);
}

function logDelivered(payload) {
  setTimeout( () => {
    console.log(`DRIVER: Delivered ${payload.orderId}`);
    capsConnection.emit('delivered', payload);
  }, 3000);
}
