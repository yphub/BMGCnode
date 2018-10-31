const Router = require('koa-router');
const Body = require('koa-body')();
const fs = require('fs');
const {
    promisify
} = require('util');
const log4js = require('log4js');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const Index = new Router();
const logger = log4js.getLogger('router');

module.exports = Index;

const configPath = `${__dirname}/../store/config.json`;
Index.get('/getconfig', async function (ctx) {
    logger.info("getting config");
    const cfg = await readFile(configPath, 'utf8');
    ctx.body = cfg;
});

Index.post('/saveconfig', Body, async function (ctx) {
    logger.info("saving config");
    await writeFile(configPath, JSON.stringify(ctx.request.body));
    ctx.body = {
        success: true
    };
});