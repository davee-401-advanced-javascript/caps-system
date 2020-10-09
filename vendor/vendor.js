'use strict';

require('dotenv').config();
const faker = require('faker');
const MYSTORE = process.env.MYSTORE;

const io = require('socket.io-client');
const host = 'http://localhost:3000';

const mainConnection = io.connect(host);
const caps = io.connect(`${host}/caps`);


caps.on('delivered', logThankYou);
// create a connection with join and payload of store code


function logThankYou (payload) {
  console.log(`Thank you for Delivering ORDER: ${payload.orderId}`);
}

setInterval( () => {
  let payload = {
    storeName: MYSTORE,
    orderId: faker.random.uuid(), 
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  mainConnection.emit('pickup', payload);
}, 5000);


