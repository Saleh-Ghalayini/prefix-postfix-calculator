const toggle = document.getElementById("toggle");
const result = document.getElementById("result");
const container = document.getElementById("container");
const calc_btn = document.querySelectorAll(".calc-btn");
const body = document.body;

toggle.addEventListener("click", () => {
    document.body.style.backgroundColor = "#FDFDFD";
    container.style.backgroundColor = "#cde9fa";
    result.style.backgroundColor = "#FFFFFF";
    calc_btn.forEach(btn => {
        btn.style.backgroundColor = "#FFFFFF";
        btn.style.color = "#005A8C";
    });
    toggle.innerHTML = "Toggle Dark";
});