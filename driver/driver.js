'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const mainConnection = io.connect(host);
const driverToVendor = io.connect(`${host}/delivered`);

mainConnection.on('pickup', logPickUpMessage);
mainConnection.on('pickup', logDelivered);





function logPickUpMessage(payload) {
  setTimeout( () => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    mainConnection.emit('in-transit', payload);
  }, 1000);
}

function logDelivered(payload) {
  setTimeout( () => {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    driverToVendor.emit('delivered', payload);
  }, 3000);
}
