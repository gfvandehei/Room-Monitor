import { MonitorView } from "./MonitorView";
import { ControlView } from "./ControlView";

export class ViewController{
    private monitorClick = document.querySelector("");
    private actionClick = document.querySelector("");
    private currentView:Views;
    private monitor = new MonitorView();
    private control = new ControlView();
    
    constructor(){
        this.currentView = this.monitor;
    }

    public ShowView(){
        this.currentView.ShowView();
    }

    public SwitchView(view:string){
        if(view === "control"){
            this.currentView = this.control;
        }
        else{
            this.currentView = this.monitor;
        }
    }
}