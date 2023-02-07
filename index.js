let buttons = document.querySelectorAll(".button");
let display = document.getElementById("display");

for (let x = 0; x < buttons.length; x++) {

    buttons[x].addEventListener("click", (e) => {

        if (e.target.value == "=") {
            display.innerHTML = evaluate(display.innerHTML);
        }
        else if (e.target.value == "c") {
            display.innerHTML = " ";
        }
        else if (e.target.value == "d") {
            let result = display.innerHTML;
            display.innerHTML = result.slice(0, result.length - 1);
        }
        else {
            display.innerHTML += e.target.value;
        }
    });
}

function evaluate(exp) {
    let inputs = exp.split('');
    let ops = [];
    let value = [];
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] >= '0' && inputs[i] <= '9') {
            let sub = "";

            while (i < inputs.length &&
                inputs[i] >= '0' &&
                inputs[i] <= '9') {
                sub = sub + inputs[i];
                i++;

            }
            value.push(parseInt(sub, 10));

            i--;

        }
        else if (inputs[i] == '(') {
            ops.push(inputs[i]);
        }
        else if (inputs[i] == ')') {
            while (ops[ops.length - 1] != '(') {
                value.push(applyOp(ops.pop(),
                    value.pop(),
                    value.pop()));
            }
            ops.pop();
        }
        else if (inputs[i] == '+' ||
            inputs[i] == '-' ||
            inputs[i] == '*' ||
            inputs[i] == '/') {


            while (ops.length > 0 &&
                hasPrecedence(inputs[i],
                    ops[ops.length - 1])) {
                value.push(applyOp(ops.pop(),
                    value.pop(),
                    value.pop()));
            }


            ops.push(inputs[i]);
        }
    }
    while (ops.length > 0) {
        value.push(applyOp(ops.pop(),
            value.pop(),
            value.pop()));
    }

    return value.pop();

}

function hasPrecedence(op1, op2) {
    if (op2 == '(' || op2 == ')') {
        return false;
    }
    if ((op1 == '/') &&
        (op2 == '*' || op2 == '+' || op2 == '-')) {
        return false;
    }
    else if ((op1 == '*') &&
        (op2 == '+' || op2 == '-')) {
        return false;
    }
    else if ((op1 == '+') &&
        (op2 == '-')) {
        return false;
    }
    else {
        return true;
    }
}


function applyOp(op, b, a) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0) {
                document.write("Cannot divide by zero");
            }
            return parseInt(a / b, 10);
    }
    return 0;
}
