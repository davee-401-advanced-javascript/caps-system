'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
// const host = 'https://caps-lab.herokuapp.com/';

const mainConnection = io.connect(host);
const capsConnection = io.connect(`${host}/caps`);


capsConnection.on('pickup', logPickUpMessage);
capsConnection.on('pickup', logDelivered);


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
