const body = document.body;
const field = document.getElementById("field");
const toggle = document.getElementById("toggle");
const calc_btn = document.querySelectorAll(".calc-btn");
const containers = document.querySelectorAll(".container");

toggle.addEventListener("click", () => {
    body.classList.toggle("light-body");
    toggle.classList.toggle("light-toggle");
    field.classList.toggle("light-content");

    containers.forEach(cont => {
        cont.classList.toggle("light-container");
    });

    calc_btn.forEach(btn => {
        btn.classList.toggle("light-content");
    });
});



