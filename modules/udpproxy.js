const dgram = require('dgram');
const log4js = require('log4js');

const config = require('../config');
const port = require('./mavserial');

const logger = log4js.getLogger('udpproxy');

const udpServer = dgram.createSocket("udp4");

udpServer.bind(config.nodeudp);
udpServer.on("message", cmd => {
    logger.log(cmd);
    port.write(cmd);
});

port.on('buffer', buffer => {
    udpServer.send(buffer, config.pymavlink);
});


logger.log(`udp server listening at port ${config.nodeudp}`);
module.exports = udpServer;