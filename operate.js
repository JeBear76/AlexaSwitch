var gpio = require('rpi-gpio');
var latchPin = 23;
var clockPin = 24;
var dataPin = 22;
var switches = [false,false, false, false, false, false, false, false];

gpio.setMode(gpio.MODE_BCM);
gpio.setup(latchPin, gpio.DIR_HIGH, null);
gpio.setup(clockPin, gpio.DIR_LOW, null);
gpio.setup(dataPin, gpio.DIR_LOW, null);

exports.operate = function(switchposition){
    for (var index = 0; index < switches.length; index++) {
        switches[index] = ((Math.pow(2, index) & switchposition) === Math.pow(2, index));        
    }
    updateShiftRegister();
}
 
function updateShiftRegister()
{
   gpio.write(latchPin, LOW);
   shiftOut(dataPin, clockPin, LSBFIRST, switches);
   gpio.write(latchPin, HIGH);
}

function shiftOut(){
    tick(clockPin);
    switches.forEach(function(element) {
        gpio.write(dataPin, element);
        tick(clockPin);
    }, this);
}

function tick(clockPin){
    gpio.write(clockPin, true);
    setTimeout(function(clockPin){
        gpio.write(clockPin, false);
    },0);
}