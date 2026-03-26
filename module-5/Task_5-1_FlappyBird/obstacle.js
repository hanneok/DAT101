"use strict";
import { TSprite } from "libSprite";
import { hero, EGameStatus } from "./FlappyBird.mjs";
import {TMenu} from "./menu.js";

const EasyFlyerGap = 150;
const HardFlyerGap = 100;
const MinimumProtrusion = 30;
    

export class TObstacle{ //skal ikke arve noe fordi den ikke har en extense?
  #spUp;
  #spDown;
  #spi;
    constructor(aSpcvs, aSPI){
    const x = 600;
    this.#spi = aSPI;
    // Generate random gap height, based on difficulty settings
    const gap = Math.ceil(Math.random() * (EasyFlyerGap - HardFlyerGap) + HardFlyerGap);
    const minTop = -this.#spi.height + MinimumProtrusion; // Minimum top position for upper obstacle
    const maxTop = -MinimumProtrusion; // Maximum top position for upper obstacle
    // Generate random top position for upper obstacle
    let top = Math.ceil(Math.random() * (maxTop - minTop) + minTop);
    const minBottom = 400 - MinimumProtrusion; // Minimum bottom position for lower obstacle
    let topWithGap = this.#spi.height + top + gap; // Initial position of bottom obstacle based on the height of the sprite, gap, and top 
    if(topWithGap > minBottom){
      // The top with gap is too low, adjust top and keep the gap constant
      const adjustment = topWithGap - minBottom;
      top -= adjustment;
      topWithGap = this.#spi.height + top + gap; // Recalculate topWithGap after adjustment
    }

    this.#spDown = new TSprite(aSpcvs, aSPI, x, topWithGap);
    this.#spDown.index = 2;
    this.#spUp = new TSprite(aSpcvs, aSPI, x, top);
    this.#spUp.index = 3;
  }



    //properties
    get x(){
        return this.#spDown.x;
    }

    get width(){
      return this.#spDown.x; //lagde denne fordi jeg trengte width i flappybird.mjs i menu.incGameScore under function animate game.


    }
    draw(){
        this.#spDown.draw();
        this.#spUp.draw();
    }

    animate(){
        this.#spDown.x--;
        this.#spUp.x--;
    let hasCollided = hero.hasCollided(this.#spDown) || hero.hasCollided(this.#spUp);

    if (hasCollided) {
        console.log("Collision detected!");
        EGameStatus.state = EGameStatus.heroIsDead;
        hero.animationSpeed = 0;
        menubar.stopSound();
        hero.flap(); // last flap of death
        hero.dead();
    }
}
}
