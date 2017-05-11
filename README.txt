Node Pan-Tilt HAT library
(c) 2017 Roger Hardiman

This library provides an easy way for NodeJS applications to use the Raspberry Pi Pan-Tilt HAT (made by Pimoroni) with the AdaFruit Pan/Tilt
assembly.
It spawns a background python process to communicate with the Pan-Tilt HAT and this python process make use of Pimoroni's python libraries.
You must install python and install the Pimoroni Pan-Tilt HAT python libraries before using this code.

The low level python library used behind the scenes takes absolute position angles for the Pan and the Tilt positions.

Currently the library exposes a different type of API.
The API is based on analogue CCTV systems where a Pan Command will start the camera turning at a specified speed and the camera continues to turn until it receives a Stop Command (or a Pan command with speed 0).
Valid Speeds are 0 (for stop) and 1..15 for movement.
The API commands are
  pan_left(speed)
  pan_right(speed)
  tilt_up(speed)
  tilt_down(speed)
  stop()
  goto_home() 


The library is being used by Roger Hardiman's fork of RPOS.
RPOS started life as the Raspberry Pi ONVIF Server but now runs on more than
just the Raspberry Pi.
Roger Hardiman's fork fixes some bugs and adds ONVIF PTZ Control.

CCTV Viewing Software that uses the ONVIF Standard can connect to the
Raspberry Pi, stream live video and control the Pimoroni Pan-Tilt HAT and
AdaFruit Pan/Tilt assembly from their CCTV viewing software.




Future Additions
Adding the ability to store positions and return to that position
(this is Store Preset and Goto Preset or Set and Shot in CCTV terminology)
Adding the ability to use ONVIF Absolute PTZ commands

B

of the RPOS Raspberry Pi ONVIF Server and CCTV viewing software using the
industry standard ONVIF protocol can stream live video from the Raspberry Pi
and control the Pan-Tilt HAT with ONVIF PTZ commands.


This library implements Pan, Tilt and Stop commands like an old analogue CCTV
system. pan_left(speed) and pan_right(speed) start the camera moving.
The Pan/Tilt unit continues to move until a Stop() command is issued or a speed of zero is used.


Future Work
Would be nice to change this to support ONVIF Absolute Positioning
