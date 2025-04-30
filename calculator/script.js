$(document).ready(function () {

    let calculator = {
        output: 0,
        formulaArray: [],
        formula: '',
        history: [],
        operands: ["+", "-", "*", "/", "."],
        resetProgress() {
            $("#progress").html("&nbsp;");
            this.formula = '';
        },
        clearAll() {
            this.output = 0;
            this.formulaArray = [];
            $("#sum").html(this.output);
        },
        checkInput(val) {
            let len = this.formulaArray.length;
            //if the formula contains only one the recent output but the value hit isn't an operand, start a new formula
            if (len === 1 &&
                this.formulaArray[0] === this.output
                && !this.operands.includes(val))
                this.clearAll();

            //if both the last item in the formula and the value clicked are operands, override former with latter
            let lastEntry = this.formulaArray[len - 1];
            if (this.operands.includes(lastEntry) && this.operands.includes(val))
                this.formulaArray.pop();

            //check formula from end until most recent operand for a decimal before allowing another
            if (val === ".") {
                if (!lastEntry.toString().includes(".")) {
                    for (let i = len - 1; i >= 0; i--) {
                        // if an operand is found, check if it's a decimal
                        if (this.operands.includes(this.formulaArray[i]) || i === 0) {
                            // if it's not a decimal, add the current value
                            if (this.formulaArray[i] !== ".") this.formulaArray.push(val);
                            // either way, stop looping
                            break;
                        }
                    }
                }
            } else this.formulaArray.push(val);

        },
        compute() {
            //if last entry is an operand, ignore it
            let lastEntry = this.formulaArray[this.formulaArray.length - 1];
            if (this.operands.includes(lastEntry)) this.formulaArray.pop();

            this.formula = this.formulaArray.join('');
            this.output = eval(this.formula);
            $("#sum").html(this.output);
            this.formulaArray = [this.output];

            this.history.push(`${this.formula} = ${this.output}`);
            for (let entry of this.history) console.log(entry);
        }
    };

    //when any button is pushed, append that button's value to the progress log
    $(".buttons").click(function () {
        //variable holds html value of button clicked
        let val = $(this).html();
        calculator.checkInput(val);
        $("#progress").html(calculator.formulaArray);
    });

    //when = is clicked, replace #sum with output
    $("#compute").click(function () {
        calculator.compute();
        calculator.resetProgress();
    });

    //when AC is clicked, set output to 0, replace sum with it again, clear progress and empty formula
    $("#clearall").click(function () {
        calculator.clearAll();
        calculator.resetProgress();
    });

    //when DEL is clicked, remove last item added to formula
    $("#delete").click(function () {
        calculator.formulaArray.pop();
        $("#progress").html(calculator.formulaArray.length === 0 ? "&nbsp;" : calculator.formulaArray);
    });

    $(document).keyup(function (e) {
        let num = parseInt(e.key);
        if (calculator.operands.includes(e.key) || !isNaN(num)) {
            // all numbers and operands
            let val = e.key;
            calculator.checkInput(val);
            $("#progress").html(calculator.formulaArray);
        } else if (e.key === "Enter" || e.key === "=") {
            calculator.compute();
            calculator.resetProgress();
        } else if (e.key === "Delete" || e.key === "Backspace") {
            calculator.formulaArray.pop();
            $("#progress").html(calculator.formulaArray.length === 0 ? "&nbsp;" : calculator.formulaArray);
        } else if (e.key === "c" || e.key === "C") {
            calculator.clearAll();
            calculator.resetProgress();
        };
    });
});

// improve accuracy of math, use some library
// expand to include higher-order functions like sin, log, power
// add history panel (currently in console)