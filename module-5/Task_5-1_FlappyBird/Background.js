"Use strict";
import { TSprite } from "libSprite";

export class TBackground {
    #spriteBackground;
    #spriteGround;

    constructor(aSpcvs, aSPI, isNight){
    this.#spriteBackground = new TSprite(aSpcvs, aSPI.background, 0, 0);
    const backgroundIndex = isNight ? 1 : 0;
    this.#spriteBackground.index = backgroundIndex;
    const groundpoSY = aSPI.background.height - aSPI.ground.height;
    this.#spriteGround = new TSprite(aSpcvs, aSPI.ground, 0, groundpoSY);
  }




    drawBackground(){
        this.#spriteBackground.draw();
    }

    drawGround(){
        this.#spriteGround.draw();
    }



    animate(){
    
    const x = this.#spriteGround.x + this.#spriteGround.width / 2;
    if (x<5){
        this.#spriteGround.x = 0;
    } else {
        this.#spriteGround.x--;
    }
}
  setDayNight(isNight) {
    this.#spriteBackground.index = isNight ? 1 : 0;
  }
}
