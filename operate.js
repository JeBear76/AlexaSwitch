var gpio = require('rpi-gpio');
gpio.setMode(gpio.MODE_BCM);

exports.operate = function(pin, switchposition){
        console.log(pin + ' ' + switchposition);
        gpio.setup(pin, gpio.DIR_OUT, function () { 
            gpio.write(pin, switchposition, function(err){
                if(err) throw err;
            })
        }); 
}