"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");

printOut("Task 1, 2 and 3");
let wakeUpTime = 9;
if (wakeUpTime === 7) {
    printOut("I can catch the bus to school.");
} else if (wakeUpTime === 8) {
    printOut("I can take the train to school.");
} else {
    printOut("I have to take the car to school.");
}
printOut(newLine);

printOut("--- Part 4, 5 --------------------------------------------------------------------------------------------");

printOut("Task 4 and 5");
const part4Number = 0;
if (part4Number > 0) {
    printOut("Positive");
} else if (part4Number < 0) {
    printOut("Negative");
} else {
    printOut("Zero");
}
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");

const imageSize = Math.floor(Math.random() * 8) + 1;
printOut(`Uploaded image size: ${imageSize}MP`);
if (imageSize >= 4) {
    printOut("Thank you");
} else {
    printOut("The image is too small");
}
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");

if (imageSize >= 6) {
    printOut("Image is too large");
} else if (imageSize >= 4) {
    printOut("Thank you");
} else {
    printOut("The image is too small");
}
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");

const monthList = ["January", "February", "Mars", "April", "Mai", "Jun", "Juli", "August", "September", "October", "November", "December"];
const noOfMonth = monthList.length;
const monthName = monthList[Math.floor(Math.random() * noOfMonth)]; 
printOut(`Current month: ${monthName}`);
if (monthName.includes("r")) {
    printOut("You must take vitamin D");
} else {
    printOut("You do not need to take vitamin D");
}
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");

let daysInMonth;
switch (monthName) {
    case "January":
    case "Mars":
    case "May":
    case "July":
    case "August": 
    case "October":
    case "December":
        daysInMonth = 31;
        break;
    case "April":
    case "June":
    case "September":
    case "November":
        daysInMonth = 30;
        break;
    case "February":
        daysInMonth = 28;
        break;
    default:
        daysInMonth = "unknown";
}
printOut(`Number of days in ${monthName}: ${daysInMonth}`);
printOut(newLine);


printOut("--- Part 10 ---------------------------------------------------------------------------------------------");

printOut(`Current month: ${monthName}`);
switch (monthName) {
    case "March":
    case "May":
        printOut("The art gallery is closed for refurbishment.");
        break;
    case "April":
        printOut("The art gallery is open in temporary premises next door.");
        break;
    default:
        printOut("The art gallery is open as usual.");
}
// Or with if-else:
if (monthName === "March" || monthName === "May") {
    printOut("The art gallery is closed for refurbishment.");
} else if (monthName === "April") {
    printOut("The art gallery is open in temporary premises next door.");
} else {
    printOut("The art gallery is open as usual.");
}
printOut(newLine);
