'use strict';

// const events = require('./events.js');

// require('./vendor/vendor.js');
// require('./driver/driver.js');

// events.on('pickup', logPickupEvent);
// events.on('in-transit', logInTransitEvent);
// events.on('delivered', logDeliveredEvent);




function logPickupEvent(payload) {
  let event = {
    event: 'pickup',
    time: Date.now(),
    payload: payload,
  };
  console.log(event);
}

function logInTransitEvent(payload) {
  let event = {
    event: 'in-transit',
    time: Date.now(),
    payload: payload,
  };
  console.log(event);
}

function logDeliveredEvent(payload) {
  let event = {
    event: 'delivered',
    time: Date.now(),
    payload: payload,
  };
  console.log(event);
}