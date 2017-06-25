var express = require('express');
var app = express();
var operate = require('./operate.js').operate;

app.get('/operate', function (req, res){
    var pin = req.query['pin'];
    var switchposition = req.query['switchposition'];

    try {
        operate(switchposition);
        res.end("the code got here alright!");
    } catch (error) {
        res.end("Big fat error!");
    }    
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
