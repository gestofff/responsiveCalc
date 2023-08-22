let display = document.querySelector(".display p");

let a = "";
let b = "";
let operation = "";
let isFinished = false;

let currentVar = ""; 

const digitsArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "."];
const operationsArr = ["+", "-", "x", "/", "%"];


// Нажатие кнопок
document.querySelector(".buttons").onclick = (e) => {
    
    // Проверить, нажата ли кнопка
    if (!e.target.classList.contains("button")) return;
    if (e.target.classList.contains("ac")) return;
    if (e.target.classList.contains("del")) return;
    
    display.textContent = "";
    let key = e.target.textContent;
    
    if (digitsArr.includes(key)) { // Если нажата цифра, заполнить переменные
        if (b === "" && operation === "") {
            currentVar = "a";
            a += key;
            display.textContent = a;
        } else if (a !== "" && b !== "" && isFinished === true) {
            currentVar = "b";
            b = key;
            isFinished = false;
            display.textContent = b;
        } else {
            currentVar = "b";
            b += key;
            display.textContent = b;
        }
    }

    if (operationsArr.includes(key)) { // Если нажата операция
        operation = key;
        display.textContent = key;
    }

    if (key === "=") { // Запуск вычислений
        
        if (b === "") b = a; // Позволяет считать нажатиями = много раз

        switch (operation) {
            case "+": {
                a = Number(a) + Number(b);
                break;
            }
            case "-": {
                a = Number(a) - Number(b);
                break;
            }
            case "x": {
                a = Number(a) * Number(b);
                break;
            }
            case "/": {
                if (b === "0" || b === "00") {
                    display.textContent = "error";
                    a = "";
                    b = "";
                    operation = "";
                    return;
                }
                a = Number(a) / Number(b);
                break;
            }
            case "%": {
                a = Number(a) % Number(b);
                break;
            }
        }
        display.textContent = String(a);
        isFinished = true;
    }
}

// AC и DEL
document.querySelector(".ac").onclick = () => {
    a = "";
    b = "";
    operation = "";
    isFinished = false;
    display.textContent = "0";
}
document.querySelector(".del").onclick = () => {
    display.textContent = display.textContent.slice(0, -1);
    if (currentVar === "a") {
        a = a.slice(0, -1);
    } else if (currentVar === "b") {
        b = b.slice(0, -1);
    }
}