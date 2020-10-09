'use strict';

require('dotenv').config();
const faker = require('faker');
const MYSTORE = process.env.MYSTORE;

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const capsConnection = io.connect(host);


capsConnection.on('delivered', logThankYou);




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
  capsConnection.emit('pickup', payload);
}, 5000);


