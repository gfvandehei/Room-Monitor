import "./styles.css";
class App{
    private humidelem = document.querySelector(".Humid");
    private tempelem = document.querySelector(".Temp");


    constructor(){
        console.log("Created");
        this.getWeatherData();
        setInterval(() => this.getWeatherData(),5000); //make client request weather data every 5 seconds

    }

    private async getWeatherData(){
        //make initial post request
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
            if(data.status){
                if(data.dataStat){
                    this.humidelem.innerHTML = `Humidity| Outside: ${data.data[0][0]} Inside: ${data.data[0][1]}`;
                    this.tempelem.innerHTML = `Temperature| Outside: ${data.data[1][1]} Inside: ${data.data[1][2]}`;
                }
            }
            

        }
        catch(err){
            console.log(err);
        }
    }
}

new App();