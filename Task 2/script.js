let display = document.getElementById('display');
let displayValue = '';
let memory = 0;

// Add keyboard event listener
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
    e.preventDefault(); // Prevent default keyboard behavior

    // Numbers and basic operators
    const key = e.key;
    
    // Handle different key inputs
    switch(key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            appendNumber(key);
            break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '(':
        case ')':
            appendOperator(key);
            break;
        case 'Enter':
        case '=':
            calculate();
            break;
        case 'Backspace':
            deleteLast();
            break;
        case 'Escape':
            clearDisplay();
            break;
        case 's':
            if (e.ctrlKey) appendFunction('sin');
            break;
        case 'c':
            if (e.ctrlKey) appendFunction('cos');
            break;
        case 't':
            if (e.ctrlKey) appendFunction('tan');
            break;
        case 'p':
            if (e.ctrlKey) appendConstant('π');
            break;
    }
}

function clearDisplay() {
    displayValue = '';
    display.innerText = '0';
}

function deleteLast() {
    displayValue = displayValue.slice(0, -1);
    display.innerText = displayValue || '0';
}

function appendNumber(number) {
    displayValue += number;
    display.innerText = displayValue;
}

function appendOperator(operator) {
    if (displayValue && !['+', '-', '*', '/', '**'].includes(displayValue.slice(-1))) {
        displayValue += operator;
        display.innerText = displayValue;
    }
}

function appendFunction(func) {
    displayValue += `${func}(`;
    display.innerText = displayValue;
}

function appendConstant(constant) {
    if (constant === 'π') {
        displayValue += Math.PI;
    } else if (constant === 'e') {
        displayValue += Math.E;
    }
    display.innerText = displayValue;
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function calculate() {
    try {
        let expression = displayValue
            .replace(/sin\((.*?)\)/g, (match, angle) => {
                return Math.sin(toRadians(eval(angle))).toFixed(10);
            })
            .replace(/cos\((.*?)\)/g, (match, angle) => {
                return Math.cos(toRadians(eval(angle))).toFixed(10);
            })
            .replace(/tan\((.*?)\)/g, (match, angle) => {
                return Math.tan(toRadians(eval(angle))).toFixed(10);
            });

        displayValue = eval(expression).toString();
        
        if (Math.abs(parseFloat(displayValue)) < 1e-10) {
            displayValue = parseFloat(displayValue).toExponential(10);
        }
        
        display.innerText = displayValue;
    } catch (e) {
        display.innerText = 'Error';
        displayValue = '';
    }
}

// Add visual feedback for keyboard presses
function addKeyPressAnimation(key) {
    const button = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent === key || 
        (btn.textContent === '×' && key === '*') ||
        (btn.textContent === '÷' && key === '/')
    );
    
    if (button) {
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    }
}