const Koa = require('koa');
const static = require('koa-static');
const log4js = require('log4js');
const io = require('./modules/iohandler');
const config = require('./config');

log4js.configure(config.log4js);


const pyMaster = require('./modules/pymaster');
pyMaster.start();
const udpServer = require('./modules/udpproxy');

const logger = log4js.getLogger("app");

const app = new Koa();

const router = require('./routers/index');
io.attach(app);

app._io.on('connection', ws => {
    logger.warn(`command: ${ws.handshake.address} connect. total: ${io.connections.size}`);
    ws.on('disconnect', r => {
        logger.warn(`command: ${ws.handshake.address} disconnect. reason: ${r}. left: ${io.connections.size}`);
    });
});

app.use(static(`${__dirname}/static`))
app.use(router.routes());

app.listen(config.port, function () {
    logger.log(`Listening on port ${config.port}`)
});