#include <ArduinoJson.h>
#include <ESP8266WiFi.h>                // Include the Wi-Fi library
#include <ESP8266HTTPClient.h>
#include <max6675.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <WiFiClientSecure.h>

//MQTT
#include <CayenneMQTTESP8266.h>
#define CAYENNE_DEBUG
#define CAYENNE_PRINT Serial

//Pin
int ktcSO=12; //GPIO 12 D6
int ktcCS=13; //GPIO 13 D7
int ktcCLK=14; // GPIO 14 D5

                             
MAX6675 ktc(ktcCLK,ktcCS, ktcSO);
LiquidCrystal_I2C  lcd(0x27,20,4);
//SCL is D1
//SDA is D2

//Declarations
const char* ssid     = "INSERT SSID HERE";         // The SSID (name) of the Wi-Fi network you want to connect to
const char* password = "INSERT PASSWORD HERE";                // The password of the Wi-Fi network

//Cayenne Authentication info. This should be obtained from the Cayenne Dashboard

char username[] = "c56067c0-4cf9-11ec-ad90-75ec5e25c7a4";
char mqtt_password[] = "e5786f446e971cf800527c1c3b6af64e922d1a5f";
char client_id[] = "717fab10-4cfa-11ec-9f5b-45181495093e";

WiFiClientSecure client;
void setup() {  
  Serial.begin(9600);                          // Start the Serial communication to send messages to the computer
  delay(500);
  lcd.init();                                   //Initialize lcd screen --
  lcd.backlight();                              //From LiquidCrystal_I2C library
 
  Serial.println('\n');
  WiFi.begin(ssid, password);                   // Connect to the network
  Serial.print("Connecting to ");
  Serial.print(ssid); Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) {        // Wait for the Wi-Fi to connect
    delay(1000);
    Serial.print(++i); Serial.print(' ');


  Cayenne.begin(username, mqtt_password, client_id, ssid, password);
    
  }

  Serial.println('\n');
  Serial.println("Connection established!");  
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());                // Send the IP address of the ESP8266 to the computer
}

void loop() { 

  if (WiFi.status() == WL_CONNECTED) {        //Check WiFi connection status
  
    float tempData = ktc.readCelsius();        //converts data into float digits
    
    lcd.print("C= ");                              
    lcd.print(ktc.readCelsius());                  
    lcd.setCursor(0, 0);   

    Serial.print("C = ");
    Serial.print(ktc.readCelsius());
    Serial.print("\t");
                              
    Cayenne.virtualWrite(1, tempData, TYPE_TEMPERATURE, UNIT_CELSIUS);    
  
    WiFiClient client;
    HTTPClient http;
   
    http.begin(client, "http://192.168.0.107/bioapi/v1/addtemp.php");  //Specify request destination
    http.addHeader("Content-Type","application/json");
    StaticJsonDocument<200> doc;
    doc["temp"] = tempData;

    String requestBody;
    serializeJson(doc, requestBody);
    int httpCode = http.POST(requestBody);
    
    if (httpCode > 0) { //Check the returning code
 
      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);             //Print the response payload
      Serial.println(tempData);    
    } else  {
        Serial.println("oops");
      }
    http.end();   //Close connection
   }   
  delay(10000);    //Send a request every 5 seconds
}
