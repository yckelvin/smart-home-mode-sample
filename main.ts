microIoT.microIoT_MQTT_Event(microIoT.TOPIC.topic_0, function (message) {
    Mode = message
    microIoT.microIoT_showUserText(7, message)
})
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
let light2 = 0
let rainfall = 0
let Mode = ""
let wifi_name = "izowifi"
let password = "izo1234@"
let iot_id = "iot_id"
let iot_pwd = "iot_pwd"
let topic_0 = "topic_id"
microIoT.microIoT_initDisplay()
microIoT.microIoT_showUserText(0, "INIT DEVICE")
microIoT.microIoT_showUserText(1, "SETUP WIFI")
microIoT.microIoT_WIFI(wifi_name, password)
microIoT.microIoT_showUserText(2, "DEFINE MQTT")
microIoT.microIoT_MQTT(
iot_id,
iot_pwd,
topic_0,
microIoT.SERVERS.English
)
microIoT.microIoT_add_topic(microIoT.TOPIC.topic_1, "dRJN_0_7g")
microIoT.microIoT_add_topic(microIoT.TOPIC.topic_2, "RG1r4W9ng")
microIoT.microIoT_clear()
microIoT.microIoT_showUserText(0, "Ready!")
basic.forever(function () {
    if (Mode == "sunny mode") {
        rainfall = pins.analogReadPin(AnalogPin.P1)
        microIoT.microIoT_SendMessage(convertToText(rainfall), microIoT.TOPIC.topic_1)
        microIoT.microIoT_showUserText(1, "Rainfall: " + convertToText(rainfall))
        if (rainfall < 300) {
            microIoT.microIoT_ServoRun(microIoT.aServos.S1, 30)
        } else {
            microIoT.microIoT_ServoRun(microIoT.aServos.S1, 0)
        }
        light2 = pins.analogReadPin(AnalogPin.P0)
        microIoT.microIoT_SendMessage(convertToText(light2), microIoT.TOPIC.topic_2)
        microIoT.microIoT_showUserText(2, "Light: " + convertToText(light2))
        if (light2 < 128) {
            pins.analogWritePin(AnalogPin.P16, 1023)
        } else {
            pins.analogWritePin(AnalogPin.P16, 0)
        }
    } else if (Mode == "rainy mode") {
    	
    } else if (Mode == "sleeping mode") {
    	
    } else if (Mode == "security mode") {
    	
    }
    basic.pause(5000)
})
