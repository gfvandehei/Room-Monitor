import * as SerialPort from "serialport";

export class SerialController{
    private serialList: string[];
    private serialPort: SerialPort;
    public OnData: (data: any) => void;
    private receivedData = "";
    public isConnected = false;

    constructor(){
        this.getPorts();
        this.connectSerial();
    
    }

    private async getPorts(){
        let serialList: string[] = [];
        try{
            let ports: any[] = await SerialPort.list();
            ports.forEach((port: any) =>{
                if(port.manufacturer){
                    if(port.manufacturer.indexOf("Arduino") !== -1){
                        serialList.push(port.comName);
                    }
                }
            });
            console.log(serialList);
        }
        catch(err){
            console.log(err);
        }

        this.serialList = serialList;
    }

    private connectSerial(){
        if(!this.serialList){
            console.log("No serial devices found");
            return;
        }

        try{
            this.serialPort = new SerialPort(this.serialList[0], {
                baudRate: 9600,
                // defaults for Arduino serial communication
                dataBits: 8, 
                parity: 'none', 
                stopBits: 1, 
            });
            this.serialPort.on("open", () =>{
                console.log(`Port ${this.serialList[0]} has been opened`);
                this.isConnected = true;
                this.serialPort.on("data", (data) => {
                    let parsedData = this.handleData(data);
                    this.OnData(parsedData);
                });
            });
        }
        catch(err){
            console.log(err);
        }
    }

    private handleData(data: any){
        this.receivedData += data.toString();
        if (this.receivedData.indexOf('E') >= 0 && this.receivedData.indexOf('B') >= 0) {
            // save the data between 'B' and 'E'
          let sendData:any = this.receivedData.substring(this.receivedData.indexOf('B') + 1, this.receivedData.indexOf('E'));
          sendData = sendData.split(",");
          for(let i=0; i< sendData.length; i++){
            sendData[i] = sendData[i].split(" ");
          }
          this.receivedData = "";
          return sendData;
        }
    }
}