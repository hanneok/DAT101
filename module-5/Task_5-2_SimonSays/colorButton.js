"use strict" // lagde denne fila 9.

import {TSpriteButton} from "libSprite"; //10
import {EOctave, ENoteName, Notes, TSoundWave} from "libSound";
import {testOfUserInput} from "./sequence.js";
import {EGameStatusType} from "./SimonSays.mjs";


export class TColorButton extends TSpriteButton{ //11
    #dst; //26
    #gameBoardCenter;
    #sound;
    constructor(aSpcvs, aSPI, aGameBoardCenter){ //12. la på aGameBoardCenter etter 50
    super(aSpcvs, aSPI, aSPI.dst.x, aSPI.dst.y); //13
    this.#dst = aSPI.dst; //29
    this.#gameBoardCenter = aGameBoardCenter; //30. also pga (), så skal det være , etter 2, ikke;
    this.#sound = null;
        //aSpcvs.widht / 2, //31
        //aSpcvs.lenght / 2//32
    
    }




    isMouseOver(aMousePos){ //27
        const isOver = super.isMouseOver(aMousePos); //28
        if(isOver){ //33
            const dx = this.#gameBoardCenter.x - aMousePos.x; //34
            const dy = this.#gameBoardCenter.y - aMousePos.y; //35
            let hyp = Math.pow(dx,2) + Math.pow(dy,2); //36
            hyp = Math.sqrt(hyp); //37
            let inside = hyp > this.#dst.r1 && hyp < this.#dst.r2;//38
            if(inside){ //39
                return true; //40
            }else{ //41
                return false; //42
            }
            }
        }


    onMouseDown(){ //47. ALSO trenger ikke rope på den/super
        this.index = 1; //48
        if(this.#sound){ //126
            this.#sound.play(); //127
        }
    }

    onMouseLeave(aEvent){
        super.onMouseLeave(aEvent);
        this.index = 0;
        if(this.#sound){
            this.#sound.stop();
        }
    }

    onMouseUp(){ //49
        this.index = 0; //50
        if(this.#sound){ //124
            this.#sound.stop(); //125

        }
        if(EGameStatusType.state === EGameStatusType.Gamer){
          testOfUserInput(this);  
        }
        
    }

    createSound(aIndex){
        let note = ENoteName.C;
        switch(aIndex){
            case 1:
                note = ENoteName.E
                break;
            case 2:
                note = ENoteName.G
                break;
            case 3:
                note = ENoteName.A
                break;
        }
        this.#sound = new TSoundWave (EOctave.Octave5, note); //123
      
    }
    
}
