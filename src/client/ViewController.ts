import { MonitorView } from "./MonitorView";
import { ControlView } from "./ControlView";

export class ViewController{
    private currentView:Views;
    private monitor: MonitorView;
    private control: ControlView;
    
    constructor(){
        this.monitor = new MonitorView();
        this.control = new ControlView();
        this.currentView = this.monitor;
        this.ShowView();
    }

    public ShowView(){
        this.currentView.ShowView();
    }

    public SwitchView(view:string){
        if(view === "control"){
            this.currentView.RemoveView();
            this.currentView = this.control;
            this.currentView.ShowView();
        }
        else{
            this.currentView.RemoveView();
            this.currentView = this.monitor;
            this.currentView.ShowView();
        }
    }
}