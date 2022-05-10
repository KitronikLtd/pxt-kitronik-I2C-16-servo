// servo 1 to 90 degrees
// servo 8 to 180 degrees
// servo 16 to 0 degrees
input.onButtonPressed(Button.A, () => {
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo1, 90);
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo8, 180);
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo16, 0);
})

// servo 1 to 180 degrees
// servo 8 to 0 degrees
// servo 16 to 90 degrees
input.onButtonPressed(Button.B, () => {
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo1, 180);
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo8, 0);
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo16, 90);
})

// servo 1 to 0 degrees
// servo 8 to 90 degrees
// servo 16 to 180 degrees
input.onButtonPressed(Button.AB, () => {
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo1, 0);
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo8, 90);
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo16, 180);
})

