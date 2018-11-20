

// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain

#include "DHT.h"
#include <Adafruit_NeoPixel.h>

#define DHTTYPE DHT11   // DHT 11

int DHTPins[] = {22,24,26,28};
DHT dhtSensors[4] = {DHT(DHTPins[0], DHTTYPE),DHT(DHTPins[1], DHTTYPE),DHT(DHTPins[2], DHTTYPE),DHT(DHTPins[3], DHTTYPE)};;

void setup() {
  Serial.begin(9600);
}

void loop() {
  // Wait a few seconds between measurements.
  if(Serial.available()){
    char buf[512];
    Serial.readBytes(buf, 126);
    //handle input
    Serial.write(buf);
    if(buf[0] = 'R'){
      Serial.write("<23,23,23,23,23,23,23,23>");
    }
  }
  
  /*delay(2000);
  
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  float h1 = dht1.readHumidity();

  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);
  float f1 = dht1.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(f)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  String endres = "";
  endres+=" "+String(h,2);
  endres+=" "+String(h1,2);
  endres+=", "+String(f,2);
  endres+=" "+String(f1,2)+"\n";

  char out[endres.length()];
  endres.toCharArray(out,endres.length());
  Serial.print("B");
  Serial.write(out);
  Serial.print("E");*/
}
