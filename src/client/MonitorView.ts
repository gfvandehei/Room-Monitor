import { EnvironmentControl } from "./EnvironmentControl";

export class MonitorView implements Views{
    private envController = new EnvironmentControl(); 
    private viewDiv = document.querySelector(".view");
    private envDiv: HTMLElement;
    private tempDiv: HTMLElement;
    private humiDiv: HTMLElement;

    constructor(){
        this.envDiv = document.createElement("DIV");
        this.envDiv.className = "section env";
        this.envDiv.innerHTML = `
        <h1 class = "header-monitor">Environment</h1>
        <div class = "inner-section temp">
            <h1 class = "inner-header">Temperature</h1>
            <div class = "inner-inner-section inside"></div>
            <div class = "inner-inner-section outside"></div> 
        </div>
        <div class = "inner-section humi">
            <h1 class = "inner-header">Humidity</h1>
            <div class = "inner-inner-section inside"></div>
            <div class = "inner-inner-section outside"></div> 
        </div>`

        this.ShowView();
    }

    public ShowView(){
       // if(this.viewDiv.children.length < 1){
            this.viewDiv.appendChild(this.envDiv);
            this.envController.startDataFlow();
        //}
    }

    public RemoveView(){
        this.viewDiv.removeChild(this.envDiv);
        this.envController.stopDataFlow();
    }
}