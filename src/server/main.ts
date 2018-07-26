
import * as ws from "ws";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import {SerialController} from "./SerialController";

const app = express();
const serial = new SerialController();
var retData:any = null

serial.OnData = (data:any) => {
  console.log(data);
  retData = data;
}; 


app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text());

app.use("/static", express.static("dist/client"));

app.get("/", (req: any,res: any,next: any) =>{
  //res.send("Hello world");
  express.static("dist/client")(req,res,next);
});

app.post("/data", (req: any,res: any) =>{
  if(serial.isConnected === false){
    res.send({
      status: false,
      dataStat: false
    });
  }
  else{
    if(retData == null){
      res.send({
        status: true,
        dataStat: false,
      });
    }
    else{
      res.send({
        status: true,
        dataStat: true,
        data: retData,
      });
    }
  }
});


let httpServer = app.listen(8000, () => {
  console.log("listening");
});