'use strict';

// const uuid = require('uuid').v4;
const faker = require('faker');
require('dotenv').config();
const MYSTORE = process.env.MYSTORE;

// const events = require('../events.js');
// events.on('delivered', logThankYou);




function logThankYou (payload) {
  console.log(`Thank you for delivering ORDER: ${payload.orderId}`);
}

setInterval( () => {
  let payload = {
    storeName: MYSTORE,
    orderId: faker.random.uuid(), 
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  events.emit('pickup', payload);
}, 5000);


