const Router = require('koa-router');
const Body = require('koa-body')();
const fs = require('fs');
const {
    promisify
} = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const Index = new Router();

module.exports = Index;

const configPath = `${__dirname}/../store/config.json`;
Index.get('/getconfig', async function (ctx) {
    const cfg = await readFile(configPath, 'utf8');
    ctx.body = cfg;
});

Index.post('/saveconfig', Body, async function (ctx) {
    await writeFile(configPath, JSON.stringify(ctx.request.body));
    console.log("saving config");
    ctx.body = {
        success: true
    };
});