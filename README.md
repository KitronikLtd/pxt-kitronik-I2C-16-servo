# Kitronik blocks for micro:bit
# pxt-kitronik-I2C-16-servo
BETA - Blocks for driving the Kitronik I2C 16 servo expansion board


Blocks that support [Kitronik I2C Servo driver board for the micro:bit](https://www.kitronik.co.uk/5612.html)

## ServoLite

* set servo output 1 to 90 degrees

```blocks
input.onButtonPressed(Button.A, () => {
    Kitronik.servoWrite(Servo1, 90);
})
```


## License

MIT

## Supported targets
