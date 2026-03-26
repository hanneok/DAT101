"use strict"; // lagde denne siden 1.

import { TPoint, TCircle } from "lib2d"; //43 // la på TCircle når vi lagde info knapp
import { TSprite, TSpriteButton, ESpriteNumberJustifyType, TSpriteNumber } from "libSprite"; // 3.
import { TColorButton } from "./colorButton.js"; //14
import {activateAudioContext} from "libSound";
import {spawnColorButton, resetGame} from "./SimonSays.mjs";

export class TGameBoard extends TSprite {
  //4.
  #colorButtons; //15
  #gameInfo; // 101
  #isSoundEnabled;
  #spFinalScore;

  constructor(aSpcvs, aSPI) {
    //5.
    super(aSpcvs, aSPI.Background, 0, 0); //6
    const center = new TPoint( //44
      aSPI.Background.width / 2, //45
      aSPI.Background.height / 2
    ); //46 . OG denne linja og de to over finner senteret på bildet.

    this.#colorButtons = [
      //16
      new TColorButton(aSpcvs, aSPI.ButtonRed, center), //17
      new TColorButton(aSpcvs, aSPI.ButtonGreen, center), //18
      new TColorButton(aSpcvs, aSPI.ButtonBlue, center), //19
      new TColorButton(aSpcvs, aSPI.ButtonYellow, center), //20 // la på center delen etter nr 46
    ];

    let posX = center.x - aSPI.ButtonStartEnd.width / 2; //105
    let posY = center.y - aSPI.ButtonStartEnd.height / 2; //106

    this.#gameInfo = new TSpriteButton(aSpcvs, aSPI.ButtonStartEnd, posX, posY, TCircle); //102 //må ha x og y verdi og ikke center
    this.#gameInfo.debug = true; //103
    this.#gameInfo.onClick = this.#gameInfoClicked.bind(this); //114
    this.#disableColorButtons(true); //115
    this.#isSoundEnabled = false;
    this.spRound = new TSpriteNumber(aSpcvs, aSPI.number, 405, 385);
    this.spRound.justify = ESpriteNumberJustifyType.Right;
    this.spRound.value = 0;
    this.#spFinalScore = new TSpriteNumber(aSpcvs, aSPI.number, 400, 440)
    this.#spFinalScore.justify = ESpriteNumberJustifyType.Center;
    this.#spFinalScore.visible = false;
  }


  get colorButtons(){
    return this.#colorButtons;
  }


gameOver(){
  this.#disableColorButtons(true);
  this.#gameInfo.index = 1;
  this.#gameInfo.hidden = false;
  this.#gameInfo.disabled = false;
  this.#spFinalScore.value = this.spRound.value;
  this.#spFinalScore.visible = true;
}





  draw() { //21
    super.draw(); //22
    for (let i = 0; i < this.#colorButtons.length; i++) { //23
      const colorButton = this.#colorButtons[i]; //24
      colorButton.draw(); //25
    }
    this.spRound.draw();
    this.#gameInfo.draw(); //104
    this.#spFinalScore.draw();
  }

  #disableColorButtons(aDisable) { //107
    for (let i = 0; i < this.#colorButtons.length; i++) { //108
      const colorButton = this.#colorButtons[i]; //109
      colorButton.disabled = aDisable; //110
    }
  }

  #gameInfoClicked() { //111
    this.#gameInfo.disabled = true; //112
    this.#gameInfo.hidden = true; //113
    this.#disableColorButtons(false); //116
    if(this.#isSoundEnabled === false){ //117
        activateAudioContext(); //118
        this.#isSoundEnabled = true; //119
        for(let i = 0; i < this.#colorButtons.length; i++){ //120
            const colorButton = this.#colorButtons[i]; //121
            colorButton.createSound(i); //122
        }
    }
    this.#spFinalScore.visible = false;
    resetGame();

    spawnColorButton(); //this activates the sequence when we start the game.
  }
}

//definere en fuksjon er å lage en fuksjon. bruk function og kodeblock og sånt. rope på funksjon er når vi bruker den.

//hvordan definere en fuksjon som heter resetgame i simonSays.mjs? da skriver vi function resetGame() { //kodeblock } og så kan vi bruke den i gameBoard.js ved å importere den. da skriver vi import {resetGame} from "./SimonSays.mjs"; og så kan vi bruke den i gameBoard.js ved å skrive resetGame(); 