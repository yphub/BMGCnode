const {
    Pca9685Driver
} = require('pca9685')
const {
    getLogger
} = require('log4js')
const logger = getLogger('pca')

class Pca extends Pca9685Driver {
    constructor(options, callback) {
        if (callback === undefined) callback = function () {}
        super(options, callback)
    }
    /**
     * set Servo with arm
     *
     * @param {number} index index of channel
     * @param {number} value value of channel range [0-1]
     * @memberof Pca
     */
    setServo(index, value) {
        if (index > 16) {
            logger.error('index must not greater then 16!')
            return
        }
        logger.info(index, value)
        this.setDutyCycle(index, value)
    }

    /**
     * set Tank speed
     *
     * @param {number} lspeed left speed range [-100 - 100]
     * @param {number} rspeed right speed range [-100 - 100]
     * @memberof Pca
     */
    setTank(lspeed, rspeed) {
        let speedlist = lspeed < 0 ? [-lspeed, 0] : [0, lspeed]
        speedlist.push.apply(speedlist, rspeed < 0 ? [-rspeed, 0] : [0, rspeed])
        logger.info("pca.setTank,speedlist: ", speedlist)
        this.setRange(8, speedlist)
    }

    /**
     * set many values of Pwm
     *
     * @param {number} start start index of channel
     * @param {number[]} arglist
     * @memberof Pca
     */
    setRange(start, arglist) {
        logger.info(arglist);
        arglist.forEach((value, index) => {
            this.setDutyCycle(start + index, value)
        })
    }
}

if (process.platform == "win32") {
    logger.warn("platform is on win32; fake PCA9685 on.");
    module.exports = {
        setRange(data) {
            logger.info("pca.setRange : ", data);
        },
        setTank(arr) {
            logger.info("pca.setTank  : ", arr);
        },
        setDutyCycle(id, data) {
            logger.info("pca.setDutyCycle : ", id, " ", data);
        }
    };
} else {
    const i2cBus = require('i2c-bus')
    const pca = new Pca({
        i2c: i2cBus.openSync(1),
        // debug: true
    }, function (err) {
        if (err) {
            logger.error("pca: ", err);
        }
        // pca.setDutyCycle(8, 0.15);

        pca.setRange(8, [0, 0, 0, 0]);
    })

    module.exports = pca;
}