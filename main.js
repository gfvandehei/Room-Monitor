var SerialPort = require("serialport");
var ws = require("ws");
var express = require("express");
var app = express();

const readline = SerialPort.parsers.Readline;
const parser = new SerialPort.parsers.Readline("\n");
let receivedData = "";

app.get("/", (req,res,next) =>{
  express.static("./client")(req,res,next);
});

var serialPort = new SerialPort("COM5", {
  baudRate: 9600,
  // defaults for Arduino serial communication
   dataBits: 8, 
   parity: 'none', 
   stopBits: 1, 
   flowControl: false 
});

serialPort.on("open", function () {
  console.log('open');
	serialPort.on('data', function(data) { 
    receivedData += data.toString();
    if (receivedData.indexOf('E') >= 0 && receivedData.indexOf('B') >= 0) {
        // save the data between 'B' and 'E'
      sendData = receivedData.substring(receivedData .indexOf('B') + 1, receivedData.indexOf('E'));
      console.log(sendData);
      receivedData = '';
    }
      // send the incoming data to browser with websockets.
  });
});

let httpServer = app.listen(8000);

let wss = new ws.Server({server: httpServer});
wss.on('connection',(ws) =>{
  if(receivedData !== ""){

  }
});