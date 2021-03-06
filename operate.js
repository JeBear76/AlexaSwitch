var gpio = require('rpi-gpio');
var latchPin = 23;
var clockPin = 24;
var dataPin = 22;
var switches = [false,false, false, false, false, false, false, false];

gpio.setMode(gpio.MODE_BCM);
gpio.setup(latchPin, gpio.DIR_OUT, function(){
    gpio.write(latchPin, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
});
gpio.setup(clockPin, gpio.DIR_OUT, function(){
    gpio.write(clockPin, false, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
});
gpio.setup(dataPin, gpio.DIR_OUT, function(){
    gpio.write(dataPin, false, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
});

exports.operate = function(switchposition){
    for (var index = 0; index < switches.length; index++) {
        switches[index] = !((Math.pow(2, index) & switchposition) === Math.pow(2, index));        
    }
    updateShiftRegister();
}
 
function updateShiftRegister()
{
    console.log(switches);
    tick(clockPin);
    shiftOut(dataPin, clockPin, switches);
}

function shiftOut(dataPin, clockPin, switches){
    tick(clockPin);
    for (var i = 0; i < switches.length; i++) {
        var element = switches[i];
        gpio.write(dataPin, element);
        console.log("dataPin " + element);
        tick(clockPin);
    }
}

function tick(clockPin){
    gpio.write(clockPin, true);
    console.log("clockPin true");
    gpio.write(latchPin, false);
    console.log("latchPin false");
    gpio.write(clockPin, false);
    console.log("clockPin false");
    gpio.write(latchPin, true);
    console.log("latchPin true");
}