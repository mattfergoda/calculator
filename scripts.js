let num1 = 0;
let num2;
let operator;
let operatorPressed = false;
let equalsPressed = false;

function add(numA, numB) {
    return Number(numA) + Number(numB);
}

function subtract(numA, numB) {
    return numA - numB;
}

function multiply(numA, numB) {
    return numA * numB;
}

function divide(numA, numB) {
    if (numB == 0) {
        return "No division by zero.";
    }
    else {
        return numA / numB;
    }
}

function operate(operator, numA, numB) {
    let result;
    if (operator == "add") {
        result = add(numA, numB);
    }
    else if (operator == "subtract") {
        result = subtract(numA, numB);
    }
    else if (operator == "multiply") {
        result = multiply(numA, numB);
    }
    else if (operator == "divide") {
        result = divide(numA, numB);
    }
    console.log(`the result is ${result}`);
    return result;
}

function addNumberListeners() {
    let nums = document.querySelectorAll('.number');
    for (let i = 0; i < nums.length; i++) {
        nums[i].addEventListener('click', (e) => {
            if (!num1 && !operatorPressed) {
                num1 = nums[i].textContent;
                console.log("changing num1 1");
                document.querySelector("#return").textContent = num1;
            }

            else if (num1 && !operatorPressed && !equalsPressed && !num2) {
                num1 = num1 + String(nums[i].textContent);
                console.log("changing num1 2");
                document.querySelector("#return").textContent = num1;
            }
            
            else if (num1 && equalsPressed && !operatorPressed && !num2) {
                num1 = nums[i].textContent;
                console.log("changing num1 3");
                document.querySelector("#return").textContent = num2;
                equalsPressed = false;
            }
            
            else if (num1 && !num2 && operatorPressed && !equalsPressed) {
                num2 = nums[i].textContent;
                console.log("changing num2 1");
                document.querySelector("#return").textContent = num2;
            }

            else if (num1 && num2 && operatorPressed && !equalsPressed) {
                num2 = num2 + String(nums[i].textContent);
                console.log("changing num2 2");
                document.querySelector("#return").textContent = num2;
            }

            else if (equalsPressed && operatorPressed && !num2) {
                num2 = nums[i].textContent;
                console.log("changing num2 3");
                document.querySelector("#return").textContent = num2;
            } 

            else if (equalsPressed && operatorPressed && num2) {
                num2 = num2 + String(nums[i].textContent);
                console.log("changing num2 4");
                document.querySelector("#return").textContent = num2;
            }
        });
    }
}

function addClearListener() {
    let clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', (e) => {
        num1 = null;
        num2 = null;
        operatorPressed = false;
        equalsPressed = false;
        document.querySelector("#return").textContent = 0;
    });
}

function addEqualsListener() {
    let equalsButton = document.querySelector('#equals');
    equalsButton.addEventListener('click', (e) => {
        num1 = operate(operator, num1, num2)
        document.querySelector("#return").textContent = num1;
        num2 = null;
        equalsPressed = true;
    });
}

function addOperatorListeners() {
    let addButton = document.querySelector('#plus');
    addButton.addEventListener('click', (e) => {
        if (operatorPressed) {
            num1 = operate(operator, num1, num2);
            num2 = null;
            operator = "add";
            document.querySelector("#return").textContent = num1;
        }
        else {
            operator = "add";
            operatorPressed = true;
        }
    })

    let subtractButton = document.querySelector('#minus');
    subtractButton.addEventListener('click', (e) => {
        if (operatorPressed) {
            num1 = operate(operator, num1, num2);
            num2 = null;
            operator = "subtract";
            document.querySelector("#return").textContent = num1;
        }
        else {
            operator = "subtract";
            operatorPressed = true;
        }
    })

    let multiplyButton = document.querySelector('#times');
    multiplyButton.addEventListener('click', (e) => {
        if (operatorPressed) {
            num1 = operate(operator, num1, num2);
            num2 = null;
            operator = "multiply";
            document.querySelector("#return").textContent = num1;
        }
        else {
            operator = "multiply";
            operatorPressed = true;
        }
    })

    let divideButton = document.querySelector('#divide');
    divideButton.addEventListener('click', (e) => {
        if (operatorPressed) {
            num1 = operate(operator, num1, num2);
            num2 = null;
            operator = "divide";
            document.querySelector("#return").textContent = num1;
        }
        else {
            operator = "divide";
            operatorPressed = true;
        }
    })
}

function addEventListeners() {    
    addNumberListeners();
    addClearListener();
    addEqualsListener();
    addOperatorListeners();
}

addEventListeners();