//
// Node Wrapper for Pimoroni Pan-Tilt HAT
// Copyright (c) Roger Hardiman 2017
// Copyright (c) 2018 Casper Meijn
//
// PIMORONI API (ABSOLUTE POSITIONING)
// The APIs implemented are
//   servo_one(angle),               // angle between -90 and 90
//   pan(angle),                     // angle between -90 and 90
//   servo_two(angle),               // angle between -90 and 90
//   tilt(angle)                     // angle between -90 and 90
//
// CONTINUOUS MOVE API (START AND STOP COMMANDS)
// The class also implements a 'continuous move' API where the Pan/Tilt HAT is
// told to move (direction and speed provided) and the Pan/Tilt HAT continues
// moving until a Stop command (or zero speed command) is issued.
// This mirrors the type of functions on old analogue CCTV cameras.
//   pan_left(speed)                 // speed from 0 to 15. 0 means stop
//   pan_right(speed)                // speed from 0 to 15. 0 means stop
//   tilt_up(speed)                  // speed from 0 to 15. 0 means stop
//   tilt_down(speed)                // speed from 0 to 15. 0 means stop
//   stop()                          // stop the pan and the tilt
//
// DEPENDENCIES (PYTHON AND PIMORONI PYTHON LIBARY)
// To control the Pan-Tilt HAT this Node class spawns a Python program
// and then uses a very simple ASCII messaging passing protocol to
// send messages to the Python program which uses Pimoroni's python library
// So you must have Python installed and in your PATH

var spawn = require('child_process').spawn;
var path = require('path');

class PanTiltHAT {

  constructor() {
    this.python = null;
    this.parent = this;

    // current position (used for continuous move API)
    this.pan_position = 0;
    this.tilt_position = 0;

    // current speed (used for continuous move API)
    this.pan_speed = 0;
    this.tilt_speed = 0;

    // start timer, used for Continuous Move API
    this.timer = setInterval(this.calculate_angles.bind(this),100);
  }

  // Move Servo One to 'angle'
  servo_one(angle) {
    this.pan_position = angle;
    if (this.pan_position > 90) this.pan_position = 90;
    if (this.pan_position < -90) this.pan_position = -90;
    this.pan_speed = 0;
    this.python_command('pan '+ Math.round(this.pan_position) +'\n');
  }

  // Move Servo Two to 'angle'
  servo_two(angle) {
    this.tilt_position = angle;
    if (this.tilt_position > 80) this.tilt_position = 80;
    if (this.tilt_position < -80) this.tilt_position = -80;
    this.tilt_speed = 0;
    this.python_command('tilt '+ Math.round(this.tilt_position) +'\n');
  }

  // Alias for Servo One and Servo Two 
  pan(angle)  { this.servo_one(angle); };
  tilt(angle) { this.servo_two(angle); };
  goto_home() { this.pan(0); this.tilt(0); };

  python_command(command_string) {
    if (this.python === null) {
      this.python = spawn('python', [path.join(__dirname, '/bin/node-pantilthat.py')]);
    }
    if (this.python != null) {
//      console.log(command_string);
      this.python.stdin.write(command_string);
    }
  }

  // calculate new angle for continuous move API using current position
  // and current speed
  calculate_angles() {
    if (this.pan_speed === 0 && this.tilt_speed === 0) return;
    var new_pan_position = this.pan_position + (this.pan_speed/10);
    var new_tilt_position = this.tilt_position + (this.tilt_speed/10);
    // range check
    if (new_pan_position > 90) new_pan_position = 90;
    if (new_pan_position < -90) new_pan_position = -90;
    if (new_tilt_position > 80) new_tilt_position = 80;
    if (new_tilt_position < -80) new_tilt_position = -80;

//    console.log('new pan=' + new_pan_position + ' new tilt=' + new_tilt_position);
    // call the python code which uses the Pimoroni Python Library
    // stop any continuous move
    if (new_pan_position != this.pan_position) {
      this.pan_position = new_pan_position;
      this.python_command('pan '+ Math.round(this.pan_position)+'\n');
    }
    if (new_tilt_position != this.tilt_position) {
      this.tilt_position = new_tilt_position;
      this.python_command('tilt '+ Math.round(this.tilt_position)+'\n');
    }
  }


  pan_left(speed) {
    if (speed > 15) speed = 15;
    if (speed < 0) speed = 0;
    this.pan_speed = speed;
  }

  pan_right(speed) {
    if (speed > 15) speed = 15;
    if (speed < 0) speed = 0;
    this.pan_speed = -speed;
  }

  tilt_up(speed) {
    if (speed > 15) speed = 15;
    if (speed < 0) speed = 0;
    this.tilt_speed = -speed;
  }

  tilt_down(speed) {
    if (speed > 15) speed = 15;
    if (speed < 0) speed = 0;
    this.tilt_speed = speed;
  }

  stop() {
    this.pan_speed = 0;
    this.tilt_speed = 0;
  }

  close() {
    clearTimeout(this.timer);
    this.timer = null;
    if (this.python != null) {
      this.python_command('exit\n');
      this.python = null;
    }
  }

}

module.exports = PanTiltHAT;

