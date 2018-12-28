// Test Node-Pan-Tilt-HAT library
// Tests Absolution Position API
// and the Continual Move API
// Copyright (c) Roger Hardiman 2017

var PanTiltHAT = require('../pan-tilt-hat.js');
var flow       = require('nimble');

var pan_tilt = new PanTiltHAT();

// Use Nimble's Series pattern to run one function after another
// Delays between commands are implemented with a setTimeout

flow.series([
    // TEST - Goto Position
    function(completion_callback) {
        console.log('Goto position Pan Left +70, Tilt Up -70');
        pan_tilt.pan(+70);
        pan_tilt.tilt(-70);
        completion_callback();
    },

    // TEST - Start Continual Move
    function(completion_callback) {
        console.log('Start continual move (down, left)');
        pan_tilt.pan_right(5);
        pan_tilt.tilt_down(2);
        completion_callback();
    },

    // TEST - Wait 3 seconds	
    function (completion_callback) {
        console.log('Wait 3 seconds');
        setTimeout(function () { completion_callback(); }, 3000);
    },

    // TEST - Stop
    function (completion_callback) {
        console.log('Stop');
        pan_tilt.stop();
        completion_callback();
    },

    // TEST - Goto Position
    function(completion_callback) {
        console.log('Goto position Pan Left +70, Tilt Up -70');
        pan_tilt.pan(+70);
        pan_tilt.tilt(-70);
        completion_callback();
    },

    // TEST - Start Continual Move
    function(completion_callback) {
        console.log('Start continual move (down, left)');
        pan_tilt.pan_right(15);
        pan_tilt.tilt_down(15);
        completion_callback();
    },

    // TEST - Wait 3 seconds	
    function (completion_callback) {
        console.log('Wait 3 seconds');
        setTimeout(function () { completion_callback(); }, 3000);
    },

    // TEST - Stop
    function (completion_callback) {
        console.log('Stop');
        pan_tilt.stop();
        completion_callback();
    },

    // TEST - Exit 
    function (completion_callback) {
        console.log('Close PanTiltHat class');
        pan_tilt.close();
        completion_callback();
    },

]);

