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
#  Copyright (c) 2017 Roger Hardiman
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

import pantilthat 
import sys

sys.stdout.write('Valid commands are\n');
sys.stdout.write('pan angle\n');
sys.stdout.write('tilt angle\n');
sys.stdout.write('goto angle angle\n');
sys.stdout.write('exit\n');

while True:
    line = sys.stdin.readline();
    list = line.split();

    if (len(list) >= 1):
        command = list[0];
 
        if (command == 'pan' and len(list)>=2):
            pantilthat.pan(int(list[1]));
        elif (command == 'tilt' and len(list)>=2):
            pantilthat.tilt(int(list[1]));
        elif (command == 'goto' and len(list)>=3):
            pantilthat.pan(int(list[1]));
            pantilthat.tilt(int(list[2]));
        elif (command == 'exit'):
            exit();

