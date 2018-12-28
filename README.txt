Node Pan-Tilt HAT library
(c) 2017, 2018 Roger Hardiman

This library provides an easy way for NodeJS applications to use the Raspberry Pi Pan-Tilt HAT (made by Pimoroni) with the AdaFruit Pan/Tilt assembly.
It spawns a background Python process to communicate with the Pan-Tilt HAT and this Python process make use of Pimoroni's Python libraries.
You must install Python and install the Pimoroni Pan-Tilt HAT Python libraries before using this code.

Use the close() function to close the spawned Python process. There was a design decision to keep the Python process running to avoid the overhead (and latency) caused by stopping and starting the Python script every time the camera has to move.

This library provides the following APIs
1) Pimoroni API
The library impements
   pan(angle)        - pan angle is -90..+90
   servo_one(angle)  - pan angle is -90..+90
   tilt(angle)       - tilt angle is -80..+80
   servo_two(angle)  - tilt angle is -80..+80
   goto_home()       - Set Pan to 0 and Tilt to 0

2) Continual Move API
The API is based on analogue CCTV systems where a command will start the pan
or tilt motors moving and the motors will continue to move until a stop() command
is issued.
The API commands are
  pan_left(speed)  - speed range is 0..15
  pan_right(speed) - speed range is 0..15
  tilt_up(speed)   - speed range is 0..15
  tilt_down(speed) - speed range is 0..15
  stop()
The library updates the pan and tilt position 10 times per second

3) An Exit API
  close() - used to close the spawned Python worker process and to stop an internal timer to allow NodeJS to terminate.


Applications
------------
The library is being used in the Raspbery Pi ONVIF Server project (RPOS) that
turns a Pi + Pi Camera + Pan-Tilt HAT + AdaFruit Pan/Tilt assembly
into an ONVIF Profile S CCTV Camera.

