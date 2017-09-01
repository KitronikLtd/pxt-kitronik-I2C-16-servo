// servo 1 to 90 degrees
input.onButtonPressed(Button.A, () => {
    kitronik.servoWrite(kitronik.Servos.Servo1, 90);
})
// servo 8 to 0 degres
input.onButtonPressed(Button.B, () => {
    kitronik.servoWrite(kitronik.Servos.Servo8, 0);
})
// Servo 16 to 180 degrees
input.onButtonPressed(Button.AB, () => {
   kitronik.servoWrite(kitronik.Servos.Servo16, 180);
})

