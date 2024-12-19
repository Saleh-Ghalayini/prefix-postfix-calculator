const toggle = document.getElementById("toggle");
const result = document.getElementById("result");
const containers = document.querySelectorAll(".container");
const calc_btn = document.querySelectorAll(".calc-btn");
const body = document.body;

toggle.addEventListener("click", () => {
    body.classList.toggle("light-body");
    containers.forEach(cont => {
        cont.classList.toggle("light-container");
    });
    result.classList.toggle("light-content");
    calc_btn.forEach(btn => {
        btn.classList.toggle("light-content");
    });
    toggle.classList.toggle("light-toggle");
});