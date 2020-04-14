var SPI = require('pi-spi');
var Gpio = require('onoff').Gpio;

var spi = SPI.initialize('/dev/spidev0.0');

//spi.clockSpeed(2000);

var HIGH = 1;
var LOW = 0;

//var CS = 29;

const CS = new Gpio(17, 'out');

/*
CS.writeSync(LOW);
spi.read(14, (data) => {
  console.log(data);
})
*/
