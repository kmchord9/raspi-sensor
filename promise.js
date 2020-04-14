const i2c = require('i2c-bus');
const express = require('express');
var {PythonShell} = require('python-shell');
var BME280 = require('lsd-bme280')

//ADT7410
const DEVICE_NUMBER = 1;
const TARGET_IC_ADDR = 0x48;
const TEMP_REG = 0x00;
const CONFIG = 0x03;
var i2c1 = i2c.openSync(DEVICE_NUMBER);
i2c1.writeWordSync(TARGET_IC_ADDR, CONFIG, 0x00);

//bme280        
var bme280 = new BME280(0x76, '/dev/i2c-1')


//pythonファイル読み込みテスト

var get_pythondata = () => { 
    return new Promise( (resolve, reject) =>{
         let shell = new PythonShell('jsontest.py', {mode:'json'});
         shell.on('message', (message) => {
           if (message) {
                //data = {"pythondata":{"data":message}};
                resolve(message);
           }else{
                reject(err);
           }
         })
    })
}


//ADT7410取得関数
/*
*関数概要：温度データ取得
*引数：i2cからのビットデータ
*戻り値：温度
*/
const toCelsius = rawData => {
    rawData = (rawData & 0xff00)>>8 | (rawData & 0xff) <<8;
    rawData = rawData >> 3
    
    return rawData/16;
    };

var get_ADT7410 = () => { 
    return new Promise( (resolve, reject) =>{
       var rawData = i2c1.readWordSync(TARGET_IC_ADDR, TEMP_REG);
       var temp = toCelsius(rawData);
         if (temp) {
              data = {"ADT7410":{"temp":temp}};
              resolve(data);
         }else{
              reject(err);
         }
    })
}

//bme280取得関数
var get_bme280 = () => { 
    return new Promise( (resolve, reject) =>{
       bme280.async_get_data((err, res) => {
         if (res) {
              data = {"BME280":res};
              //console.log(res);
              resolve(data);
         }else{
              reject(err);
         }

       });
    })
}




//MAX31855取得関数

var get_MAX31855 = () => { 
    return new Promise( (resolve, reject) =>{
       PythonShell.run('temp.py', {mode:'json'},(err,results) => {
       if (err) {
            reject(err);
       }else{
            resolve(results[0]);
       }

       });
    })
}


//server

const app = express();

app.get('/', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' });
    (async () => {
        const data1 = await get_bme280();
        const data2 = await get_MAX31855();
        const data3 = await get_ADT7410();
        res.json(Object.assign(data3,data1,data2));
    })();
  
})
app.listen(3000,'0.0.0.0', () => console.log('http://localhost:3000'))

