"use strict";
//--------------- Objects and Variables ----------------------------------//
import { TSpriteCanvas } from "libSprite";
import {TGameBoard} from "./gameBoard.js"; //7
import { addRandomButton, resetSequence} from "./sequence.js";

// prettier-ignore
export const SpriteInfoList = {
  Background:     { x: 0, y:    0, width: 720, height: 720, count:  1 },
  ButtonYellow:   { x: 0, y:  720, width: 314, height: 314, count:  2, dst: { x: 29,  y: 377, r1: 100, r2: 333 } },
  ButtonBlue:     { x: 0, y: 1034, width: 314, height: 314, count:  2, dst: { x: 377, y: 377, r1: 100, r2: 333 } },
  ButtonRed:      { x: 0, y: 1348, width: 314, height: 314, count:  2, dst: { x: 377, y: 29,  r1: 100, r2: 333 } },
  ButtonGreen:    { x: 0, y: 1662, width: 314, height: 314, count:  2, dst: { x: 29,  y: 29,  r1: 100, r2: 333 } },
  ButtonStartEnd: { x: 0, y: 1976, width: 360, height: 360, count:  2, dst: { x: 180, y: 180, r1:   1, r2: 180 } },
  number:         { x: 0, y: 2344, width:  23, height:  34, count: 10, dst: { x: 313, y: 385 } },
};

const cvs = document.getElementById("cvs");
const spcvs = new TSpriteCanvas(cvs);
const gameBoard = new TGameBoard(spcvs, SpriteInfoList); //2.

export const EGameStatusType = { Idle: 0, Computer: 1, Gamer: 2, GameOver: 3, state: 0 }; //de med store bokstaver blir behandla som konstanter og de med liten (state) er variabler? kan endre på alle men behandle noen som konstanter??.

export const gameProps = {
};

//--------------- Functions ----------------------------------------------//


export function resetGame(){
  resetSequence()
  EGameStatusType.state = EGameStatusType.Idle;



}
export function updateRound(aRound){
  gameBoard.spRound.value = aRound
  
}
  
  export function gameOver(){
  EGameStatusType.state === EGameStatusType.GameOver;
  gameBoard.gameOver();
}




export function spawnColorButton(){
  EGameStatusType.state = EGameStatusType.Computer;
   const colorButtons = gameBoard.colorButtons;
   addRandomButton(colorButtons);

}



function loadGame() {
  cvs.width = SpriteInfoList.Background.width;
  cvs.height = SpriteInfoList.Background.height;
  spcvs.onDraw = drawGame; 
}


function drawGame() {
  // Always draw all game elements, just control their visibility with the visible property
  gameBoard.draw();  //8
}



//--------------- Event Handlers -----------------------------------------//

//--------------- Main Code ----------------------------------------------//
spcvs.loadSpriteImage("./media/spriteSheet.png", loadGame);
