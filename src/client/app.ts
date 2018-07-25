class App{
    private humidelem = document.querySelector(".Humid");
    private tempelem = document.querySelector(".Temp");


    constructor(){
        console.log("Created");
        this.getWeatherData();
    }

    private getWeatherData(){
        setInterval( async () => {
            try{
                let res = await fetch("/data", {
                    method: "POST",
                    headers: {
                        "Content-Type" : 'application/JSON'
                    },
                    body: JSON.stringify({}),
                });

                let data =await res.json();
                console.log(data);
                if(data.status){
                    if(data.dataStat){
                        this.humidelem.innerHTML = `Humidity| Outside: ${data} Inside: ${data.inTemp}`;
                        this.tempelem.innerHTML = `Temperature| Outside: ${data.outHumid} Inside: ${data.inHumid}`;
                    }
                }
                

            }
            catch(err){
                console.log(err);
            }

            
        }, 5000);
    }
}

new App();