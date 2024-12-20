
let stack = [];
let solving_steps = [];
let op_one = 0;
let op_two = 0;
let result = 0;
let eq_list = [];
let operand_counter;
let eq_operands = [];
let operator_counter;
const operators = ["+", "-", "*", "/"];
let title_text = `Please enter a valid input. Use spaces between operands and operators, e.g., <code>3 5 + 2 *</code>`;

const body = document.body;
const type = document.getElementById("type");
const field = document.getElementById("field");
const equal = document.getElementById("equal");
const toggle = document.getElementById("toggle");
const title = document.getElementById("title");
const process_div = document.getElementById("process");
const buttons = document.querySelectorAll(".calc-btn");
const containers = document.querySelectorAll(".container");


function updateProcess() {
    title.classList.remove("error");
    title.innerHTML = title_text;
    process_div.innerHTML = ``;

    solving_steps.forEach((step, index) => {
        const stepElement = document.createElement("p");
        stepElement.innerHTML = `Step ${index + 1}: <br />${step}`;
        process_div.appendChild(stepElement);
    });
}

function displayResult(result) {
    field.value = `${Number.isInteger(result) ? result : result.toFixed(2)}`;
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
    solving_steps = [];
    for(let i = list.length - 1; i >= 0; i--) {
        if(!isNaN(list[i]))
            stack.push(Number(list[i]));
        else if (operators.includes(list[i])) {
            op_one = stack.pop();
            op_two = stack.pop();
            result = performOperation(list[i], op_one, op_two);
            solving_steps.push(`Evaluate ${list[i]} ${op_one} ${op_two} = 
                <br />${op_one} ${list[i]} ${op_two} = 
                <br />${Number.isInteger(result) ? result : result.toFixed(2)}`);
            stack.push(result.toFixed(2));
        }
    }
    displayResult(result);
    updateProcess();
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
            solving_steps.push(`Evaluate ${op_two} ${op_one} ${list[i]} = 
                <br />${op_two} ${list[i]} ${op_one} = 
                <br />${Number.isInteger(result) ? result : result.toFixed(2)}`);
            stack.push(result);
        }
    }
    displayResult(result);
    updateProcess();
}

function applyError(e_code) {
    title.classList.add("error");
    field.focus();

    if(e_code === 1)
        return title.innerHTML = `You haven't entered anything to evaluate!`;
    else if (e_code === 2)
        return title.innerHTML = `You haven't entered enough input to evaluate!`;
    else if (e_code === 3)
        return title.innerHTML = `You have entered an invalid input!`;
    else if (e_code === 4)
        return title.innerHTML = `The number of operators and operands is not proportional`;
    else if (e_code === 5)
        return title.innerHTML = `This expression is invalid for a postfix evaluation!`;
    else if (e_code === 6)
        return title.innerHTML = `This expression is invalid for a prefix evaluation!`;
    else if (e_code === 7)
        return title.innerHTML = `The last character in a postfix expression must be an operator!`;
    else if (e_code === 8)
        return title.innerHTML = `The last character in a prefix expression must be a number!`;
}

function checkEquation(eq) {
    operand_counter = 0;
    operator_counter = 0;
    eq_list = eq.trim().split(" ");
    
    if(eq.trim() == "")
       return applyError(1);
    else if (eq_list.length < 3) 
        return applyError(2);
    for(let i = 0; i < eq_list.length; i++) {
        if (!operators.includes(eq_list[i]) && isNaN(eq_list[i]))         
            return applyError(3);
        if (operators.includes(eq_list[i]))
            operator_counter++;
        else if (!isNaN(eq_list[i]))
            operand_counter++;
    }
    
    if (operator_counter !== operand_counter - 1)
        return applyError(4);
    
    if(isNaN(eq_list[0]) && type.innerHTML === "Postfix")
        return applyError(5);
    else if (!isNaN(eq_list[0]) && type.innerHTML === "Prefix")
        return applyError(6);
    if (type.innerHTML === "Postfix") {
        if (!operators.includes(eq_list[eq_list.length - 1]))
            return applyError(7);
    } else if (type.innerHTML === "Prefix") {
        if (isNaN(eq_list[eq_list.length - 1]))
            return applyError(8);
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
    if (e.key === "Enter") {
        e.preventDefault();
        checkEquation(field.value); 
    } else
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
