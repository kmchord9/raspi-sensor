const i2c = require('i2c-bus');
const express = require('express');
var {PythonShell} = require('python-shell');
var pyshell = new PythonShell('temp.py');
var BME280 = require('lsd-bme280')

//ADT7410の定数
const DEVICE_NUMBER = 1;
const TARGET_IC_ADDR = 0x48;
const TEMP_REG = 0x00;
const CONFIG = 0x03;

//bme280データ取得
var bme280 = new BME280(0x76, '/dev/i2c-1')

bme280.async_get_data((err, res) => {
    console.log(`bme280:${res.temp}`);
   // console.log(err);

    });

//熱電対温度取得
pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(`熱電対:${message}`);
});


//ADT7410初期設定
var i2c1 = i2c.openSync(DEVICE_NUMBER);
i2c1.writeWordSync(TARGET_IC_ADDR, CONFIG, 0x00);

/*
関数概要：温度データ取得
引数：i2cからのビットデータ
戻り値：温度
*/

const toCelsius = rawData => {
    rawData = (rawData & 0xff00)>>8 | (rawData & 0xff) <<8;
    rawData = rawData >> 3
    
    return rawData/16;
    };

var rawData = i2c1.readWordSync(TARGET_IC_ADDR, TEMP_REG);
var temp = toCelsius(rawData);
console.log(`ADT7410:${temp}`);

/*
//server

const app = express();

app.get('/', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.header('Content-Type', 'application/json; charset=utf-8');
    var rawData = i2c1.readWordSync(TARGET_IC_ADDR, TEMP_REG);
    var temp = toCelsius(rawData);
    var param = {"temp": + temp }; 
    res.send(param);
})
app.listen(3000,'0.0.0.0', () => console.log('http://localhost:3000'))
*/
