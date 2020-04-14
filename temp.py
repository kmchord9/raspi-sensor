# -*- coding: utf-8 -*-

import board
import busio
import digitalio
import adafruit_max31855
import json

spi = busio.SPI(board.SCK, MOSI=board.MOSI, MISO=board.MISO)
cs = digitalio.DigitalInOut(board.D5)
max31855 = adafruit_max31855.MAX31855(spi, cs)

data = {"MAX31855":{"temp":max31855.temperature}}
redata = json.dumps(data)
print(redata)
