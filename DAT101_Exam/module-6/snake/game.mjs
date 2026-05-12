"use strict";

//-----------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//-----------------------------------------------------------------------------------------
import { TSpriteCanvas, TSpriteNumber, ESpriteNumberJustifyType } from "libSprite";
import { TGameBoard, GameBoardSize, TBoardCell } from "./gameBoard.js";
import { TSnake, EDirection } from "./snake.js";
import { TBait } from "./bait.js";
import { TSoundWave, activateAudioContext, EOctave, ENoteName, EWaveformType } from "libSound"
import { TMenu } from "./menu.js"

//-----------------------------------------------------------------------------------------
//----------- variables and object --------------------------------------------------------
//-----------------------------------------------------------------------------------------
const cvs = document.getElementById("cvs");
const spcvs = new TSpriteCanvas(cvs);
let gameSpeed = 4; // Game speed multiplier;
let hndUpdateGame = null;
let soundBaitEaten = null;
export const EGameStatus = { Idle: 0, Playing: 1, Pause: 2, GameOver: 3 };



// prettier-ignore
export const SheetData = {
  Head:     { x:   0, y:   0, width:  38, height:  38, count:  4 },
  Body:     { x:   0, y:  38, width:  38, height:  38, count:  6 },
  Tail:     { x:   0, y:  76, width:  38, height:  38, count:  4 },
  Bait:     { x:   0, y: 114, width:  38, height:  38, count:  1 },
  Play:     { x:   0, y: 155, width: 202, height: 202, count: 10 },
  GameOver: { x:   0, y: 647, width: 856, height: 580, count:  1 },
  Home:     { x:  65, y: 995, width: 169, height: 167, count:  1 },
  Retry:    { x: 614, y: 995, width: 169, height: 167, count:  1 },
  Resume:   { x:   0, y: 357, width: 202, height: 202, count: 10 },
  Number:   { x:   0, y: 560, width:  81, height:  86, count: 10 },
};

export const GameProps = {
  gameBoard: null,
  gameStatus: EGameStatus.Idle,
  snake: null,
  bait: null
};

//------------------------------------------------------------------------------------------
//----------- Exported functions -----------------------------------------------------------
//------------------------------------------------------------------------------------------

export function newGame() {
  GameProps.gameBoard = new TGameBoard();
  GameProps.snake = new TSnake(spcvs, new TBoardCell(5, 5)); // Initialize snake with a starting position
  GameProps.bait = new TBait(spcvs); // Initialize bait with a starting position
  gameSpeed = 4; // Reset game speed
  menu.resetScore(); // Resets score in menu.
}

export function startGame() {
  GameProps.gameStatus = EGameStatus.Playing; //starting game
}

export function baitIsEaten() {

  
  console.log("Bait eaten!");
  /* Logic to increase the snake size and score when bait is eaten */
GameProps.snake.grow(); //grows snake by one segment
GameProps.bait.update(); //moves bait to a new random cell. with help from copilot. 
  increaseGameSpeed(); // Increase game speed
  if (soundBaitEaten !== null){
    soundBaitEaten.play();
    setTimeout(() => {
      soundBaitEaten.stop()//soundwave when bait is eaten
    }, 200);
menu.baitEaten(); // updates score in menu when bait is eaten
  } 

 
}


//------------------------------------------------------------------------------------------
//----------- functions -------------------------------------------------------------------
//------------------------------------------------------------------------------------------
let menu; //create menu

function loadGame() {
  cvs.width = GameBoardSize.Cols * SheetData.Head.width;
  cvs.height = GameBoardSize.Rows * SheetData.Head.height;

  GameProps.gameStatus = EGameStatus.Idle; 

  /* Create the game menu here */ 
menu = new TMenu(spcvs, SheetData); //TMenu class from menu.js

  requestAnimationFrame(drawGame);
  console.log("Game canvas is rendering!");
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Update game every 1000ms / gameSpeed
  console.log("Game canvas is updating!");
}


function drawGame() {
  // Clear the canvas
  spcvs.clearCanvas();

  switch (GameProps.gameStatus) {
    case EGameStatus.Playing:
    case EGameStatus.Pause:
      GameProps.bait.draw();
      GameProps.snake.draw();
      break;
  }
  menu.draw(GameProps.gameStatus);
  // Request the next frame
  requestAnimationFrame(drawGame);
}

function updateGame() {
  // Update game logic here
  switch (GameProps.gameStatus) {
    case EGameStatus.Playing:

      if (!GameProps.snake.update()) {
        GameProps.gameStatus = EGameStatus.GameOver;
        console.log("Game over!");
      }
      break;
  }
}

function increaseGameSpeed() {
  /* Increase game speed logic here */
  console.log("Increase game speed!");
  gameSpeed += 0.5; //increases snakes movement speed after eating bait
  clearInterval(hndUpdateGame); 
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); //starts new interval with updated speed
}

//-----------------------------------------------------------------------------------------
//----------- Event handlers --------------------------------------------------------------
//-----------------------------------------------------------------------------------------

function onKeyDown(event) {
  if (soundBaitEaten === null) {
  activateAudioContext();
  soundBaitEaten = new TSoundWave(EOctave.Octave4, ENoteName.C, EWaveformType.Sine)
  }
  switch (event.key) {
    case "ArrowUp":
      GameProps.snake.setDirection(EDirection.Up);
      break;
    case "ArrowDown":
      GameProps.snake.setDirection(EDirection.Down);
      break;
    case "ArrowLeft":
      GameProps.snake.setDirection(EDirection.Left);
      break;
    case "ArrowRight":
      GameProps.snake.setDirection(EDirection.Right);
      break;
    case " ":
    case "Escape": //two cases that do the same thing. when space or esc button pressed, game status changes to pause
      console.log("Space key pressed!");
      /* Pause the game logic here */
      if (GameProps.gameStatus === EGameStatus.Playing){
        GameProps.gameStatus = EGameStatus.Pause;
      }else if (GameProps.gameStatus === EGameStatus.Pause){ //unpause with the same buttons
      GameProps.gameStatus = EGameStatus.Playing;
      }
      //GameProps.gameStatus = GameProps.gameStatus === EGameStatus.Playing ? EGameStatus.Pause : EGameStatus.Playing; // Toggles between playing and pause by pressing "space bar" //with help from copilot

      break;
    default:
      console.log(`Key pressed: "${event.key}"`);
  }
}
//-----------------------------------------------------------------------------------------
//----------- main -----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

spcvs.loadSpriteImage("./Media/spriteSheet.png", loadGame);
document.addEventListener("keydown", onKeyDown);