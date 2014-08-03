#include <Adafruit_NeoPixel.h>

#define LEDS_LEN 60

Adafruit_NeoPixel strip = Adafruit_NeoPixel(LEDS_LEN, 6, NEO_GRB + NEO_KHZ800);

void setup()
{
    Serial.begin(9600);
    strip.begin();
    strip.show();
}

void loop()
{
    strip.show();

    if(Serial.available() > 0)
        process_incoming_byte();
}

void process_incoming_byte()
{
    // read the incoming byte:
    int incoming_byte = Serial.read();

    switch(incoming_byte)
    {
        // a
        case 97 :
            Serial.print("a");
            switch_all_off();
            strip.setPixelColor(0, strip.Color(255, 0, 0));
            break;
        // z
        case 122 :
            Serial.print("z");
            switch_all_off();
            strip.setPixelColor(1, strip.Color(0, 255, 0));
            break;
        // e
        case 101 :
            Serial.print("e");
            switch_all_off();
            strip.setPixelColor(2, strip.Color(0, 0, 255));
            break;
    }
}

void switch_all_off()
{
    for (int i = 0; i < strip.numPixels(); i++)
            strip.setPixelColor(i, 0);
}


