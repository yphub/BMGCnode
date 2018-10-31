module.exports = {
    port: 5000,
    serial: "/dev/ttyACM0",
    nodeudp: 14551,
    pymavlink: 14552,
    log4js: {
        appenders: {
            BMGC: {
                type: 'stdout'
            }
        },
        categories: {
            default: {
                appenders: ['BMGC'],
                level: 'debug'
            }
        }
    }
}