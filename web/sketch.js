// https://openprocessing.org/sketch/905713

// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();
// console.log(serial)

// HTML button object:
let portButton;
let inData; // for incoming serial data
let outData; // for outgoing data

// variables for the circle to be drawn:
let locH, locV;
let circleColor = 255;

let x=0,y=0,z=0

var gfr = 0,
    f;

var world, ground, cam, timerId,
    lastTime, fixedTimeStep = 1 / 10,
    maxSubSteps = 3,
    state = { // for EasyCam
        distance: 800,
        center: [0, 0, 0],
        rotation: [0.8204732385702833,
            0.4247082002778669,
            -0.17591989660616117,
            0.33985114297998736
        ]
    };

var pFill = [
        [63, 63, 63],
        [118, 83, 95],
        [255, 96, 0],
        [171, 45, 0],
        [255, 211, 82]
    ],
    pStroke = [
        [22, 22, 22],
        [60, 41, 46],
        [127, 48, 0],
        [65, 22, 0],
        [127, 105, 41]
    ];


function preload() {
    f = loadFont('https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf');
}

function setup() {
    // createCanvas(400, 300); // make the canvas

    createCanvas(windowWidth/2, windowHeight/2, WEBGL);
    smooth();
    //cam = createEasyCam({distance:1000});
    cam = createSimpleCam();
    cam.zoom = new Damp(800, -5, 0.07, [-600, 1000]); // adjust zoom
    cam.rx = new Damp(PI / 4, 0.01, 0.07, [PI / 4 - PI / 2, PI / 4 + PI / 2]); // set initial X rotation
    // cam.ry = new Damp(2 * PI / 3, 0.01, 0.07, [2 * PI / 3 - PI, 2 * PI / 3 + PI]); // set initial Z rotation
    cam.ry = new Damp(PI / 3, 0.01, 0.07, [PI / 3 - PI, PI / 3 + PI]); // set initial Z rotation
    
    //cam.setState(state, 2000);
    //cam.state_reset = state; // state to use on reset
    background(0);
    init();
    textFont(f);
    textSize(24);
    frameRate(30);
    // frameRate(1);

    // check to see if serial is available:
    if (!navigator.serial) {
        alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
    }
    // if serial is available, add connect/disconnect listeners:
    navigator.serial.addEventListener("connect", portConnect);
    navigator.serial.addEventListener("disconnect", portDisconnect);
    // check for any ports that are available:
    serial.getPorts();

    // if there's no port chosen, choose one:
    serial.on("noport", makePortButton);
    // open whatever port is available:
    serial.on("portavailable", openPort);
    // handle serial errors:
    serial.on("requesterror", portError);
    // handle any incoming serial data:
    serial.on("data", serialEvent);
    serial.on("close", makePortButton);
    // console.log(serial)
}

function draw() {
    clear();
    background(128); // black background
    drawShapes()
}