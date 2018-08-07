# Kitronik blocks for micro:bit
# pxt-kitronik-I2C-16-servo
Blocks for driving the Kitronik I2C 16 servo expansion board


Blocks that support [Kitronik I2C Servo driver board for the micro:bit](https://www.kitronik.co.uk/5612)

## I2C-16-servo 

* servos are listed in an enum 

```blocks
Servos.Servo1 through to Servos.Servo16

```
* set servo output 1 to 90 degrees when button A pressed

```blocks
input.onButtonPressed(Button.A, () => {
    kitronik_i2c_16_servo.servoWrite(Servos.Servo1, 90);
})
```


## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)


```package
pxt-kitronik-I2C-16-servo=github:KitronikLtd/pxt-kitronik-I2C-16-servo
```
