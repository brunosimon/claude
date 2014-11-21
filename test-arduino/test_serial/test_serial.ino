/*
{"action":"ambient"}
{"action":"ambient","r":20,"g":5,"b":5}
{"action":"ambient","r":20,"g":5,"b":5,"a":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
*/

#include <Adafruit_NeoPixel.h>

#define PIN 6
#define LEN 60

Adafruit_NeoPixel strip = Adafruit_NeoPixel(LEN, PIN, NEO_GRB + NEO_KHZ800);

byte mode;
char inData[255];
char parameter[255];
char value[255];
char inChar;
byte i = 0;
byte j = 0;
byte k = 0;

String action = "";
int r;
int g;
int b;

void setup()
{
  // Serial
  Serial.begin(9600);
  
  // Strip
  strip.begin();
  strip.show();
}

void loop()
{
    // Serial data incoming
    while(Serial.available() > 0)
    {
        // Store each car in inData
        inChar = Serial.read();
        inData[i] = inChar;
        i++;

        // End of object
        if(inChar == '}')
        {
            handle_input(inData,i);
        }
    }
}

void handle_action()
{
      if(action == "ambient")
      {
          set_strip_color(r,g,b);
      }
}

void handle_input(char* input_value, byte len)
{
    i = 0;
    for(;i < len; i++)
    {
        inChar = input_value[i];
        
        // Start of object
        if(inChar == '{')
        {
            mode = 0;
            j    = 0;
            
            // Reset parameter and value
            memset(parameter, 0, sizeof(parameter));
            memset(value, 0, sizeof(value));
        }
        
        // Other couple
        else if(inChar == ',' || inChar == '}')
        {
            mode = 0;
            j    = 0;
            
            if(strcmp(parameter,"action") == 0)
                action = value;
            else if(strcmp(parameter,"r") == 0)
                r = (int) strtol(value, NULL, 10);
            else if(strcmp(parameter,"g") == 0)
                g = (int) strtol(value, NULL, 10);
            else if(strcmp(parameter,"b") == 0)
                b = (int) strtol(value, NULL, 10);
            
            // Reset parameter and value
            memset(parameter, 0, sizeof(parameter));
            memset(value, 0, sizeof(value));

            // End of object
            if(inChar == '}')
            {
                inChar = ' ';
                handle_action();
            }
        }
        
        // Value
        else if(inChar == ':')
        {
            mode = 1;
            j    = 0;
        }
        
        // Value
        else if(inChar != '"')
        {
            if(mode == 0)
            {
                parameter[j] = inChar;
                j++;
            }
            else if(mode == 1)
            {
                value[j] = inChar;
                j++;
            }
        }
    }
}

int clamp(int value, int min_value = 0, int max_value = 255)
{
    if(value < min_value)
        value = min_value;
        
    if(value > max_value)
        value = max_value;
        
    return value;
}

void set_strip_color(int r_value, int g_value, int b_value)
{
    k = 0;
    for(; k < LEN; k++)
    {
       strip.setPixelColor(k,strip.Color(clamp(r_value),clamp(g_value),clamp(b_value)));
    }
    
    strip.show();
}
