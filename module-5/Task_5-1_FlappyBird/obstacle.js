"use strict";
import { TSprite } from "libSprite";
import { hero, EGameStatus } from "./FlappyBird.mjs";


const EasyFlyerGap = 150;
const HardFlyerGap = 100;
const MinimumProtrusion = 30;
    

export class TObstacle{
  #spUp;
  #spDown;
  #spi;
    constructor(aSpcvs, aSPI, isNight){
    const x = 600;
    this.#spi = aSPI;

    const gap = Math.ceil(Math.random() * (EasyFlyerGap - HardFlyerGap) + HardFlyerGap);
    const minTop = -this.#spi.height + MinimumProtrusion; 
    const maxTop = -MinimumProtrusion; 

    let top = Math.ceil(Math.random() * (maxTop - minTop) + minTop);
    const minBottom = 400 - MinimumProtrusion; 
    let topWithGap = this.#spi.height + top + gap;
    if(topWithGap > minBottom){
      const adjustment = topWithGap - minBottom;
      top -= adjustment;
      topWithGap = this.#spi.height + top + gap; 
      this.passed = false;
    }

    this.#spDown = new TSprite(aSpcvs, aSPI, x, topWithGap);
    this.#spUp = new TSprite(aSpcvs, aSPI, x, top);
  


    this.setDayNight(isNight);
  }

    get x(){
        return this.#spDown.x;
    }

    get width(){
      return this.#spDown.width; 

    }
    draw(){
        this.#spDown.draw();
        this.#spUp.draw();
    }

    animate(){
        this.#spDown.x--;
        this.#spUp.x--;
    }
    setDayNight(isNight) {
    if (isNight) {
      this.#spDown.index = 0; //night down
      this.#spUp.index = 1; //night up
    } else {
      this.#spDown.index = 2; //day down
      this.#spUp.index = 3; //day up
    }
  }
  getUpSprite() {
    return this.#spUp;
  }

  getDownSprite() {
    return this.#spDown;
  }
} 

