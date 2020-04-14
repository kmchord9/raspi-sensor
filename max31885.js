var SPI = require('pi-spi');
var Gpio = require('onoff').Gpio;

var spi = SPI.initialize('/dev/spidev0.0');

spi.clockSpeed(2000);

var HIGH = 1;
var LOW = 0;

var CS = 29;

class MAX {
    constractor(CS) {
        this.CS = CS;
        this.switch = new GPIO(this.CS, 'out')
    }

    readData(){
      this.switch.writeSync(LOW);
      spi.read(14, (data) => {
          console.log(data);
      })
    }

}

var data = new MAX(29);
data.readData();
