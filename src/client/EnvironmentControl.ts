export class EnvironmentControl{
    private temp:HTMLElement;
    private tempInDiv:HTMLElement;
    private tempOutDiv:HTMLElement;
    private humi:HTMLElement;
    private humiInDiv:HTMLElement;
    private humiOutDiv:HTMLElement;
    private interval: any;

    constructor(){
 
    }

    private async startEnvCollection(): Promise<[[string,string],[string,string]]>{
        try{
            let res = await fetch("/data", {
                method: "POST",
                headers: {
                    "Content-Type" : 'application/JSON'
                },
                body: JSON.stringify({}),
            });

            let data = await res.json();
            console.log(data);
            return [[data.data[0][0],data.data[1][1]],[data.data[1][0],data.data[1][1]]];

        }
        catch(err){
            console.log(err);
            return [["0","0"],["0","0"]];
        }
    }

    public async updateEnvironment(){

        let envData = await this.startEnvCollection();

        this.tempInDiv.innerText = "Inside: "+envData[0][0];
        this.tempOutDiv.innerText = "Outside: "+envData[0][0];
        this.humiInDiv.innerText = "Inside: "+envData[1][0];
        this.humiInDiv.innerText = "Outside: "+envData[1][1];
    }

    public startDataFlow(){
        this.temp = document.querySelector(".temp") as HTMLElement;
        this.tempInDiv = this.temp.querySelector(".inside");
        this.tempOutDiv = this.temp.querySelector(".outside");
        this.humi = document.querySelector(".humi")
        this.humiInDiv = this.humi.querySelector(".inside");
        this.humiOutDiv = this.humi.querySelector(".outside");

        this.interval = setInterval(async () => {
            await this.updateEnvironment();
            console.log("update");
        },5000);
    }

    public stopDataFlow(){
        clearInterval(this.interval);
    }
}