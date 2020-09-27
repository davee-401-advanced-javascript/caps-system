'use strict';

const events = require('./events.js');

events.on('pickup', logPickUpMessage);
events.on('pickup', logDelivered);

function logPickUpMessage(payload) {
  setTimeout( () => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('in-transit', payload);
  }, 1000);
}

function logDelivered(payload) {
  setTimeout( () => {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    events.emit('delivered', payload);
  }, 3000);
}
