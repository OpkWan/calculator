// Math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by 0";
    }
    return a / b;
}


// Operate Function

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}


// Calculator Logic

const display = document.getElementById('display');
let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let shouldResetDisplay = false;

function clear() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    shouldResetDisplay = false;
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1) || '0';
}

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else {
        display.textContent += number;
    }
}

function chooseOperator(operator) {
    if (currentOperator) {
        evaluate();
    }
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function evaluate() {
    if (!currentOperator || shouldResetDisplay) return;
    if (currentOperator === '/' && display.textContent === '0') {
        alert("Error: Division by 0");
        return;
    }
    secondNumber = display.textContent;
    display.textContent = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
    currentOperator = '';
    shouldResetDisplay = true;
}

function appendDecimal() {
    if (shouldResetDisplay) {
        display.textContent = '0';
        shouldResetDisplay = false;
    }
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => chooseOperator(button.textContent));
});

document.getElementById('equals').addEventListener('click', evaluate);
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('backspace').addEventListener('click', backspace);
document.getElementById('decimal').addEventListener('click', appendDecimal);

clear();
