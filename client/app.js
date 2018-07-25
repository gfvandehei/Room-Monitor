'use strict'

class App{
    constructor(){
        console.log("Created");
        let humidelem = document.querySelector(".Humid");
        let tempelem = document.querySelector(".Temp");
        
        setInterval( async () => {
            try{
                let data = await fetch("/data", {
                    method: "GET",
                    headers: {},
                    body: {},
                });

                humidelem.innerHTML = `Humidity| Outside: ${data[0][0]} Inside: ${data[0][1]}`;
                tempelem.innerHTML = `Temperature| Outside: ${data[1][0]} Inside: ${data[1][1]}`;

            }
            catch(err){
                console.log(err);
            }

            
        }, 5000);
    }
}

new App();