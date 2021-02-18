const numberBtns = document.querySelectorAll("[data-number");
const operationBtns = document.querySelectorAll("[data-operation");
const selfOperationBtns = document.querySelectorAll("[data-self-operation");
const equalBtn = document.querySelector("[data-equal]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");
const clearEntryBtn = document.querySelector("[data-clear-entry]");
const previousOperand = document.querySelector("[data-previous-operand]");
const currentOperand = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperand, currentOperand);

numberBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    });
});

operationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    });
});

selfOperationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        calculator.chooseSelfOperation(btn.innerText);
        calculator.updateDisplay();
    });
});

equalBtn.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});

clearBtn.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

clearEntryBtn.addEventListener("click", () => {
    calculator.clearEntry();
    calculator.updateDisplay();
});
