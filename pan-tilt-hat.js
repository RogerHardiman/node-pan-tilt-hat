//
// Node Wrapper for Pimoroni Pan-Tilt HAT
// (c) Roger Hardiman 2017
//
// This class presents a traditional set of 'continuous move' PTZ controls
// with commands to start panning, start tilting and to stop the camera
// which mirror what older analogue CCTV cameras had.
// Commands to move the camera have a speed parameter in the range 0 to 15

// To control the Pan-Tilt HAT this Node class spawns a python program
// and then uses a very simple ASCII messaging passing protocol to
// send messages to the Python program which uses Pimoroni's python library

var spawn = require('child_process').spawn;
var path = require('path');

class PanTiltHAT {

  constructor() {
    this.pan_position = 0;
    this.tilt_position = 0;
    this.pan_speed = 0;
    this.tilt_speed = 0;
    this.parent = this;
    this.python = null;

    // start timer
    setInterval(this.calculate_angles.bind(this),100);
  }

  calculate_angles() {
    console.log('pan=' + this.pan_position + ' tilt=' + this.tilt_position);
    this.pan_position = this.pan_position + (this.pan_speed/10);
    this.tilt_position = this.tilt_position + (this.tilt_speed/10);
    if (this.pan_position > 90) this.pan_position = 90;
    if (this.pan_position < -90) this.pan_position = -90;
    if (this.tilt_position > 80) this.tilt_position = 80;
    if (this.tilt_position < -80) this.tilt_position = -80;

    // call the python code which uses the Pimoroni Python Library
    if (this.python === null) {
      this.python = spawn('python', [path.join(__dirname, '/bin/node-pantilthat.py')]);
    }
    this.python.stdin.write('goto '+ Math.round(this.pan_position) + ' ' + Math.round(this.tilt_position) + '\n');
  }

  pan_left(speed) {
    if (speed > 15) speed = 15;
    this.pan_speed = -speed;
  }

  pan_right(speed) {
    if (speed > 15) speed = 15;
    this.pan_speed = speed;
  }

  tilt_up(speed) {
    if (speed > 15) speed = 15;
    this.tilt_speed = speed;
  }

  tilt_down(speed) {
    if (speed > 15) speed = 15;
    this.tilt_speed = -speed;
  }

  stop() {
    this.pan_velocity = 0;
    this.tilt_velocity = 0;
  }

  goto_home() {
    this.pan_velocity = 0;
    this.tilt_velocity = 0;
    this.pan_position = 0;
    this.tilt_position = 0;
  }


}

module.exports = PanTiltHAT;

