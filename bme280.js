var BME280 = require('lsd-bme280')

var bme280 = new BME280(0x76, '/dev/i2c-1')

bme280.async_get_data((err, res) => {
    console.log(res);
    
    });
