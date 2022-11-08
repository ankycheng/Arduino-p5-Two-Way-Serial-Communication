// read any incoming data as a byte:
function serialEvent() {
    // read a string from the serial port
    // until you get carriage return and newline:
    var inString = serial.readStringUntil("\r\n");
    // console.log('inString:' + inString)
    //check to see that there's actually a string there:
    if (inString && inString.length>3) {
        // split the string on the commas:
        var sensors = split(inString, ",");
        // console.log('inString:')
        // console.log(sensors)
        if (sensors.length > 0) {
            let smoothNum = 1;
            x = sensors[0] * smoothNum;
            y = sensors[1]*=-1 * smoothNum;
            z = sensors[2] * smoothNum;
            let isClick = parseInt(sensors[3])
            
            if(isClick) addNew();
        }else{}
        
        // else if(sensors.length > 0){
        //     console.log(sensors)
        // }
        serial.print("x");
    }
    else if (inString){
        console.log('inString:' + inString)
    }
}

// if there's no port selected, 
// make a port select button appear:
function makePortButton() {
    // create and position a port chooser button:
    portButton = createButton('choose port');
    portButton.position(10, 10);
    // give the port button a mousepressed handler:
    portButton.mousePressed(choosePort);
}

// make the port selector window appear:
function choosePort() {
    serial.requestPort();
}

// open the selected port, and make the port 
// button invisible:
function openPort() {
    // wait for the serial.open promise to return,
    // then call the initiateSerial function
    serial.open().then(initiateSerial);

    // once the port opens, let the user know:
    function initiateSerial() {
        console.log("port open");
        serial.print("x");
    }
    // hide the port button once a port is chosen:
    if (portButton) portButton.hide();
}

// pop up an alert if there's a port error:
function portError(err) {
    alert("Serial port error: " + err);
}

// try to connect if a new serial port 
// gets added (i.e. plugged in via USB):
function portConnect() {
    console.log("port connected");
    serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
    serial.close();
    console.log("port disconnected");
}