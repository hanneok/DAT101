"use strict";

import {EGameStatusType} from "./SimonSays.mjs";
import {spawnColorButton, gameOver, updateRound} from "./SimonSays.mjs";


let colorButton = null;
let sequence = [];
let round = 0;
let seqIndex = 0;




export function resetSequence(){
    sequence = [];
    round = 0;
    seqIndex = 0;   
}





export function addRandomButton(aColorButtons){
const index = Math.floor(Math.random() * aColorButtons.length);
colorButton = aColorButtons[index];
sequence.push(colorButton);
seqIndex = 0; //dette betyr... å resette den..?
colorButton = sequence [0];
setTimeout(setButtonDown, 1000); // this is the wait time before sequence starts.
}




export function testOfUserInput(aColorButton){
    if(aColorButton === colorButton){
        console.log("correct");
        seqIndex++;
        if(seqIndex < sequence.length){//we have not reached the end yet
            colorButton = sequence[seqIndex];
    }else{ // we have rached the end of sequence.
        round++;
        updateRound(round);
        spawnColorButton();
    }
    }else{
        console.log("incorrect");
        gameOver();

    }
    
}


function setButtonDown(){
    colorButton.onMouseDown();
    setTimeout(setButtonUp, 500);
}

function setButtonUp(){
    colorButton.onMouseUp();
    seqIndex++;
    if(seqIndex < sequence.length){   //if test for å sjekke om det er spilleren sin tur/aka om spillet er over.
        colorButton = sequence[seqIndex];
        setTimeout(setButtonDown, 1000);
    }else{
      EGameStatusType.state = EGameStatusType.Gamer;
      seqIndex = 0;
      colorButton = sequence[0];
}
  
}

