let eq_list = [];
let result = 0;
let equation = "";
let operand_counter;
let eq_operands = [];
let operator_counter;
const operators = ["+", "-", "*", "/"];

const body = document.body;
const type = document.getElementById("type");
const field = document.getElementById("field");
const equal = document.getElementById("equal");
const toggle = document.getElementById("toggle");
const title = document.querySelectorAll(".title");
const calc_btn = document.querySelectorAll(".calc-btn");
const containers = document.querySelectorAll(".container");


function evaluate(list) {
    
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
        if (operators.includes(eq_list[i])) {
            operator_counter++;
        }else if (!isNaN(eq_list[i])) {
            operand_counter++;
        }
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

    evaluate(eq_list);
    
}

equal.addEventListener("click", () => {
    equation = field.value;
    checkEquation(equation);
});

toggle.addEventListener("click", () => {
    body.classList.toggle("light-body");
    type.classList.toggle("light-toggle");
    toggle.classList.toggle("light-toggle");
    field.classList.toggle("light-content");

    containers.forEach(cont => {
        cont.classList.toggle("light-container");
    });

    title.forEach(t => {
        t.classList.toggle("light-title");
    });

    calc_btn.forEach(btn => {
        btn.classList.toggle("light-content");
    });
});

type.addEventListener("click", () => {
    if(type.innerHTML === "Postfix") {
        type.innerHTML = "Prefix";
    } else {
        type.innerHTML = "Postfix";
    }
});


