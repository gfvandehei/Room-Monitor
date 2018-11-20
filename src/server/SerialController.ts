import * as SerialPort from "serialport";

export class SerialController{
    private serialList: string[];
    private serialPort: SerialPort;
    public OnData: (data: any) => void;
    private receivedData = "";
    private ardData:any = {
        Temperature: { //more might be added
            tmp1i: 0,
            tmp1o: 0,
            tmp2i: 0,
            tmp2o: 0,
            tmp3i: 0,
            tmp3o: 0,
            tmp4i: 0,
            tmp4o: 0
        }
    }

    public isConnected = false;

    constructor(){
        this.initSerial();
    }

    private async initSerial(){
        await this.getPorts();
        this.connectSerial();
        this.OnData(this.ardData);
    }

    private async getPorts(){
        let serialList: string[] = [];
        try{
            let ports: any[] = await SerialPort.list();
            console.log(ports);
            ports.forEach((port: any) =>{
                if(port.comName !== "COM1"){ //dont connect to windows port
                    serialList.push(port.comName);
                }
            });
            console.log(serialList);
        }
        catch(err){
            console.log(err);
        }

        this.serialList = serialList;
    }

    private handleData(data:any){
        let parsedData = this.getBuffArr(data); //makes an array of 
        //format the parsedData into the arduino json
        if(parsedData[0] === "TMP"){
            this.ardData.Temperature.tmp1i = parsedData[1];
            this.ardData.Temperature.tmp1o = parsedData[2];
            this.ardData.Temperature.tmp2i = parsedData[3];
            this.ardData.Temperature.tmp2o = parsedData[4];
            this.ardData.Temperature.tmp3i = parsedData[5];
            this.ardData.Temperature.tmp3o = parsedData[6];
            this.ardData.Temperature.tmp4i = parsedData[7];
            this.ardData.Temperature.tmp4o = parsedData[8];
        }
        
        this.OnData(this.ardData);
    }

    private connectSerial(){
        if(!this.serialList){
            console.log("No serial devices found");
            return;
        }

        try{
            console.log(this.serialList[0]);
            this.serialPort = new SerialPort(this.serialList[0], {
                baudRate: 9600,
                // defaults for Arduino serial communication
                dataBits: 8, 
                parity: 'none', 
                stopBits: 1, 
            });
            this.serialPort.on("open", () =>{
                console.log(`Port ${this.serialList[0]} has been opened`);
                setInterval(() => this.serialPort.write("RELLO"), 1000);
                this.isConnected = true;
                this.serialPort.on("data", (data) => {console.log(data);this.handleData(data);});
            });
        }
        catch(err){
            console.log(err);
        }
    }

    public sendSerial(tosend: string){
        this.serialPort.write(tosend);
    }

    private getBuffArr(data: any){
        this.receivedData += data.toString();
        if (this.receivedData.indexOf('<') >= 0 && this.receivedData.indexOf('>') >= 0) {
            // save the data between 'B' and 'E'
          let sendData:any = this.receivedData.substring(this.receivedData.indexOf('<') + 1, this.receivedData.indexOf('>'));
          sendData = sendData.split(",");
          console.log(sendData);
          return sendData;
        }

        return ["NAN"];
    }
}