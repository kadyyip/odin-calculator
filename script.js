function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function power(num1, num2) {
    return num1 ** num2;
}

let num1 = null;
let num2 = null;
let operator;

function operate(operator, num1, num2) {
    switch (operator) {
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
        case "power":
            return power(num1, num2);
    }
}

function populateDisplay(event) {
    let buttonPressed = event.target.id;
    const numbers = "1234567890.";
    const operators = ["add", "divide", "multiply", "power", "subtract"];
    if (numbers.includes(buttonPressed)) {
        // we completed an operation and are showing the answer
        // if a number is pressed, then we want to start a new calculation
        if (operators.includes(prevButtonPressed) || (prevButtonPressed === "equal")) {
            displayValue = "";
            if  (prevButtonPressed === "equal") {
                num1 = null;
            }
        }
        displayValue += event.target.id;
    } else if (operators.includes(buttonPressed)) {
        if (num1 === null && displayValue !== "") {
            num1 = Number(displayValue);
        } else if (num1 !== null && num2 === null) {
            if (!operators.includes(prevButtonPressed) && !(prevButtonPressed === "equal")) {
                num2 = Number(displayValue);
                displayValue =  String(operate(operator, num1, num2));
                num1 = Number(displayValue);
                num2 = null;
            }
        } 
        operator = buttonPressed;
    } else if (buttonPressed === "equal") {
        if (numbers.includes(prevButtonPressed)) {
            num2 = Number(displayValue);
            displayValue = String(operate(operator, num1, num2));
            num1 = Number(displayValue);
            num2 = null;
            operator = null;
        }

    } else if (buttonPressed === "clear") {
        displayValue = "";
        num1 = null;
        num2 = null;
    } else if (buttonPressed === "delete") {
        displayValue = displayValue.slice(0, displayValue.length - 1);
    } else { // decimal pressed
        if (operators.includes(prevButtonPressed) || (prevButtonPressed === "equal")) {
            displayValue = "";
            if  (prevButtonPressed === "equal") {
                num1 = null;
            }
        }
        if (!displayValue.includes(".")) {
            displayValue += ".";
        }
    }
    
    const displayVal = document.querySelector(".display-value");
    displayVal.textContent = displayValue;
    prevButtonPressed = buttonPressed;
}

function calculate(event) {
    populateDisplay
}

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
    button.addEventListener("click", populateDisplay);
}

let displayValue = "";
let upperDisplay = "";
let prevButtonPressed = null;