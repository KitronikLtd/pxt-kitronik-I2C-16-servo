let k = 0
let dk = 30
forever(() => {
    [
        modules.kitronikServo1,
        modules.kitronikServo2,
        modules.kitronikServo3,
        modules.kitronikServo4,
        modules.kitronikServo5,
        modules.kitronikServo6,
        modules.kitronikServo7,
        modules.kitronikServo8,
        modules.kitronikServo9,
        modules.kitronikServo10,
        modules.kitronikServo11,
        modules.kitronikServo12,
        modules.kitronikServo13,
        modules.kitronikServo14,
        modules.kitronikServo15,
    ].forEach((servo, i) => {
        servo.setAngle(Math.sin((k + i) / 6 * Math.PI) * 90 + 90)
    })

    k++
    pause(500)
})