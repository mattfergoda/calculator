// Vars for storing numbers and operators entered by user.
let num1 = "";
let num2 = "";
let operator;

// Vars for storing previous operator and number entered by user.
// Used to handle user repeatedly pressing equals to repeat calculation.
let lastOperator;
let lastNum2 = "";

// Bools for handling strings of operations and storing output of
// previous calculations for next calculation.
let operatorPressed;
let equalsPressed;

function add(numA, numB) {
    return numA + numB;
}

function subtract(numA, numB) {
    return numA - numB;
}

function multiply(numA, numB) {
    return numA * numB;
}

function divide(numA, numB) {
    if (numB == 0) {
        return "Err";
    }
    else {
        return numA / numB;
    }
}

function operate(operator, numA, numB) {
    // Handle some edge cases first:

    // Nothing entered yet and user is trying to operate.
    if (numA.length == 0) {
        return "";
    }

    // User repeatedly pressing operator but hasn't entered num2.
    else if (numB.length == 0 && operatorPressed == true) {
        return numA;
    }
    // User repeatedly pressing equals to repeat previous operation
    // on new display output.
    else if (numB.length == 0 && equalsPressed && lastNum2.length != 0) {
        return operate(lastOperator, num1, lastNum2);
        
    }
    // User repeatedly pressing equals to repeat operation
    // but no num2 has been entered in this session.
    else if (numB.length == 0 && equalsPressed && lastNum2.length == 0) {
        return numA;
    }

    // Perform normal operation.
    else {
        numA = Number(numA);
        numB = Number(numB);
        if (operator == "+") {
            result = add(numA, numB);
        }
        else if (operator == "-") {
            result = subtract(numA, numB);
        }
        else if (operator == "x") {
            result = multiply(numA, numB);
        }
        else if (operator == "/") {
            result = divide(numA, numB);
        }
        return String(result); 
    }
}

function switchSign(num) {
    num = (-1) * Number(num);
    return String(num);
}

function updateDisplay(num) {
    document.querySelector("#return").textContent = num;
}
function storeNum1(num) {
    if (num == "+/-") {
        num1 = switchSign(num1);
    }
    else if (num == "<-") {
        num1 = num1.slice(0, -1);
    }
    else if (num == "." && !num1.includes('.')) {
        num1 += String(num);
    }
    else {
        console.log("concat string");
        num1 += String(num);
    }
    updateDisplay(num1)
}

function storeNum2(num) {
    if (num == "+/-") {
        num2 = switchSign(num2);
        updateDisplay(num2);
        return;
    }
    else if (num == "+/-" && !num2) {
        num2 = switchSign(num2);
    }
    else if (num == "<-") {
        num2 = num2.slice(0, -1);
    }
    else if (num == "." && !num2.includes('.')) {
        num2 += String(num);
    }
    else {
        num2 += String(num);
    }
    updateDisplay(num2)
}

function storeNumAfterEquals(num) {
    if (num == "+/-") {
        num1 = switchSign(num1);
        updateDisplay(num1);
    }
    else if (num == "<-") {
        
    }
    else if (num == "." && !num2.includes('.')) {
        num2 += String(num);
    }
    else if (num != ".") {
        num2 += String(num); 
        updateDisplay(num2);
        equalsPressed = false;
    }
}

function addNumberListeners() {
    let nums = document.querySelectorAll('.number');

    // Treating +/- and <- as numbers since their behavior is more
    // like a number than an operator.
    for (let i = 0; i < nums.length; i++) {
        nums[i].addEventListener('click', (e) => {
            let num = nums[i].textContent;
            
            // Entering num1.
            if (!operatorPressed && !equalsPressed) {
                storeNum1(num);
            }
            // Entering num2 after hitting operator before hitting equals.
            else if (!equalsPressed && operatorPressed) {
                storeNum2(num);
            }
            // Entering num1 after hitting equals.
            else if (equalsPressed && !operatorPressed) {
                if (num != "+/-") {
                    clear(); 
                }
                storeNum1(num);    
            }
            // Entering num2 after hitting equals.
            else if (equalsPressed && operatorPressed) {
                storeNumAfterEquals(num);
            }
        });
    }
}

function clear() {
    num1 = "";
    num2 = "";
    lastNum2 = "";
    lastOperator = "";
    operatorPressed = false;
    equalsPressed = false;
}

function addClearListener() {
    let clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', (e) => {
        clear();
        updateDisplay("");
    });
}

function checkErr() {
    if (num1 == "Err") {
        updateDisplay(num1);
        clear();
        return true;
    }
    else {
        return false;
    }
}

function addEqualsListener() {
    let equalsButton = document.querySelector('#equals');
    equalsButton.addEventListener('click', (e) => {

        if (String(num1) != "") {
            equalsPressed = true;
            num1 = operate(operator, num1, num2);

            let err = checkErr();
            if (!err) {
            num1 = Math.round(num1 * 1e15) / 1e15;
            updateDisplay(num1);
            operatorPressed = false;
            lastOperator = operator;
            } 
            // Handles updating num2 in cases where user keeps 
            // hitting equals to repeat the operator.
            
            if (num2.length !=0) {
                // User has updated num2 prior to hitting equals. 
                // Store old num2 in case they hit equals again.
                lastNum2 = num2;
                num2 = "";
            }
        }
    });
}

function addOperatorListeners() {
    let operators = document.querySelectorAll(".operator");
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', (e) => {
            // If user is entering chain of operations, update
            // display value based on previous operator when
            // new operator is pressed.
            if (operatorPressed && String(num1) != "") {
                num1 = operate(operator, num1, num2);
                
                let err = checkErr();
                if (!err) {
                    num1 = Math.round(num1 * 1e15) / 1e15;
                    num2 = "";
                    updateDisplay(num1);
                }
            }
            // Otherwise, user will enter in second number and display
            // won't update yet.
            else {
                operatorPressed = true;
            }
            operator = operators[i].textContent;
        });
    }
}

function addEventListeners() {    
    addNumberListeners();
    addClearListener();
    addEqualsListener();
    addOperatorListeners();
}

addEventListeners();