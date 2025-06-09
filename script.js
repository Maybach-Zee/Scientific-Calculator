// script.js

let currentInput = '';
let previousInput = '';
let memory = 0;
let angleMode = 'DEG'; // DEG or RAD
let shiftActive = false;

const display = document.getElementById('display');
const previousOperation = document.getElementById('previousOperation');
const angleModeIndicator = document.getElementById('angleMode');
const memoryIndicator = document.getElementById('memoryIndicator');
const errorIndicator = document.getElementById('errorIndicator');

function updateDisplay() {
    display.textContent = currentInput || '0';
    angleModeIndicator.textContent = angleMode;
    memoryIndicator.style.visibility = memory !== 0 ? 'visible' : 'hidden';
}

function inputNumber(num) {
    currentInput += num;
    updateDisplay();
}

function inputDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += currentInput ? '.' : '0.';
    }
    updateDisplay();
}

function inputOperator(op) {
    if (currentInput === '') return;
    currentInput += ` ${op} `;
    updateDisplay();
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    updateDisplay();
    errorIndicator.style.visibility = 'hidden';
}

function clearEntry() {
    currentInput = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.trimEnd();
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function inputParenthesis(paren) {
    currentInput += paren;
    updateDisplay();
}

function inputFunction(func) {
    if (func === 'negate') {
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
    } else {
        currentInput = `${func}(${currentInput})`;
    }
    updateDisplay();
}

function inputConstant(constant) {
    if (constant === 'pi') currentInput += Math.PI;
    else if (constant === 'e') currentInput += Math.E;
    updateDisplay();
}

function memoryStore() {
    memory = eval(currentInput);
    updateDisplay();
}

function memoryRecall() {
    currentInput += memory;
    updateDisplay();
}

function memoryAdd() {
    memory += eval(currentInput);
    updateDisplay();
}

function memoryClear() {
    memory = 0;
    updateDisplay();
}

function toggleAngleMode() {
    angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
    updateDisplay();
}

function toggleShift() {
    shiftActive = !shiftActive;
    const btn = document.getElementById('shiftBtn');
    btn.classList.toggle('active', shiftActive);
}

function calculate() {
    try {
        let expr = currentInput
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/sin\(([^)]+)\)/g, (_, x) => Math.sin(toRadians(x)))
            .replace(/cos\(([^)]+)\)/g, (_, x) => Math.cos(toRadians(x)))
            .replace(/tan\(([^)]+)\)/g, (_, x) => Math.tan(toRadians(x)))
            .replace(/asin\(([^)]+)\)/g, (_, x) => toDegrees(Math.asin(eval(x))))
            .replace(/acos\(([^)]+)\)/g, (_, x) => toDegrees(Math.acos(eval(x))))
            .replace(/atan\(([^)]+)\)/g, (_, x) => toDegrees(Math.atan(eval(x))))
            .replace(/ln\(([^)]+)\)/g, (_, x) => Math.log(eval(x)))
            .replace(/log\(([^)]+)\)/g, (_, x) => Math.log10(eval(x)))
            .replace(/sqrt\(([^)]+)\)/g, (_, x) => Math.sqrt(eval(x)))
            .replace(/cbrt\(([^)]+)\)/g, (_, x) => Math.cbrt(eval(x)))
            .replace(/square\(([^)]+)\)/g, (_, x) => Math.pow(eval(x), 2))
            .replace(/cube\(([^)]+)\)/g, (_, x) => Math.pow(eval(x), 3))
            .replace(/exp\(([^)]+)\)/g, (_, x) => Math.exp(eval(x)))
            .replace(/pow10\(([^)]+)\)/g, (_, x) => Math.pow(10, eval(x)))
            .replace(/abs\(([^)]+)\)/g, (_, x) => Math.abs(eval(x)))
            .replace(/factorial\(([^)]+)\)/g, (_, x) => factorial(eval(x)))
            .replace(/x\^y/g, '^');

        currentInput = eval(expr).toString();
        updateDisplay();
    } catch (e) {
        currentInput = '';
        errorIndicator.style.visibility = 'visible';
        updateDisplay();
    }
}

function factorial(n) {
    n = Math.floor(n);
    if (n < 0) return NaN;
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

function toRadians(val) {
    return angleMode === 'DEG' ? eval(val) * (Math.PI / 180) : eval(val);
}

function toDegrees(val) {
    return angleMode === 'DEG' ? val * (180 / Math.PI) : val;
}

updateDisplay();