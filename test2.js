var sleep = require('sleep');
var async = require('async');
var BME280 = require('lsd-bme280');

var bme280 = new BME280(0x76, '/dev/i2c-1');

async.forever(
    (callback) => {
        bme280.async_get_data((err, res) => {
            console.log(res);
            sleep.msleep(1000);
            callback(null);
        });
    }
);
