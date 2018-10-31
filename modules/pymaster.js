const childProcess = require('child_process');
const path = require('path');
const {
    promisify
} = require('util');
const exec = promisify(childProcess.exec);
const config = require("../config");
const log4js = require('log4js');

const logger = log4js.getLogger("Python");

class PyMaster {
    async killPy() {
        let {
            stdout
        } = await exec('ps aux | grep python');
        let pylist = stdout.trim().split('\n').filter(list => list.includes('udpproxy.py'))
        for (let i in pylist) {
            let line = pylist[i];
            if (!line) continue;
            let pid = /pi\s*([\d]*)/.exec(line)[1];
            try {
                console.log(`killing python process id: ${pid}`);
                await exec(`kill -9 ${pid}`)
            } catch (e) {
                console.warn(e);
            }
        }
    }
    async start() {
        const args = [path.resolve(`${__dirname}/../py/udpproxy.py`), `--mavlinkport=${config.pymavlink}`];

        console.log('--- python ' + args.join(' '));
        const cp = childProcess.spawn('python', args, {
            stdio: ['pipe', 'pipe', process.stderr]
        });
        this.cp = cp;

        cp.stdout.on('data', data => {
            console.log("python : ", data.toString().trim());
        });        

        cp.on('error', async e => {
            console.warn("child process error: " + e);
            await this.killPy();
            setTimeout(this.start, 2000);
            delete this.cp;
        })
    }
}



module.exports = new PyMaster;