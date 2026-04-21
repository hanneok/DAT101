"use strict";

// Import necessary modules
import { TSpriteCanvas } from "libSprite";
import { TBackground } from "./Background.js";
import { THero } from "./hero.js";
import { TObstacle } from "./obstacle.js";
import { TBait } from "./bait.js";
import { TMenu } from "./menu.js";

//--------------- Objects and Variables ----------------------------------//
export const chkMuteSound = document.getElementById("chkMuteSound");
const rbDayNight = document.getElementsByName("rbDayNight");
const cvs = document.getElementById("cvs");
const spcvs = new TSpriteCanvas(cvs);

// prettier-ignore 
const SpriteInfoList = {
  hero1:        { x: 0   , y: 545 , width: 34   , height: 24  , count: 4  },
  hero2:        { x: 0   , y: 569 , width: 34   , height: 24  , count: 4  },
  hero3:        { x: 0   , y: 593 , width: 34   , height: 24  , count: 4  },
  obstacle:     { x: 0   , y: 0   , width: 52   , height: 320 , count: 4  },
  background:   { x: 246 , y: 0   , width: 576  , height: 512 , count: 2  },
  flappyBird:   { x: 0   , y: 330 , width: 178  , height: 50  , count: 1  },
  ground:       { x: 246 , y: 512 , width: 1152 , height: 114 , count: 1  },
  numberSmall:  { x: 681 , y: 635 , width: 14   , height: 20  , count: 10 },
  numberBig:    { x: 422 , y: 635 , width: 24   , height: 36  , count: 10 },
  buttonPlay:   { x: 1183, y: 635 , width: 104  , height: 58  , count: 1  },
  gameOver:     { x: 0   , y: 384 , width: 226  , height: 114 , count: 1  },
  infoText:     { x: 0   , y: 630 , width: 200  , height: 55  , count: 2  },
  food:         { x: 0   , y: 696 , width: 70   , height: 65  , count: 34 },
  medal:        { x: 985 , y: 635 , width: 44   , height: 44  , count: 4  },
};


export const EGameStatus = { idle: 0, countdown: 1, gaming: 2, heroIsDead: 3, gameOver: 4, state: 0 }; //0 to change it to idle mode.
const Background = new TBackground(spcvs, SpriteInfoList);
export const hero = new THero(spcvs, SpriteInfoList.hero1);
export const obstacles = [];
export const baits = [];
//export const menu = new TMenu (spcvs, SpriteInfoList);
let obstaclePassed = false; //to know if we have passed the obstacle.


//--------------- Functions ----------------------------------------------//


export function restartGame() {
  heroRestart();
  EGameStatus.state === EGameStatus.idle;
}

export function startGame(){
  EGameStatus.state = EGameStatus.gaming;
  menu.resetScore(); // resets to 0
  menu.showScore(); // show top-left score
  setTimeout (spawnObstacle, 1000);
  setTimeout (spawnBait, 1000); //timeout for bait and obstacles to spawn (1 sec).
}




function spawnBait(){
  if(EGameStatus.state === EGameStatus.gaming){ //bait stops spawning when game is not in gaming mode.
  const bait = new TBait(spcvs, SpriteInfoList.food);
  baits.push(bait);
  const nextTime = Math.ceil(Math.random()*3) + 1;
  setTimeout (spawnBait, nextTime * 1000); // spawns a new bait after a random time between 1 and 4 seconds.
}
}


function spawnObstacle(){
if (EGameStatus.state === EGameStatus.gaming){
  const obstacle = new TObstacle(spcvs, SpriteInfoList.obstacle);
obstacles.push(obstacle);
const nextTime = Math.ceil(Math.random() * 3) + 1; 
//console.log(`Next obstacle in ${nextTime} seconds`);
setTimeout (spawnObstacle, nextTime * 1000);
}
}


function isColliding(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}


function animateGame() {
  hero.animate();
  if (EGameStatus.state !== EGameStatus.gaming) return;
  let eaten = -1;
  for (let i = 0; i < baits.length; i++) {
    const bait = baits[i];
    bait.animate();
    if (bait.distanceTo(hero.center) < 20) {
      eaten = i;
    }
  }
  if (eaten >= 0){
    console.log("Bait eaten!");
    baits.splice(eaten,1);
    hero.eat();
  }

  if(EGameStatus.state === EGameStatus.gaming){
  Background.animate();
  let deleteObstacle = false;
  for(let i = 0; i < obstacles.length; i++){
    const obstacle = obstacles[i];
  obstacle.animate();


 if (!obstacle.passed && obstacle.x + obstacle.width < hero.x) {
    obstacle.passed = true;
     menu.incGameScore(1);
}

 if (isColliding(hero, obstacle.getUpSprite()) || isColliding(hero, obstacle.getDownSprite())) {
  onHeroDeath();
   return;
  } 


if (obstacle.x < -50) {
  obstacles.splice(i, 1);
  i--;
      }
    }

if (hero.y + hero.height >= cvs.height - SpriteInfoList.ground.height) {
 onHeroDeath();
  return;
  }
  }
}

function onHeroDeath() {
  if (EGameStatus.state !== EGameStatus.gaming) return;

  EGameStatus.state = EGameStatus.heroIsDead;
  hero.dead();

  console.log("HERO DIED");

  setTimeout(() => {
    EGameStatus.state = EGameStatus.gameOver;
    menu.showGameOver();
  }, 1000);
}

function drawGame() { // Draw them in the right order.
  Background.drawBackground();
  for(let i = 0; i < baits.length; i++){
    const bait = baits[i];
    bait.draw();
  }

  for (let i = 0; i < obstacles.length; i++) { 
    const obstacle = obstacles[i];
    obstacle.draw();
  } 


  hero.draw(); 
   Background.drawGround();
    menu.draw(EGameStatus.state);
}

export let menu;


function loadGame(spriteImage) {
  console.log("Game Loaded");

for (let key in SpriteInfoList) {
    SpriteInfoList[key].img = spriteImage;
  }

  cvs.width = SpriteInfoList.background.width; // Set canvas size to background size
  cvs.height = SpriteInfoList.background.height; 

  menu = new TMenu(spcvs, SpriteInfoList);
 
spcvs.onDraw = drawGame;


 EGameStatus.state = EGameStatus.idle;



setInterval(animateGame, 10);
} 


function onKeyDown(aEvent) {
  switch (aEvent.code) {
    case "Space":
      console.log("Space key pressed, flap the hero!");
      if(EGameStatus.state !== EGameStatus.heroIsDead){
      hero.flap();
  }
      break;
  }
} 

function setSoundOnOff() {
  const isMuted = chkMuteSound.checked;
  menu.setSoundMute(isMuted);
}

function setDayNight(aEvent) {
  const isNight = aEvent.target.value == 0;
  Background.setDayNight(isNight);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].setDayNight(isNight);
  }


  console.log(`Day/Night mode changed: ${aEvent.target.value}`);
} 

//--------------- Main Code ----------------------------------------------//
chkMuteSound.addEventListener("change", setSoundOnOff);
rbDayNight[0].addEventListener("change", setDayNight);
rbDayNight[1].addEventListener("change", setDayNight);

// Load the sprite sheet
spcvs.loadSpriteImage("./Media/FlappyBirdSprites.png", loadGame);
document.addEventListener("keydown", onKeyDown);