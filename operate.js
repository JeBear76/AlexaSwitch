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
        switches[index] = ((Math.pow(2, index) & switchposition) === Math.pow(2, index));        
    }
    updateShiftRegister();
}
 
function updateShiftRegister()
{
    console.log(switches);
    gpio.write(latchPin, false);
    tick(clockPin);
    gpio.write(latchPin, true);
    shiftOut(dataPin, clockPin, switches);
}

function shiftOut(dataPin, clockPin, switches){
    tick(clockPin);
    switches.forEach(function(element) {
        gpio.write(dataPin, element);
        setTimeout(function(clockPin){
            tick(clockPin);
        },1);
    }, this);
}

function tick(clockPin){
    gpio.write(clockPin, true);
    setTimeout(function(clockPin){
        gpio.write(clockPin, false);
    },1);
}