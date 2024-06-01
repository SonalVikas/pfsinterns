// script.js

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function clear() {
        currentInput = '';
        updateDisplay();
    }

    function backspace() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    function calculate() {
        try {
            const result = eval(currentInput);
            currentInput = result.toString();
            updateDisplay();
        } catch (error) {
            currentInput = 'Error';
            updateDisplay();
        }
    }

    document.querySelectorAll('.number, .operator').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.number || button.dataset.operator;
            if (value === 'clear') {
                clear();
            } else if (value === 'backspace') {
                backspace();
            } else if (value === 'calculate') {
                calculate();
            } else {
                currentInput += value;
                updateDisplay();
            }
        });
    });
});
