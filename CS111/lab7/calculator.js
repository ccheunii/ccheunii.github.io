// Global Variables
let memory = 0;
let currentInput = "0";
let currentOperator = null;
let leftOperand = null;
let waitingForRightOperand = false;
let lastOperation = "";
let calculationDone = false;

// Getting DOM Elements
const display = document.getElementById('display');
const history = document.getElementById('history');

// Initialize display
display.value = "0";

// Helper function to evaluate expressions without eval
function evaluateExpression(expression) {
    // 1. Check if expression is a simple number
    if (!isNaN(parseFloat(expression)) && isFinite(expression)) {
        return parseFloat(expression);
    }

    // 2. Tokenize the expression
    let tokens = [];
    let currentNumber = "";

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        // 5. Check if current character is operator
        if (["+", "-", "*", "/"].includes(char)) {
            if (currentNumber !== "") {
                tokens.push(parseFloat(currentNumber));
                currentNumber = "";
            }
            tokens.push(char);
        }
        // 6. Add digit or decimal to currentNumber
        else if (!isNaN(char) || char === ".") {
            currentNumber += char;
        }
    }

    // 7. Push the final number
    if (currentNumber !== "") {
        tokens.push(parseFloat(currentNumber));
    }

    // 8. Process * and /
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        if (operator === "*" || operator === "/") {
            const left = tokens[i - 1];
            const right = tokens[i + 1];

            if (operator === "/" && right === 0) {
                throw new Error("Division by zero");
            }

            const result = operator === "*" ? left * right : left / right;
            tokens.splice(i - 1, 3, result);
            i -= 2;
        }
    }

    // 9. Process + and -
    let result = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const right = tokens[i + 1];

        if (operator === "+") {
            result += right;
        } else if (operator === "-") {
            result -= right;
        }
    }

    // 10. Return result
    return result;
}

// Memory: Add to memory
function addToMemory() {
    try {
        const result = parseFloat(evaluateExpression(display.value));
        memory += result;
    } catch (e) {
        display.value = "Error";
    }
}

// Memory: Subtract from memory
function subtractFromMemory() {
    try {
        const result = parseFloat(evaluateExpression(display.value));
        memory -= result;
    } catch (e) {
        display.value = "Error";
    }
}

// Append input to display
function appendToDisplay(value) {
    if (calculationDone && !isNaN(value)) {
        clearDisplay();
        calculationDone = false;
    } else if (calculationDone) {
        calculationDone = false;
    }

    if (waitingForRightOperand) {
        display.value = value;
        waitingForRightOperand = false;
    } else {
        if (display.value === "0" && value !== ".") {
            display.value = value;
        } else {
            display.value += value;
        }
    }

    currentInput = display.value;
}

// Clear display only
function clearDisplay() {
    display.value = "0";
    currentInput = "0";
}

// Clear all except memory
function clearAll() {
    clearDisplay();
    history.textContent = "";
    leftOperand = null;
    currentOperator = null;
    waitingForRightOperand = false;
    lastOperation = "";
}

// Clear memory
function clearMemory() {
    memory = 0;
}

// Recall memory to display
function recallMemory() {
    display.value = memory;
    currentInput = display.value;
}

// Delete last character from input
function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
    currentInput = display.value;
}

// Calculate result
function calculate() {
    try {
        if (currentOperator === "pow" && leftOperand !== null) {
            const rightOperand = parseFloat(display.value);
            history.textContent = `${leftOperand}^${rightOperand}`;
            display.value = Math.pow(leftOperand, rightOperand);
            leftOperand = null;
            currentOperator = null;
        } else {
            history.textContent = display.value;
            display.value = evaluateExpression(display.value);
        }
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
}