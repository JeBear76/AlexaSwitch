var express = require('express');
var app = express();
var operate = require('./operate.js').operate;

app.get('/operate', function (req, res){
    var pin = req.query['pin'];
    var switchposition = req.query['switchposition'];

    try {
        operate(pin, switchposition);
        res.end("pin " + pin + " set to " + switchposition);
    } catch (error) {
        res.end(error);
    }    
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
