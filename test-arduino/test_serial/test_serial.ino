#include <Adafruit_NeoPixel.h>

/*

{"action":"ambient"}
{"action":"ambient","r":20,"g":5,"b":5}
{"action":"sequence","id":"2"}
{"action":"sequence","id":"2","time_scale":"0.6"}

RGB :
  0 -> 255

Sequences :
  1  = RGB
  2  = Warning
  3  = Snake
  4  = k2000
  5  = Rainbow
  6  = Fire
  7  = Ocean
  8  = Glamor
  9  = Every Colors
  10 = Thunder

*/

#define PIN 6
#define LEN 60

Adafruit_NeoPixel strip = Adafruit_NeoPixel(LEN, PIN, NEO_GRB + NEO_KHZ800);

byte i = 0;
byte j = 0;
byte k = 0;

byte  sequence   = 8;
float time_scale = 1;

byte mode;
char input_data[255];
char input_parameter[255];
char input_value[255];
char input_char;
String input_action = "";
byte   input_r;
byte   input_g;
byte   input_b;
byte   input_id;
float  input_time_scale;

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
        // Store each car in input_data
        input_char = Serial.read();
        input_data[i] = input_char;
        i++;

        // End of object
        if(input_char == '}')
        {
            handle_input(input_data,i);
        }
    }
    
    if(sequence != 1)
        play_sequence();
}

void play_sequence()
{
    double time = millis();
    time = time / time_scale;
    
    double value = 0;
    double led_ratio = 0;
    byte rgb[3];
    rgb[0] = 0;
    rgb[1] = 0;
    rgb[2] = 0;
    double hsl[3];
    hsl[0] = 0;
    hsl[1] = 0;
    hsl[2] = 0;
    
    //rgb_converter.hslToRgb(0.5,0.5,0.5,rgb);
    
    switch(sequence)
    {
        // Warning (OK)
        case 2 :
            value  = time / 100;
            value  = sin(value) / 2 + 0.5;
            rgb[0] = round(value * 255);
            
            set_strip_color(rgb[0],rgb[1],rgb[2]);
            break;
            
        // Snake (OK)
        case 3 :
            value  = time / 1000;
            value  = fmod(value,1);

            for(k = 0; k < LEN; k++)
            {
                led_ratio = (double)k / (double)LEN;

                if(fabs(led_ratio - value) < 0.1 || fabs(led_ratio - value) > 0.9)
                    strip.setPixelColor(k,strip.Color(255,255,255));                    
                else
                    strip.setPixelColor(k,strip.Color(0,0,0));

            }
            
            strip.show();
            
            break;
            
        // k2000 (OK)
        case 4 :
            value  = time / 2000;
            value = fmod(value,1);
            value = fabs(value * 2 - 1);

            for(k = 0; k < LEN; k++)
            {
                led_ratio = ((double)k / (double)LEN) * 1.2 - 0.1;

                if(fabs(led_ratio - value) < 0.1)
                    strip.setPixelColor(k,strip.Color(255,0,0));                    
                else
                    strip.setPixelColor(k,strip.Color(0,0,0));

            }
            
            strip.show();
            
            break;
            
        // Rainbow (OK)
        case 5 :
            value = time / 2000;
            for(k = 0; k < LEN; k++)
            {
                led_ratio = (double)k / (double)LEN;
                hsl[0] = fmod(led_ratio + value,1);
                hsl[1] = 1;
                hsl[2] = 0.5;
                hslToRgb(hsl[0],hsl[1],hsl[2],rgb);
                strip.setPixelColor(k,strip.Color(rgb[0],rgb[1],rgb[2]));
            }
            
            strip.show();
            
            break;
            
        // Fire (OK)
        case 6 :
            for(k = 0; k < LEN; k++)
            {
                led_ratio = (double)k / (double)LEN;
                
                value = time / 200;
                value = sin(value + led_ratio * 10) * 0.5 + 0.5;
                value = value * 0.08;
                
                hsl[0] = fmod(value,1);
                hsl[1] = 1;
                hsl[2] = 0.5;
                hslToRgb(hsl[0],hsl[1],hsl[2],rgb);
                strip.setPixelColor(k,strip.Color(rgb[0],rgb[1],rgb[2]));
            }
            
            strip.show();
            
            break;
            
        // Ocean (OK)
        case 7 :
            for(k = 0; k < LEN; k++)
            {
                led_ratio = (double)k / (double)LEN;
                
                value = time / 400;
                value = sin(value + led_ratio * 2) * 0.5 + 0.5;
                value = value * 0.14 + 0.45;
                
                hsl[0] = fmod(value,1);
                hsl[1] = 1;
                hsl[2] = 0.5;
                hslToRgb(hsl[0],hsl[1],hsl[2],rgb);
                strip.setPixelColor(k,strip.Color(rgb[0],rgb[1],rgb[2]));
            }
            
            strip.show();
            
            break;
            
        // Glamor (OK)
        case 8 :
            for(k = 0; k < LEN; k++)
            {
                led_ratio = (double)k / (double)LEN;
                
                value = time / 400;
                value = sin(value + led_ratio * 4) * 0.5 + 0.5;
                value = value * 0.08 + 0.9;
                
                hsl[0] = fmod(value,1);
                hsl[1] = 1;
                hsl[2] = 0.5;
                hslToRgb(hsl[0],hsl[1],hsl[2],rgb);
                strip.setPixelColor(k,strip.Color(rgb[0],rgb[1],rgb[2]));
            }
            
            strip.show();
            
            break;
            
        // Every Color (OK)
        case 9 :
            value = time / 10000;
            value = fmod(value,1);
            
            for(k = 0; k < LEN; k++)
            {
                led_ratio = (double)k / (double)LEN;
                
                hsl[0] = fmod(value,1);
                hsl[1] = 1;
                hsl[2] = 0.5;
                hslToRgb(hsl[0],hsl[1],hsl[2],rgb);
                strip.setPixelColor(k,strip.Color(rgb[0],rgb[1],rgb[2]));
            }
            
            strip.show();
            
            break;
            
        // Thunder (WIP)
        case 10 :
            value = time / 1000;
            value = (abs(sin(value)) + abs(cos(value * 3.4)) + abs(sin(value * 12.8)) + abs(cos(value * 27.9)))/4;
            
            float value2 = fmod(time / 1000,1);
            
            for(k = 0; k < LEN; k++)
            {
                led_ratio = (double)k / (double)LEN;
                
                if(value > 0.9 && (fabs(led_ratio - value2) < 0.1 || fabs(led_ratio - value2) > 0.9))
                    strip.setPixelColor(k,strip.Color(100,100,100));
                else
                    strip.setPixelColor(k,strip.Color(0,0,0));
            }
            
            strip.show();
            
            break;
    }
    
}

