function mouseDragged() {
    // map the mouseY to a range from 0 to 255:
    outByte = byte(map(mouseY, 0, height, 0, 255));
    // send it out the serial port:
    serial.write(outByte);
}

// function keyPressed() {
//     if (key >= 0 && key <= 9) {
//         // if the user presses 0 through 9
//         outByte = byte(key * 25); // map the key to a range from 0 to 225
//         serial.write(outByte); // send it out the serial port
//     }
//     if (key === "H" || key === "L") {
//         // if the user presses H or L
//         serial.write(key); // send it out the serial port
//     }
// }

function keyPressed(e) {
    if (e.key == 'g') {
        // console.log(ground)
    } else {
        addNew();
    }
}

function mousePressed() { // screen coordinates
    if (mouseX < 110 && (mouseY > 75 && mouseY < 105)) init();
    if (mouseX < 110 && (mouseY > 110 && mouseY < 140)) addNew();
}