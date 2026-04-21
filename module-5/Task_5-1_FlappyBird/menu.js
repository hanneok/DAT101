"use strict";

import { TSprite, TSpriteButton, TSpriteNumber } from "libSprite";
import {startGame, EGameStatus, hero, obstacles, baits} from "./FlappyBird.mjs";
import {TSoundFile} from "libSound";
import { chkMuteSound } from "./FlappyBird.mjs";


const fnCountDown = "./Media/countDown.mp3";
const fnRunning = "./Media/running.mp3"; 

export class TMenu {
#spTitle;
  #spReady;
  #spPlayBtn;
  #spCountDown;
  #sfCountDown;
  #sfRunning;
  #spGameScore;
  #spGameOver;
  #spMedal;
  #spFinalScore;
  #spHighScore;
  #highScores;

  
    constructor(aSpcvs, aSPI){
    this.#spTitle = new TSprite(aSpcvs, aSPI.flappyBird, 200, 100);
    this.#spReady = new TSprite(aSpcvs, aSPI.infoText, 200, 100);
    this.#spReady.hidden = true;
    this.#spPlayBtn = new TSpriteButton(aSpcvs, aSPI.buttonPlay, 240, 180);
    this.#spPlayBtn.addEventListener("click", this.spPlayBtnClick.bind(this));
    this.#spCountDown = new TSpriteNumber(aSpcvs, aSPI.numberBig, 280, 190);
    this.#spCountDown.visible = false;
    this.#sfCountDown = null;
    this.#sfRunning = null;
    this.#spGameScore = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 10, 10);
    this.#spGameScore.alpha = 0.5;
    this.#spGameOver = new TSprite(aSpcvs, aSPI.gameOver, 180, 150);
    this.#spGameOver.visible = false;

        

    this.#spMedal = new TSprite(aSpcvs, aSPI.medal, 207, 193, 0);
    this.#spMedal.hidden = true;

    this.#spFinalScore = new TSpriteNumber(aSpcvs, aSPI.numberBig, 275, 165);
    this.#spFinalScore.visible = false;
    this.#spHighScore = new TSpriteNumber(aSpcvs, aSPI.numberBig, 275, 215);
    this.#spHighScore.visible = false;
  }


        incGameScore(aScore){
        this.#spGameScore.value += aScore;
    }


        stopSound(){
         if (this.#sfRunning) {
            this.#sfRunning.stop();
        }
    }

     draw(state) {
    switch (state) {
      case 0: // idle
        this.#spTitle.draw();
        this.#spPlayBtn.draw();
        break;
      case 1: // countdown
        this.#spReady.draw();
        this.#spCountDown.draw();
        break;
      case 2: // gaming
        this.#spGameScore.draw();
        break;
      case 4: // gameOver
        this.#spGameOver.draw();
        this.#spMedal.draw();
        this.#spFinalScore.draw();
        this.#spHighScore.draw();
        this.#spPlayBtn.draw();
        break;
    }
  }
     animateFinalScore(targetScore, targetHighScore) {
    let current = 0;
    this.#spFinalScore.value = 0;
    this.#spHighScore.value = targetHighScore;

    const timer = setInterval(() => {
      current++;
      this.#spFinalScore.value = current;

      if (current >= targetScore) {
        clearInterval(timer);
      }
    }, 60); // speed of animation
  }
  showScore() {
    this.#spGameScore.visible = true;
  }

  hideScore() {
    this.#spGameScore.visible = false;
  }

  resetScore() {
    this.#spGameScore.value = 0;
  }

  getGameScore() {
    return this.#spGameScore.value;
  }



    countDown(){
        this.#spCountDown.value--;
          if(this.#spCountDown.value > 0){
            setTimeout(this.countDown.bind(this), 1000);
          }else{
            this.#spCountDown.visible = false;
            this.#spReady.visible = false;
            this.#spTitle.hidden = true; 

            this.#spGameScore.visible = true;


            this.#sfRunning = new TSoundFile(fnRunning);
            this.#sfRunning.play();
            startGame();
          }
        
            
    }

    spPlayBtnClick(){
        console.log("Click");
    if (EGameStatus.state === EGameStatus.gameOver) { // Reset Hero
      hero.restart();
      

      obstacles.length = 0; // Clear all obstacles
      baits.length = 0; // Clear all baits

      this.resetScore();

    
      this.#spGameOver.hidden = true;
      this.#spMedal.hidden = true;
      this.#spFinalScore.visible = false;
      this.#spHighScore.visible = false;
    }

    EGameStatus.state = EGameStatus.countDown;
    this.#spPlayBtn.x = 240;
    this.#spPlayBtn.y = 180;
    this.#spPlayBtn.hidden = true;

    this.#spTitle.hidden = true;
    this.#spReady.hidden = false;
    this.#spCountDown.visible = true;
    this.#spCountDown.value = 3;
    this.#sfCountDown = new TSoundFile(fnCountDown);
    this.#sfCountDown.play();
    setTimeout(this.countDown.bind(this), 1000);
  }
  setSoundMute(aIsMuted) {
    if (aIsMuted === true && this.#sfRunning) {
      this.#sfRunning.pause();
    }
    if (aIsMuted === false && this.#sfRunning) {
      this.#sfRunning.play();
    }
  }
  showGameOver() {
    this.stopSound();

    this.#spReady.hidden = true;
    this.hideScore();

    this.#spGameOver.hidden = false;


    this.#spPlayBtn.x = 240; 
    this.#spPlayBtn.y = 45; 
    this.#spPlayBtn.hidden = false;

  
    const currentScore = this.getGameScore();
    const storedHighScore = Number(localStorage.getItem("highScore")) || 0;
    const newHighScore = Math.max(currentScore, storedHighScore);

  
    if (currentScore > storedHighScore) {
      localStorage.setItem("highScore", currentScore);
      this.#highScores.push(currentScore);
    }


    let medalIndex;
    if (currentScore >= 30) {
      medalIndex = 1; // Gold medal
    } else if (currentScore >= 20) {
      medalIndex = 2; // Silver medal
    } else if (currentScore >= 10) {
      medalIndex = 3; // Bronze medal
    } else {
      medalIndex = 0; // No medal
    }

  
    this.#spMedal.index = medalIndex;
    this.#spMedal.hidden = false;

  
    this.#spFinalScore.visible = true;
    this.#spHighScore.visible = true;

 
    this.animateFinalScore(currentScore, newHighScore);

    console.log(`Game Over! Score: ${currentScore}, High Score: ${newHighScore}, Medal: ${medalIndex}`);
  }
}
