#!/usr/bin/env python
#
#  pan-tilt-hat.py
#  Pan-Tilt HAT Python backend
#
#  Created by Roger Hardiman 10th May 2017
#  Copyright (c) 2017 Roger Hardiman. All rights reserved.
#

#  The MIT License (MIT)
#
#  Copyright (c) 2017, 2018 Roger Hardiman
#
#  Permission is hereby granted, free of charge, to any person obtaining a copy
#  of this software and associated documentation files (the "Software"), to deal
#  in the Software without restriction, including without limitation the rights
#  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#  copies of the Software, and to permit persons to whom the Software is
#  furnished to do so, subject to the following conditions:
#
#  The above copyright notice and this permission notice shall be included in all
#  copies or substantial portions of the Software.
#
#  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
#  SOFTWARE.

import sys

try:
    import pantilthat
    hat_module_loaded = True
except ImportError:
    hat_module_loaded = False 
    print('ERROR: pantilthat module not installed on this computer');

print('Valid commands are');
print('  pan angle');
print('  tilt angle');
print('  goto angle angle');
print('  get_pan');
print('  get_tilt');

# New commands for Neopixel
print('  light_type');
print('  light_mode');
print('  brightness');
print('  set_pixel index red green blue white=None')
print('  set_all red green blue white=None')
print('  show');

print('  exit');

while True:
    line = sys.stdin.readline();
    list = line.split();

    if (len(list) >= 1):
        command = list[0];
 
        if (command == 'exit'):
            exit();
        else:
	    try:
                if (command == 'pan' and len(list)>=2):
                    pantilthat.pan(float(list[1]));
                elif (command == 'tilt' and len(list)>=2):
                    pantilthat.tilt(float(list[1]));
                elif (command == 'goto' and len(list)>=3):
                    pantilthat.pan(float(list[1]));
                    pantilthat.tilt(float(list[2]));
                elif (command == 'get_pan'):
                    print(pantilthat.get_pan());
                elif (command == 'get_tilt'):
                    print(pantilthat.get_tilt());
                elif( command == 'light_type' and len(list)>=2):
                    pantilthat.light_type();
                    if( list[1] == 'RGB' ):
                        pantilthat.light_mode(pantilthat.RGB);
                    elif( list[1] == 'GRB' ):
                        pantilthat.light_mode(pantilthat.GRB);
                    elif( list[1] == 'RGBW' ):
                        pantilthat.light_mode(pantilthat.RGBW);
                    elif( list[1] == 'GRBW' ):
                        pantilthat.light_mode(pantilthat.GRBW);
                    else:
                        print('error: light_mode requires parameter PWM or WS2812'); 
                elif( command == 'light_mode' and len(list)>=2):
                    if( list[1] == 'PWM' ):
                        pantilthat.light_mode(pantilthat.PWM);
                    elif( list[1] == 'WS2812' ):
                        pantilthat.light_mode(pantilthat.WS2812);
                    else:
                        print('error: light_mode requires parameter PWM or WS2812'); 
                if (command == 'brightness' and len(list)>=2):
                    pantilthat.brightness(float(list[1]));
                elif( command == 'set_all' and len(list)==4):
                        pantilthat.set_all(int(list[1]), int(list[2]), int(list[3]));
                elif( command == 'set_all' and len(list)==5):
                        pantilthat.set_all(int(list[1]), int(list[2]), int(list[3]), int(list[4]));
                elif( command == 'set_pixel' and len(list)==5):
                        pantilthat.set_pixel(int(list[1]), int(list[2]), int(list[3]), int(list[4]));
                elif( command == 'set_pixel' and len(list)==6):
                        pantilthat.set_pixel(int(list[1]), int(list[2]), int(list[3]), int(list[4]), int(list[5]));
                elif( command == 'show'):
                        pantilthat.show();
                else:
                    print('error processing command'); 
            except:
                print('error processing command'); 


