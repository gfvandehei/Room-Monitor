import "./styles.css";
import "./images/satalite.png"
import { ViewController } from "./ViewController";
class App{
    private viewController = new ViewController();
    private monitorNav = document.querySelector(".monitor-nav") as HTMLElement;
    private controlNav = document.querySelector(".control-nav") as HTMLElement;

    constructor(){
        this.setEventHandlers();
    }

    private setEventHandlers(){
        this.monitorNav.onclick = () => {
            this.viewController.SwitchView("monitor");
        }
        this.controlNav.onclick = () => {
            this.viewController.SwitchView("control");
        }
    }
}

new App();