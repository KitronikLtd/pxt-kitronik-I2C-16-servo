//% deprecated
namespace kitronik_i2c_16_servo {

}

namespace modules {

    /**
     * Kitornik SERVO:LITE servo connector 1
     */
    //% fixedInstance whenUsed block="kitronik servo 1"
    export const kitronikServo1 = new ServoClient("kitronik servo 1?dev=self&srvo=0")

    /**
     * Kitornik SERVO:LITE servo connector 2
     */
    //% fixedInstance whenUsed block="kitronik servo 2"
    export const kitronikServo2 = new ServoClient("kitronik servo 2?dev=self&srvo=1")

    /**
     * Kitornik SERVO:LITE servo connector 3
     */
    //% fixedInstance whenUsed block="kitronik servo 3"
    export const kitronikServo3 = new ServoClient("kitronik servo 3?dev=self&srvo=2")

    /**
     * Kitornik SERVO:LITE servo connector 4
     */
    //% fixedInstance whenUsed block="kitronik servo 4"
    export const kitronikServo4 = new ServoClient("kitronik servo 4?dev=self&srvo=3")

    /**
     * Kitornik SERVO:LITE servo connector 5
     */
    //% fixedInstance whenUsed block="kitronik servo 5"
    export const kitronikServo5 = new ServoClient("kitronik servo 5?dev=self&srvo=4")

    /**
     * Kitornik SERVO:LITE servo connector 6
     */
    //% fixedInstance whenUsed block="kitronik servo 6"
    export const kitronikServo6 = new ServoClient("kitronik servo 6?dev=self&srvo=5")

    /**
     * Kitornik SERVO:LITE servo connector 7
     */
    //% fixedInstance whenUsed block="kitronik servo 7"
    export const kitronikServo7 = new ServoClient("kitronik servo 7?dev=self&srvo=6")

    /**
     * Kitornik SERVO:LITE servo connector 8
     */
    //% fixedInstance whenUsed block="kitronik servo 8"
    export const kitronikServo8 = new ServoClient("kitronik servo 8?dev=self&srvo=7")

    /**
     * Kitornik SERVO:LITE servo connector 9
     */
    //% fixedInstance whenUsed block="kitronik servo 9"
    export const kitronikServo9 = new ServoClient("kitronik servo 9?dev=self&srvo=8")

    /**
     * Kitornik SERVO:LITE servo connector 10
     */
    //% fixedInstance whenUsed block="kitronik servo 10"
    export const kitronikServo10 = new ServoClient("kitronik servo 10?dev=self&srvo=9")

    /**
     * Kitornik SERVO:LITE servo connector 11
     */
    //% fixedInstance whenUsed block="kitronik servo 11"
    export const kitronikServo11 = new ServoClient("kitronik servo 11?dev=self&srvo=10")

    /**
     * Kitornik SERVO:LITE servo connector 12
     */
    //% fixedInstance whenUsed block="kitronik servo 12"
    export const kitronikServo12 = new ServoClient("kitronik servo 12?dev=self&srvo=11")

    /**
     * Kitornik SERVO:LITE servo connector 13
     */
    //% fixedInstance whenUsed block="kitronik servo 13"
    export const kitronikServo13 = new ServoClient("kitronik servo 13?dev=self&srvo=12")

    /**
     * Kitornik SERVO:LITE servo connector 14
     */
    //% fixedInstance whenUsed block="kitronik servo 14"
    export const kitronikServo14 = new ServoClient("kitronik servo 14?dev=self&srvo=13")

    /**
     * Kitornik SERVO:LITE servo connector 15
     */
    //% fixedInstance whenUsed block="kitronik servo 15"
    export const kitronikServo15 = new ServoClient("kitronik servo 15?dev=self&srvo=14")
}

namespace servers {
    class ServoServer extends jacdac.Server {
        pin: kitronik_i2c_16_servo.Servos
        angle: number
        enabled: boolean
        offset: number
        minAngle = 0
        maxAngle = 180

        //% hiddenParts=microservo
        constructor(pin: kitronik_i2c_16_servo.Servos, options?: jacdac.ServerOptions) {
            super(jacdac.SRV_SERVO, options)
            this.pin = pin
            this.offset = 0
            this.enabled = false
            this.angle = Math.round((this.maxAngle - this.minAngle) / 2)
            this.sync()
        }

        handlePacket(pkt: jacdac.JDPacket) {
            this.handleRegValue(
                pkt,
                jacdac.ServoReg.MinAngle,
                jacdac.ServoRegPack.MinAngle,
                this.minAngle
            )
            this.handleRegValue(
                pkt,
                jacdac.ServoReg.MaxAngle,
                jacdac.ServoRegPack.MaxAngle,
                this.maxAngle
            )
            this.enabled = this.handleRegBool(
                pkt,
                jacdac.ServoReg.Enabled,
                this.enabled
            )
            this.angle = this.handleRegValue(
                pkt,
                jacdac.ServoReg.Angle,
                jacdac.ServoRegPack.Angle,
                this.angle
            )
            this.offset = this.handleRegValue(
                pkt,
                jacdac.ServoReg.Offset,
                jacdac.ServoRegPack.Offset,
                this.offset
            )
            this.handleRegValue(
                pkt,
                jacdac.ServoReg.ActualAngle,
                jacdac.ServoRegPack.ActualAngle,
                this.angle + this.offset
            )

            this.sync()
        }

        sync() {
            if (!this.enabled) return
            kitronik_i2c_16_servo.servoWrite(this.pin, this.angle + this.offset)
        }
    }

    function start() {
        jacdac.productIdentifier = 0x375d408f
        jacdac.deviceDescription = "Kitronik 16 Servo Driver Board"
        jacdac.startSelfServers(() => {
            const servers: jacdac.Server[] = [
                kitronik_i2c_16_servo.Servos.Servo1,
                kitronik_i2c_16_servo.Servos.Servo2,
                kitronik_i2c_16_servo.Servos.Servo3,
                kitronik_i2c_16_servo.Servos.Servo4,
                kitronik_i2c_16_servo.Servos.Servo5,
                kitronik_i2c_16_servo.Servos.Servo6,
                kitronik_i2c_16_servo.Servos.Servo7,
                kitronik_i2c_16_servo.Servos.Servo8,
                kitronik_i2c_16_servo.Servos.Servo9,
                kitronik_i2c_16_servo.Servos.Servo10,
                kitronik_i2c_16_servo.Servos.Servo11,
                kitronik_i2c_16_servo.Servos.Servo12,
                kitronik_i2c_16_servo.Servos.Servo13,
                kitronik_i2c_16_servo.Servos.Servo14,
                kitronik_i2c_16_servo.Servos.Servo15,
                kitronik_i2c_16_servo.Servos.Servo16,
            ].map((id, i) => new ServoServer(id, { instanceName: `SV${i + 1}` }))
            return servers
        })
    }
    start()
}