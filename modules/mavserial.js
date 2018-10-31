const SerialPort = require('serialport');
const log4js = require('log4js');
const logger = log4js.getLogger('mavserial');
const {
    serial
} = require('../config');


if (process.platform === "win32") {
    logger.warn("platform is win32; fake SerialPort.")
    module.exports = {
        on() {},
        emit() {},
        write() {}
    }
} else {
    module.exports = new SerialPort(serial, {
        baudRate: 115200
    });
    logger.log(`port ${serial} opening`);
    port.on("readable", function () {
        const buffer = port.read();
        port.emit("buffer", buffer);
    });
}

module.exports.on('error', e => logger.error(e));