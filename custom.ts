//% weight=100 color=#0fbc11 icon=""
namespace SDS011 {
    /**
     * Declare buffer and set RX, TX pin
     */
    //% weight=100
    //% block="connect sensor to RX %rxpin| TX %txpin"
    //% inlineInputMode=inline
    export function ConnectSensor(rxpin: SerialPin, txpin: SerialPin): void {
        serial.redirect(
            rxpin,
            txpin,
            BaudRate.BaudRate9600)
    }

    /**
     * define end character
     */
    //% weight=90
    //% block="message tail"
    export function MessageTail () {
        return String.fromCharCode(0xAB)
    }

    /**
     * Read 10 byte of data from sensor and save to buffer
     */
    //% weight=80
    //% block="read data"
    export function ReadData (): void {
        data = serial.readBuffer(10)
    }

    /**
     * Calculate Checksum and return true if data is valid
     * compare only low byte
     */
    //% weight=70
    //% block="checksum OK?"
    export function CalcChecksum (): boolean {
	let temp = 0
        for (let index = 2; index <= 7; index++) {
        temp += data[index]
    	}
    temp = temp % 256
	return temp == data[8];
}

    /**
     * Convert number to text with length limit
     */
    //% weight=60
    //% block="convert %number | to string length %length"
    export function NumberTostring (number: number, length: number) {
    return ("" + number + "         ").substr(0, length)
}


    /**
     * Read PM2.5 data
     */
    //% weight=40
    //% block="PM 2.5"
    export function DataPM25 () {
	return Math.round(Calc16bitNumber(3)/10)
}

    /**
     * Read PM10 data
     */
    //% weight=30
    //% block="PM 10"
    export function DataPM10 () {
	return Math.round(Calc16bitNumber(5)/10)
}

let data=pins.createBuffer(10)

function Calc16bitNumber (num: number) {
    return data[num] * 256 + data[num - 1];
}

}
