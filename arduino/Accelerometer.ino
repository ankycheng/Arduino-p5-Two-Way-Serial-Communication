
/*
  Arduino LSM6DS3 - Simple Accelerometer

  This example reads the acceleration values from the LSM6DS3
  sensor and continuously prints them to the Serial Monitor
  or Serial Plotter.

  The circuit:
  - Arduino Uno WiFi Rev 2 or Arduino Nano 33 IoT

  created 10 Jul 2019
  by Riccardo Rizzo

  This example code is in the public domain.
*/

#include <Arduino_LSM6DS3.h>

const int buttonPin = 2;  // digital input
const int ledPin = 5;
int lastBtnClickTime = 0;
int ledLightTime = 0;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);

  while (!Serial)
    ;

  // set up IMU
  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");

    while (1)
      ;
  }

  Serial.print("Accelerometer sample rate = ");
  Serial.print(IMU.accelerationSampleRate());
  Serial.println(" Hz");
  Serial.println();
  Serial.println("Acceleration in g's");
  Serial.println("X\tY\tZ");

  // Set up connection with p5
  while (Serial.available() <= 0) {
    Serial.println("hello");  // send a starting message
    delay(300);               // wait 1/3 second
  }
}

void loop() {
  float x, y, z;

  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z);

    Serial.print(x);
    Serial.print(',');
    // Serial.print('\t');
    Serial.print(y);
    Serial.print(',');
    // Serial.print('\t');
    Serial.print(z);
    Serial.print(',');
    // Serial.println(z);

    int btnValue = digitalRead(buttonPin);
    if(!btnValue && millis() - lastBtnClickTime > 300){
      lastBtnClickTime = millis();
      Serial.println(1);
    }else{
      Serial.println(0);
    }
  } 


  if (Serial.available() > 0){
    int inByte = Serial.read();
    // Serial.println(inByte);
    if (inByte == 'b') {     // if it's a capital H (ASCII 72),
      digitalWrite(ledPin, HIGH);
      ledLightTime = millis();
    }
  }

  if(millis() - ledLightTime> 100){
    digitalWrite(ledPin, LOW);
  }

  // if (Serial.available() > 0) {
  //   // read the incoming byte:
  //   int inByte = Serial.read();
  //   // read the sensor:
  //   sensorValue = analogRead(A0);
  //   // print the results:
  //   Serial.print(sensorValue);
  //   Serial.print(",");

  //   // read the sensor:
  //   sensorValue = analogRead(A1);
  //   // print the results:
  //   Serial.print(sensorValue);
  //   Serial.print(",");

  //   // read the sensor:
  //   sensorValue = digitalRead(buttonPin);
  //   // print the results:
  //   Serial.println(sensorValue);
  // }
}