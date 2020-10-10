'use strict';

require('dotenv').config();
const faker = require('faker');
const MYSTORE = process.env.MYSTORE;

const io = require('socket.io-client');
// const host = 'http://localhost:3000';
const host = 'https://caps-lab.herokuapp.com/';

const mainConnection = io.connect(host);
const capsConnection = io.connect(`${host}/caps`);
const madeUpStoreCode = 'vendorDavee123';


capsConnection.emit('join', madeUpStoreCode);
capsConnection.on('delivered', logThankYou);


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


