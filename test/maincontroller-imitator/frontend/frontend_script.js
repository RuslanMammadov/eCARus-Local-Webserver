/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

const ID_START_BYTE = 8;
const MINIMAL_LENGHT_OF_MESSAGE = 11;

const LIGHT_BITS = {    // TODO Translate to normal english
    WARNING_LIGHTS: 1,
    INDICATOR_RIGHT: 2,
    INDICATOR_LEFT: 3,
    FAR_LIGHT: 4,       // Fernlicht
    NORMAL_LIGHT: 5,    // Abblendlicht
    LIGHT_STAND: 6,     // Standlicht
    FLASH_LIGHT: 7,
};

const RUN_LEVEL = {
    N: 1,
    D: 2,
    R: 3
};

const INTERFACE_BITS = {
    INTERFACE_1: 10 - 8, // 8 bits in first byte
    INTERFACE_2: 11 - 8
};

const socketIO = io();
socketIO.on('connection', (socket) => {
    console.log("connected");
});

socketIO.on('message', (msg) => {
    let msgAsHex = msg.map((number) => number.toString(16));
    
    console.log("Message from backend:", msgAsHex);

    document.getElementById("messageFromBackend").innerHTML = msgAsHex.toString();
});

function test(time) {
    let value = 0;
    let lightBits = Object.values(LIGHT_BITS);
    let runlevels = Object.values(RUN_LEVEL);
    let interfaceBits = Object.values(INTERFACE_BITS);

    let i = 0;
    let interval = setInterval(() => {
        setVelocity(value);
        setAccumulatorRight(value);

        setRunLevel(runlevels[i % runlevels.length]);
        setLight(lightBits[i % lightBits.length]);
        setInterface(interfaceBits[(Math.floor(i / 10) % 2) ? 1 : 0]);

        value = (value === 50) ? 0 : value + 10;
        i++;
    }, 1000);

    setTimeout(() => {
        clearInterval(interval);
        i = 0;
        value = 0;
    }, time * 1000);
}

function sendHexString(hexString) {
    socketIO.emit("message", _hexStringToIntArray(hexString));
}

function _hexStringToIntArray(hexString) {
    let hexStringPure = hexString.replace(/[^0-9a-fA-F]/g, "");
    let intArray = [];
    for (let i = 0; i < hexStringPure.length; i = i + 2) {
        intArray.push(parseInt(hexStringPure.substr(i, 2), 16));
    }
    return intArray;
}

function setVelocity(velocity) {
    send("0093", velocity);
}

function setAccumulatorRight(accumulatorValue) {
    let value = Math.min(parseInt(accumulatorValue), 100);
    send("0094", value, 0, 0);
}

function setRunLevel(runLevel) {
    send("0097", runLevel, 0, 0);
}

function setLight(lightBit) {
    send("0092", _setBit(lightBit) * 256, 1, 0);
}

function setNoLight() {
    send("0092", 0, 1, 0);
}

function setInterface(interfaceBit) {
    send("0092", _setBit(interfaceBit), 1, 0);
}

/**
 * Set bit to 1.
 *
 * @param {number} bitNumber
 * @returns oneByteValue
 */
function _setBit(bitNumber) {
    return Math.pow(2, 7 - bitNumber);
}

/**
 * Sends message to backend.
 *
 * @param {string} idAsHex like "0092"
 * @param {number | string} value to send
 * @param {number | string} [lastByte=1] of value
 * @param {number | string} [startByte=0] of value
 */
function send(idAsHex, value, lastByte = 1, startByte = 0) {
    let byteArray = _getByteArrayWithRandomNumbers(MINIMAL_LENGHT_OF_MESSAGE);
    _setValue(byteArray, parseInt(value), parseInt(lastByte), parseInt(startByte));
    _setIDAsHex(byteArray, idAsHex);
    socketIO.emit("message", byteArray)
}

function _getByteArrayWithRandomNumbers(lenght) {
    let byteArray = [];
    for (let i = 0; i < lenght; i++) {
        byteArray.push(Math.floor(Math.random() * 256));
    }
    return byteArray;
}

function _setValue(byteArray, value, lastByte = 1, startByte = 0) {
    let remainedNumber = value;
    for (let byteNumber = lastByte; byteNumber >= startByte; byteNumber--) {
        byteArray[byteNumber] = remainedNumber % 256;
        remainedNumber -= byteArray[byteNumber];
        remainedNumber /= 256;
    }
}

function _setIDAsHex(byteArray, idAsHexString) {
    byteArray[ID_START_BYTE] = parseInt(idAsHexString.substr(2, 2), 16);
    byteArray[ID_START_BYTE + 1] = parseInt(idAsHexString.substr(0, 2), 16);
}