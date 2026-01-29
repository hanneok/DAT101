"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";


printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const originalExpression = 2 + 3 * 2 - 4 * 6;
const modifiedExpression = 2 + 3 * (2 - 4) * 6;
printOut("The original expression: 2 + 3 * 2 - 4 * 6 = " + originalExpression);
printOut("The modified expression: 2 + 3 * (2 - 4) * 6 = " + modifiedExpression);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const millimeters = 340 + 25000;
const inches = millimeters / 25.4;
printOut("(25 meters is 25000mm, + 34cm is 340mm. Then divided by 25.4 = " + inches.toFixed(2));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let sekunder = 45 / 60;
let Timer = 12 + (3 * 24); 
let minutter = Timer * 60 + 14 + sekunder;
printOut(minutter.toFixed(2));
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let Totalofminutes = 6322.52; 
let days = Totalofminutes / 60 / 24;
let hours = (days - Math.floor(days)) * 24;
let mins = (hours - Math.floor(hours)) * 60;
let sec = (mins - Math.floor(mins)) * 60;
printOut(`Total: ${Math.floor(days)} days, ${Math.floor(hours)} hours, ${Math.floor(mins)} minutes and ${sec.toFixed(2)} seconds.`);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let dollars = 54;
let ratenok = 76;
let ratedollars = 8.6;
let dollarstonok = (dollars * ratenok) / ratedollars;
printOut(`477 NOK = ${dollars} USD`);
printOut(`54 UDS = ${dollarstonok.toFixed(0)} NOK`);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const part6Text = "There is much between heaven and earth that we do not understand.";
printOut(part6Text);
printOut("Number of characters: " + part6Text.length);
printOut("Character at position 19: " + part6Text.charAt(19));
printOut("Characters from position 35, 8 characters forward: " + part6Text.substring(35, 35 + 8));
printOut("Index at which 'earth' starts: " + part6Text.indexOf("earth"));
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`Is 5 greater than 3? : ${5 > 3}`);
printOut(`Is 7 greater than or equal to 7? : ${7 >= 7}`);
printOut(`Is "a" greater than "b"? : ${"a" > "b"}`);
printOut(`Is "1" less than "a"? : ${"1" < "a"}`);
printOut(`Is "2500" less than "abcd"? : ${"2500" < "abcd"}`);
printOut(`"arne" is not equal to "thomas". : ${"arne" != "thomas"}`);
printOut(`(2 equals 5) is this statement true? : ${(2 === 5) === true}`);
printOut(`("abcd" is greater than "bcd") is this statement false? : ${("abcd" > "bcd") === false}`);
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

printOut("Convert and print the following expressions: using Number()");
printOut(`From text "254" to a number: ${Number("254")}`);
printOut(`From text "57.23" to a number: ${Number("57.23")}`);
printOut(`From text "25 kroner" to a number: ${Number("25 kroner")}${newLine}`);

printOut("Convert and print the following expressions: using parseInt() and parseFloat()");
printOut(`From text "254" to a number: ${parseInt("254")}`);
printOut(`From text "57.23" to a number: ${parseFloat("57.23")}`);
printOut(`From text "25 kroner" to a number: ${parseInt("25 kroner")}`);

printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let r = Math.floor(Math.random() * 360) + 1;
printOut("Random number between 1 and 360 using floor: " + r);
printOut("Random number between 1 and 360 using ceil: " + (Math.ceil(Math.random() * 360)));
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const totalDays = 131;
const weeks = Math.floor(totalDays / 7);
const dayspart10 = totalDays % 7;
printOut("131 days is " + weeks + " weeks and " + days + " days.");
printOut(newLine);