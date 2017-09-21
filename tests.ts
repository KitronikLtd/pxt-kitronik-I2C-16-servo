// servo 1 to 90 degrees
// servo 8 to 180 degrees
// servo 16 to 0 degrees
input.onButtonPressed(Button.A, () => {
    kitronik.servoWrite(kitronik.Servos.Servo1, 90);
	kitronik.servoWrite(kitronik.Servos.Servo8, 180);
	kitronik.servoWrite(kitronik.Servos.Servo16, 0);
})

// servo 1 to 180 degrees
// servo 8 to 0 degrees
// servo 16 to 90 degrees
input.onButtonPressed(Button.B, () => {
	kitronik.servoWrite(kitronik.Servos.Servo1, 180);
    kitronik.servoWrite(kitronik.Servos.Servo8, 0);
	kitronik.servoWrite(kitronik.Servos.Servo16, 90);
})

// servo 1 to 0 degrees
// servo 8 to 90 degrees
// servo 16 to 180 degrees
input.onButtonPressed(Button.AB, () => {
	kitronik.servoWrite(kitronik.Servos.Servo1, 0);
	kitronik.servoWrite(kitronik.Servos.Servo8, 90);
   kitronik.servoWrite(kitronik.Servos.Servo16, 180);
})

