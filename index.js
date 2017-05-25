var https = require('https'),                  // Module for https
    fs =    require('fs');                     // Required to read certs and keys

var options = {
    key:   fs.readFileSync('ssl/client-private.pem.key'),  // Secret client key
    cert:  fs.readFileSync('ssl/client-certificate.pem.crt'),  // Public client key
    host: "a15zvlrs746i9a.iot.us-east-1.amazonaws.com",                    // Server hostname
    port: 8443                                 // Server port
    method: "/topics/SwitchControl?qos=1"
};

var topic = 'SwitchControl'
var action = {pin:'23', switchposition:'1'};

callback = function(response) {
  var str = '';    
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

https.request(options, callback);
https.write(JSON.stringify(action));
https.end();