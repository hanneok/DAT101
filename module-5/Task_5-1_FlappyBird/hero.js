"use strict";

import { TSprite } from "libSprite";
import {EGameStatus} from "./FlappyBird.mjs";
import { TSineWave } from "lib2d";
import {TSoundFile} from "libSound";

const fnFood = "./Media/food.mp3";
const fnHeroIsDead = "./Media/heroIsDead.mp3";
const fnGameOver = "./Media/gameOver.mp3"

export class THero extends TSprite{ // TSprite gjør at man ikke trenger å skrive draw. mindre koding fordi det er inne i TSprite
#gravity;
#speed;
#wave;
#sfFood;
#sfHeroIsDead
#sfGameOver

    constructor(aSpcvs, aSPI){
    super(aSpcvs, aSPI, 100, 20);   
    this.animationSpeed = 20;
    this.#gravity = 9.81 / 100;
    this.#speed = 0;
    this.#wave = new TSineWave(1,1);
    this.y += this.#wave.value;
    this.#sfFood = null;
    this.#sfHeroIsDead = null;
    this.#sfGameOver = null;
}
// copilot: why is aspcvs wrong? because its not used in the function. why? because its a method of the class which means it has access to the properties of the class including aSpcvs. where is this class used? in hero.js. what does this class do? it creates a hero sprite that can flap and be affected by gravity.
eat(){
    if(this.#sfFood === null){
        this.#sfFood = new TSoundFile(fnFood);
    }
    this.#sfFood.play();
}

animate() {
    const hasGravity = EGameStatus.state === EGameStatus.gaming || EGameStatus.state === EGameStatus.heroIsDead;


if (hasGravity){
    if(this.y < 400 - this.height) {
         this.#speed += this.#gravity; //increase speed due to gravity
         this.y += this.#speed; // update position based on speed
         if (this.rotation < 90) {
            //limit max rotation
            this.rotation = this.#speed * 25; // tilt down based on speed
        }
    }else{
        EGameStatus.state = EGameStatus.gameOver;
        this.animationSpeed = 0;
        this.#sfGameOver = new TSoundFile(fnGameOver);
        this.#sfGameOver.play();
    }
} else if (EGameStatus.state === EGameStatus.idle){
    this.y += this.#wave.value;
}
}


dead(){  // dead er en funksjon
this.#sfHeroIsDead = new TSoundFile(fnHeroIsDead); // new TsoundFile under en funksjon sier at funksjonen spiller av en lyd vi har ropt på.
this.#sfHeroIsDead.play();


}
flap(){
    this.#speed = -3.5;
    this.rotation = 0;

}
}



// stop komandoen du skal skrive inn resetter lyden av at du spiser en bait så den kan spille igjen.