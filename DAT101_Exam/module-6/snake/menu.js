"use strict";

/* Use this file to create the menu for the snake game. */
import { TSprite, TSpriteButton, TSpriteNumber } from "libSprite";
import { newGame, startGame, GameProps, EGameStatus } from "./game.mjs"; //resumeGame

export class TMenu {
  #spPlayBtn; //privates
  #spGameOver;
  #spHomeBtn;
  #spRetryBtn;
  #spResumeBtn;
  #score = 0;
  #lastEatenBaitTime = Date.now();
  #spGameScore; 
  #spFinalScore;

  get score() { // getter for score, used to update score in menu when bait is eaten.
  return this.#score;
}

set score(value) { // updates score in menu when bait is eaten.
  this.#score = value;
  if (this.#spGameScore) 
    this.#spGameScore.value = value;
  if (this.#spFinalScore) 
    this.#spFinalScore.value = value;
}

  constructor(aSpcvs, aSPI) {
    this.#spPlayBtn = new TSpriteButton(aSpcvs, aSPI.Play, 360, 220);
    this.#spPlayBtn.addEventListener("click", this.spPlayBtnClick.bind(this));
    this.#spGameOver = new TSprite(aSpcvs, aSPI.GameOver, 25, 55); //game over background
    this.#spHomeBtn = new TSpriteButton(aSpcvs, aSPI.Home, 90, 402);
    this.#spHomeBtn.addEventListener("click", this.spHomeBtnClick.bind(this));
    this.#spRetryBtn = new TSpriteButton(aSpcvs, aSPI.Retry, 639, 402);
    this.#spRetryBtn.addEventListener("click", this.spRetryBtnClick.bind(this));
    this.#spResumeBtn = new TSpriteButton(aSpcvs, aSPI.Resume, 360, 220);
    this.#spResumeBtn.addEventListener("click", this.spResumeBtnClick.bind(this));
    this.#spGameScore = new TSpriteNumber(aSpcvs, aSPI.Number, 20, 20,0,3);
    this.#spGameScore.scale = 0.8; //Makes score a bit smaller.
    this.#spFinalScore = new TSpriteNumber(aSpcvs, aSPI.Number, 540, 270, 0, 3);
    this.resetScore();
  }




calculateBaitPoints(secondsPassed) { // calculated how many points you get per apple, based on how long its been since last apple.
  const MaxPointsPerApple = 21;
  const MinusPerSecond = 3;
  const minPoints = 3;
  return Math.max(MaxPointsPerApple - secondsPassed * MinusPerSecond, minPoints);
}

baitEaten() { // updated the score based on how long its been since last bait was eaten.
  const now = Date.now(); // Gets the current time.
  const secondsPassed = Math.floor((now - this.#lastEatenBaitTime) / 1000); // Seconds passed since last bait was eaten.
  const points = this.calculateBaitPoints(secondsPassed);
  this.score += points;
  this.#lastEatenBaitTime = now; // Resets the timer for the next bait.
  this.#spGameScore.value = this.#score; // Updates the score display in the game.
    this.#spFinalScore.value = this.#score; // Updates the final score display when the game is over.

}

  resetScore() { // Resets score to 0 when starting a new game.
    this.score = 0;
    this.#lastEatenBaitTime = Date.now(); // Resets timer.
    if (this.#spGameScore) { // Checks if the score sprite exists.
      this.#spGameScore.value = this.#score;
    }
}


draw(state) {
    switch (state) {
      case 0: // idle
        this.#spPlayBtn.draw();
        break;
      case 1: // playing
      this.#spGameScore.draw();
        break;
      case 2: // pause
      this.#spResumeBtn.draw();
        break;
      case 3: // game over
      this.#spGameOver.draw();
      this.#spHomeBtn.draw();
      this.#spRetryBtn.draw();
      this.#spFinalScore.draw();
        break;
    }
  }


spPlayBtnClick() { //clicking play button in idle makes and starts new game
    if (GameProps.gameStatus === EGameStatus.Idle) {
        console.log("click");
     newGame();
     startGame();
    }
      }

      spHomeBtnClick() { //home button resets game, goes to idle screen
        if (GameProps.gameStatus === EGameStatus.GameOver) {
      GameProps.gameStatus = EGameStatus.Idle;
      }
    }

      spRetryBtnClick() { //retry button goes straight to playing new game
        if (GameProps.gameStatus === EGameStatus.GameOver) {
            newGame();
        GameProps.gameStatus = EGameStatus.Playing;
      }
    }

      spResumeBtnClick() { //resume button resumes game from pause
       if (GameProps.gameStatus === EGameStatus.Pause) {
       resumeGame();
       }
    }
}

//added all the buttons and game over screen, asked claude ai why they wouldnt react when clicked and it told me the placement of the buttons was way off screen