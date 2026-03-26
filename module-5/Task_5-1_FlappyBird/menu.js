"use strict";

import { TSprite, TSpriteButton, TSpriteNumber } from "libSprite";
import {startGame} from "./FlappyBird.mjs";
import {TSoundFile} from "libSound";


const fnCountDown = "./Media/countDown.mp3"; // fn forkortelse for file name. fn fungerer for alt i spillet våres. aka kan fungere over alt så trenger ikke være i en fuksjon. tror den er global nå?
const fnRunning = "./Media/running.mp3"; 

export class TMenu {
    #spTitle;
    #spPlayBtn;
    #spCountDown;
    #sfCountDown;
    #sfRunning;
    #spGameScore;
    constructor(aSpcvs, aSPI){
        this.#spTitle = new TSprite(aSpcvs, aSPI.flappyBird, 200, 100);
        this.#spPlayBtn = new TSpriteButton(aSpcvs, aSPI.buttonPlay, 240, 180);
        this.#spPlayBtn.addEventListener("click", this.spPlayBtnClick.bind(this));
        this.#spCountDown = new TSpriteNumber(aSpcvs, aSPI.numberBig, 280, 190);
        this.#spCountDown.visible = false;
        this.#sfCountDown = null; // start med å skrive this.#sfCountDown = null; fordi verdien skulle komme senere? så ikke undefined?
        this.#sfRunning = null;
        this.#spGameScore = new TSpriteNumber (aSpcvs, aSPI.numberSmall, 10, 10);
        this.#spGameScore.alpha = 0.5;
        }

        
        incGameScore(aScore){
        this.#spGameScore.value += aScore;
    }


        stopSound(){
            this.#sfRunning.stop();
        }


    draw(){
        this.#spTitle.draw();
        this.#spPlayBtn.draw();
        this.#spCountDown.draw();
        this.#spGameScore.draw();
    }
    
    countDown(){
        this.#spCountDown.value--;
          if(this.#spCountDown.value > 0){ // brukte > ikke === som copilot sa, why.
            setTimeout(this.countDown.bind(this), 1000);
          }else{
            this.#spCountDown.visible = false;
            this.#spTitle.hidden = true; 
            this.#sfRunning = new TSoundFile(fnRunning);
            this.#sfRunning.play();
            startGame();
          }
        
            
    }

    spPlayBtnClick(){
        console.log("Click");
        this.#spPlayBtn.hidden = true;
        this.#spCountDown.visible = true;
        this.#spCountDown.value = 3;
        this.#sfCountDown = new TSoundFile(fnCountDown);
        this.#sfCountDown.play();
        setTimeout(this.countDown.bind(this), 1000); // this = vi binder countdown til sette settimeout tingen. 1000 for 1 sek.
    }
}
