const IO = require('koa-socket-2');
const io = new IO();
const log4js = require('log4js')
const logger = log4js.getLogger('io')
const fs = require('fs');
const {
    promisify
} = require('util');
const readFile = promisify(fs.readFile);
const port = require('./mavserial');
const pyMaster = require('./pymaster');
const pca = require('./pca')

io.on('message', function (data) {
    logger.info(`message: ${data}`)
});

io.on('servo', function (ctx) {
    pca.setRange(0, ctx.data);
});

io.on('tank', function (ctx) {
    pca.setTank.apply(pca, ctx.data)
});

io.on('tilt', function (ctx) {
    pca.setDutyCycle(12, ctx.data);
});

io.on('servoHand', function (ctx) {
    pca.setDutyCycle(2, ctx.data);
});

io.on('duty', function (ctx) {
    pca.setDutyCycle(...ctx.data);
});

io.on("mavlink", ({
    data
}) => {
    pyMaster.cp.stdin.write(JSON.stringify(data) + "\r\n");
});

port.on("buffer", buffer => {
    io.broadcast("mavlink", buffer);
})

async function tempEvent() {
    let str = await readFile("/sys/bus/w1/devices/w1_bus_master1/28-041703223bff/w1_slave", {
        encoding: "utf8"
    });
    let list = str.split(' ');
    let temp = list[list.length - 1];
    console.log("boardcast " + temp);
    io.broadcast("temp", temp);
    setTimeout(tempEvent, 2000)
}

if (process.platform === "win32") {
    tempEvent = function () {
        console.warn("platform is win32; fake tempRead on.");
        let q = 333333;
        setInterval(() => {
            io.broadcast("temp", String(q));
            console.log(`faking temp: ${q}`);
            q += 5;
        }, 2000);
    }
}

tempEvent();


module.exports = io;