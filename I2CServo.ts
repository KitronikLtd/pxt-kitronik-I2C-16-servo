/**
 * Blocks for driving the Kitronik I2C 16-Servo Driver Board
 */
//% weight=100 color=#00A654 icon="\uf085" block="I2C 16-Servo"
namespace kitronik_i2c_16_servo {

//Some useful parameters. 
    let ChipAddress = 0x6A //default Kitronik Chip address
    let PrescaleReg = 0xFE //the prescale register address
    let PrescaleVal = 0x85 // 50Hz
    let Mode1Reg = 0x00  //The mode 1 register address
    
// If you wanted to write some code that stepped through the servos then this is the BASe and size to do that 	
	let Servo1RegBase = 0x08 
    let ServoRegDistance = 4
	//To get the PWM pulses to the correct size and zero offset these are the default numbers. 
    let ServoMultiplier = 226
    let ServoZeroOffset = 0x66

    let initalised = false //a flag to allow us to initialise without explicitly calling the secret incantation

    //nice big list of servos for the block to use. These represent register offsets in the PCA9865
    export enum Servos {
        Servo1 = 0x08,
        Servo2 = 0x0C,
        Servo3 = 0x10,
        Servo4 = 0x14,
        Servo5 = 0x18,
        Servo6 = 0x1C,
        Servo7 = 0x20,
        Servo8 = 0x24,
        Servo9 = 0x28,
        Servo10 = 0x2C,
        Servo11 = 0x30,
        Servo12 = 0x34,
        Servo13 = 0x38,
        Servo14 = 0x3C,
        Servo15 = 0x40,
        Servo16 = 0x44,
    }

	export enum BoardAddresses{
		Board1 = 0x6A,
		
	}
    //Trim the servo pulses. These are here for advanced users, and not exposed to blocks.
    //It appears that servos I've tested are actually expecting 0.5 - 2.5mS pulses, 
    //not the widely reported 1-2mS 
    //that equates to multiplier of 226, and offset of 0x66
    // a better trim function that does the maths for the end user could be exposed, the basics are here 
	// for reference

    export function TrimServoMultiplier(Value: number) {
        if (Value < 113) {
            ServoMultiplier = 113
        }
        else {
            if (Value > 226) {
                ServoMultiplier = 226
            }
            else {
                ServoMultiplier = Value
            }

        }
    }
    export function TrimServoZeroOffset(Value: number) {
        if (Value < 0x66) {
            ServoZeroOffset = 0x66
        }
        else {
            if (Value > 0xCC) {
                ServoZeroOffset = 0xCC
            }
            else {
                ServoZeroOffset = Value
            }

        }
    }

	/*
		This secret incantation sets up the PCA9865 I2C driver chip to be running at 50Hx pulse repetition, and then sets the 16 output registers to 1.5mS - centre travel.
		It should not need to be called directly be a user - the first servo write will call it.
	
	*/
	function secretIncantation(): void {
        let buf = pins.createBuffer(2)
        let reset = pins.createBuffer(1)

        // Soft reset of the I2C chip
        reset[0] = 0x06
        pins.i2cWriteBuffer(0x00, reset, false)

        // First set the prescaler to 50 hz
        buf[0] = PrescaleReg
        buf[1] = PrescaleVal
        pins.i2cWriteBuffer(ChipAddress, buf, false)

        // Block write via the all leds register to set all of them to 0 degrees
        buf[0] = 0xFA
        buf[1] = 0x00
        pins.i2cWriteBuffer(ChipAddress, buf, false)
        buf[0] = 0xFB
        buf[1] = 0x00
        pins.i2cWriteBuffer(ChipAddress, buf, false)
        buf[0] = 0xFC
        buf[1] = 0x66
        pins.i2cWriteBuffer(ChipAddress, buf, false)
        buf[0] = 0xFD
        buf[1] = 0x00
        pins.i2cWriteBuffer(ChipAddress, buf, false)

        // Set the mode 1 register to come out of sleep
        buf[0] = Mode1Reg
        buf[1] = 0x01
        pins.i2cWriteBuffer(ChipAddress, buf, false)

        //set the initalised flag so we dont come in here again automatically
        initalised = true
    }
	
	
/**
     * sets the requested servo to the reguested angle.
	 * if the PCA has not yet been initialised calls the initialisation routine
	 *
     * @param Servo Which servo to set
	 * @param degrees the angle to set the servo to
     */
    //% blockId=kitronik_I2Cservo_write
    //% block="set%Servo|to%degrees"
	//% degrees.min=0 degrees.max=180
	
    export function servoWrite(Servo: Servos, degrees: number): void {
        if (initalised == false) {
            secretIncantation()
        }
        let buf = pins.createBuffer(2)
        let HighByte = false
        let deg100 = degrees * 100
        let PWMVal100 = deg100 * ServoMultiplier
        let PWMVal = PWMVal100 / 10000
        PWMVal = Math.floor(PWMVal)
        PWMVal = PWMVal + ServoZeroOffset
        if (PWMVal > 0xFF) {
            HighByte = true
        }
        buf[0] = Servo
        buf[1] = PWMVal
        pins.i2cWriteBuffer(ChipAddress, buf, false)
        if (HighByte) {
            buf[0] = Servo + 1
            buf[1] = 0x01
        }
        else {
            buf[0] = Servo + 1
            buf[1] = 0x00
        }
        pins.i2cWriteBuffer(ChipAddress, buf, false)
    }
	    
    /**
     * Adjusts the servos.
     * This block should be used if the connected servo does not respond correctly to the 'set angle' command.
     * Try changing the value by small amounts and testing the servo until it correctly sets to the angle.
     * @param change , eg: -13
     */
    //% subcategory=Settings
    //% group=Settings
    //% blockId=kitronik_adjust_servos
    //% block="adjust servos by |%change|"
    //% weight=50 blockGap=8
    //% change.min=-25 change.max=25
    export function adjustServos(change: number): void {
        PrescaleVal = 0x85 + change
        secretIncantation()
    }
}