void hslToRgb(double h, double s, double l, byte rgb[]) {
  double r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    double q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
    double p = 2 * l - q;
    r = hue2rgb(p, q, h + 1.0 / 3.0);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1.0 / 3.0);
  }

  rgb[0] = r * 255;
  rgb[1] = g * 255;
  rgb[2] = b * 255;
}

double hue2rgb(double p, double q, double t) {
  if (t < 0) t += 1;
  if (t > 1.0) t -= 1;
  if (t < 1.0 / 6.0) return p + (q - p) * 6.0 * t;
  if (t < 1.0 / 2.0) return q;
  if (t < 2.0 / 3.0) return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
  return p;
}

void handle_action()
{
    if(input_action == "ambient")
    {
        sequence = 1;
        set_strip_color(input_r,input_g,input_b);
    }
    else if(input_action == "sequence")
    {
        if(input_id >= 1 && input_id <= 10)
        {
            sequence = input_id;
        }
        
        if(input_time_scale != 0)
            time_scale = input_time_scale;
    }
}

void handle_input(char* value, byte len)
{
    i = 0;
    for(;i < len; i++)
    {
        input_char = value[i];
        
        // Start of object
        if(input_char == '{')
        {
            mode = 0;
            j    = 0;
            
            // Reset parameter and value
            memset(input_parameter, 0, sizeof(input_parameter));
            memset(input_value, 0, sizeof(input_value));
            input_time_scale = 0;
        }
        
        // Other couple
        else if(input_char == ',' || input_char == '}')
        {
            mode = 0;
            j    = 0;
            
            if(strcmp(input_parameter,"action") == 0)
                input_action = input_value;
            else if(strcmp(input_parameter,"id") == 0)
                input_id = (byte) strtol(input_value, NULL, 10);
            else if(strcmp(input_parameter,"r") == 0)
                input_r = (byte) strtol(input_value, NULL, 10);
            else if(strcmp(input_parameter,"g") == 0)
                input_g = (byte) strtol(input_value, NULL, 10);
            else if(strcmp(input_parameter,"b") == 0)
                input_b = (byte) strtol(input_value, NULL, 10);
            else if(strcmp(input_parameter,"time_scale") == 0)
                input_time_scale = (float) atof(input_value);
            
            // Reset parameter and value
            memset(input_parameter, 0, sizeof(input_parameter));
            memset(input_value, 0, sizeof(input_value));

            // End of object
            if(input_char == '}')
            {
                input_char = ' ';
                handle_action();
            }
        }
        
        // Value
        else if(input_char == ':')
        {
            mode = 1;
            j    = 0;
        }
        
        // Value
        else if(input_char != '"')
        {
            if(mode == 0)
            {
                input_parameter[j] = input_char;
                j++;
            }
            else if(mode == 1)
            {
                input_value[j] = input_char;
                j++;
            }
        }
    }
}

byte clamp(byte value, byte min_value = 0, byte max_value = 255)
{
    if(value < min_value)
        value = min_value;
        
    if(value > max_value)
        value = max_value;
        
    return value;
}

void set_strip_color(byte r_value, byte g_value, byte b_value)
{
    for(k = 0; k < LEN; k++)
       strip.setPixelColor(k,strip.Color(clamp(r_value),clamp(g_value),clamp(b_value)));
    
    strip.show();
}
