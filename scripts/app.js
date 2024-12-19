let stack;
let op_one = 0;
let op_two = 0;
let result = 0;
let eq_list = [];
let operand_counter;
let eq_operands = [];
let operator_counter;
const operators = ["+", "-", "*", "/"];
const valid_keys = ['/', '*', '-', '+', '.', '=', ' ', '7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00'];

const body = document.body;
const type = document.getElementById("type");
const field = document.getElementById("field");
const equal = document.getElementById("equal");
const toggle = document.getElementById("toggle");
const title = document.querySelectorAll(".title");
const buttons = document.querySelectorAll(".calc-btn");
const containers = document.querySelectorAll(".container");


function displayResult(result) {
    field.value = result;
}

function performOperation(operation, num_one, num_two) {
    if(operation === "+")
        return num_one + num_two;
    else if(operation === "-")
        return num_one - num_two;
    if(operation === "*")
        return num_one * num_two;
    if(operation === "/") {
        if(num_two === 0) {
            alert("Can't divide by zero!");
            return null;
        }
        return num_one / num_two;
    }
}

function evaluatePrefix(list) {
    stack = [];
    for(let i = list.length - 1; i >= 0; i--) {
        if(!isNaN(list[i]))
            stack.push(Number(list[i]));
        else if (operators.includes(list[i])) {
            op_one = stack.pop();
            op_two = stack.pop();
            result = performOperation(list[i], op_one, op_two);
            stack.push(result);
        }
    }
    displayResult(result);
}

function evaluatePostfix(list) {
        stack = [];
        for(let i = 0; i < list.length; i++) {
            if(!isNaN(list[i]))
                stack.push(Number(list[i]));
            else if (operators.includes(list[i])) {
                op_two = stack.pop();
                op_one = stack.pop();
                result = performOperation(list[i], op_one, op_two);
                stack.push(result);
            }
        }
        displayResult(result);
    }

function checkEquation(eq) {
    operand_counter = 0;
    operator_counter = 0;
    eq_list = eq.trim().split(" ");
    
    if(eq.length == 0) {
        alert("You haven't entered anything to evaluate!");
        field.focus();
        return;
    } else if (eq_list.length < 3) {
        alert("You haven't entered enough input to evaluate!");
        field.focus();
        return;
    }


    for(let i = 0; i < eq_list.length; i++) {
        if (!operators.includes(eq_list[i]) && isNaN(eq_list[i])) {
            alert("You have entered an invalid input!");
            field.focus();
            return;
        }
        if (operators.includes(eq_list[i]))
            operator_counter++;
        else if (!isNaN(eq_list[i]))
            operand_counter++;
    }
    
    if (operator_counter !== operand_counter - 1) {
        alert("The number of operators and operands is not proportional");
        return;
    }
    
    if(isNaN(eq_list[0]) && type.innerHTML === "Postfix") {
        alert("This expression is invalid for a postfix evaluation!");
        return;
    } else if (!isNaN(eq_list[0]) && type.innerHTML === "Prefix") {
        alert("This expression is invalid for a prefix evaluation!");
        return;
    }
    if (type.innerHTML === "Postfix") {
        if (!operators.includes(eq_list[eq_list.length - 1])) {
            alert("The last character in a postfix expression must be an operator!");
            return;
        }
    } else if (type.innerHTML === "Prefix") {
        if (isNaN(eq_list[eq_list.length - 1])) {
            alert("The last character in a prefix expression must be a number!");
            return;
        }
    }

    if (operators.includes(eq_list[0]))
        evaluatePrefix(eq_list);
    else if (!isNaN(eq_list[0]))
        evaluatePostfix(eq_list);

}

equal.addEventListener("click", () => {
    checkEquation(field.value);
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const button_id = button.id;

        if (button_id === "clear")
            field.value = "";
        else if (button_id === "delete")
            field.value = field.value.slice(0, -1);
        else if (button_id === "space")
            field.value += " ";
        else if (button_id === "equal")
            field.value += "";
        else
            field.value += button.innerHTML;
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace")
        field.value = field.value.slice(0, -1);
    else if (e.key === "Enter") {
        e.preventDefault();
        checkEquation(field.value); 
    } else if (valid_keys.includes(e.key))
        field.value += e.key;
    else
        e.preventDefault();
});

toggle.addEventListener("click", () => {
    body.classList.toggle("light-body");
    type.classList.toggle("light-toggle");
    toggle.classList.toggle("light-toggle");
    field.classList.toggle("light-field");

    containers.forEach(cont => {
        cont.classList.toggle("light-container");
    });

    title.forEach(t => {
        t.classList.toggle("light-title");
    });

    buttons.forEach(btn => {
        btn.classList.toggle("light-content");
    });
});

type.addEventListener("click", () => {
    if(type.innerHTML === "Postfix")
        type.innerHTML = "Prefix";
    else
        type.innerHTML = "Postfix";
});
