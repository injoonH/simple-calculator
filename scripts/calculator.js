class Calculator {
    constructor(prevOpElement, curOpElement) {
        this.prevOpElement = prevOpElement;
        this.curOpElement = curOpElement;
        this.clear();
    }

    clear() {
        this.curOp = "0";
        this.prevOp = "";
        this.operation = undefined;
        this.pressedEqual = true;
    }

    clearEntry() {
        this.curOp = "0";
        this.pressedEqual = true;
    }

    delete() {
        this.curOp = this.curOp.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.curOp.toString().includes(".")) return;
        if (this.pressedEqual) {
            this.pressedEqual = false;
            this.curOp = "";
        }
        this.curOp = this.curOp.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.curOp === "") return;
        if (this.prevOp !== "") {
            this.compute();
        }
        this.operation = operation;
        this.prevOp = this.curOp;
        this.curOp = "0";
        this.pressedEqual = true;
    }

    chooseSelfOperation(operation) {
        if (this.curOp === "") return;
        const cur = parseFloat(this.curOp);
        if (isNaN(cur)) return;
        switch (operation) {
            case "%":
                const prev = parseFloat(this.prevOp);
                if (isNaN(prev)) return;
                this.curOp = prev * cur * 0.01;
                break;
            case "1/x":
                this.curOp = 1 / cur;
                break;
            case "x²":
                this.curOp = cur * cur;
                break;
            case "√x":
                this.curOp = Math.sqrt(cur);
                break;
            case "＋/－":
                this.curOp = cur * -1;
                break;
            default:
                break;
        }
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevOp);
        const cur = parseFloat(this.curOp);
        if (isNaN(prev) || isNaN(cur)) return;
        switch (this.operation) {
            case "＋":
                computation = prev + cur;
                break;
            case "－":
                computation = prev - cur;
                break;
            case "×":
                computation = prev * cur;
                break;
            case "÷":
                if (cur === 0 && prev === 0) return;
                computation = prev / cur;
                break;
            case "%":
                break;
            default:
                return;
        }
        this.curOp = computation;
        this.operation = undefined;
        this.prevOp = "";
        this.pressedEqual = true;
    }

    getDisplayNumber(number) {
        const strNum = number.toString();
        const intNum = parseFloat(strNum.split(".")[0]);
        const decimalNum = strNum.split(".")[1];
        let intDisplay;

        if (isNaN(intNum)) intDisplay = "";
        else
            intDisplay = intNum.toLocaleString("en", {
                maximumFractionDigits: 0,
            });

        if (decimalNum != null) return `${intDisplay}.${decimalNum}`;
        return intDisplay;
    }

    updateDisplay() {
        this.curOpElement.innerText = this.getDisplayNumber(this.curOp);
        if (this.operation != null)
            this.prevOpElement.innerText = `${this.getDisplayNumber(
                this.prevOp
            )} ${this.operation}`;
        else this.prevOpElement.innerText = "";
    }
}
