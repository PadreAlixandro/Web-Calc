// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    const themeToggle = document.querySelector('.theme-toggle');
    
    let currentInput = '';
    let memory = 0;
    let operator = null;
    let firstOperand = null;
    
    // Theme toggle
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');
      themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });
    
    // Default theme
    document.body.classList.add('light');
    
    // Button click handler
    buttons.forEach(button => {
      button.addEventListener('click', () => handleInput(button.value));
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      if (/[0-9]|\.|\/|\*|-|\+|Enter|=/.test(key)) {
        e.preventDefault();
        handleInput(key === 'Enter' ? '=' : key);
      }
    });
    
    function handleInput(value) {
      switch(value) {
        case 'C':
          resetCalculator();
          break;
          
        case 'mrc':
          handleMemoryRecall();
          break;
          
        case 'm+':
          memory += parseFloat(display.value || 0);
          showMemoryIndicator();
          break;
          
        case 'm-':
          memory -= parseFloat(display.value || 0);
          showMemoryIndicator();
          break;
          
        case '+':
        case '-':
        case '*':
        case '/':
          handleOperator(value);
          break;
          
        case '=':
          calculateResult();
          break;
          
        default:
          updateDisplay(value);
      }
    }
    
    function resetCalculator() {
      currentInput = '';
      firstOperand = null;
      operator = null;
      display.value = '';
    }
    
    function handleMemoryRecall() {
      if (display.value === memory.toString()) {
        memory = 0;
        display.value = '';
        display.placeholder = '';
      } else {
        display.value = memory;
      }
    }
    
    function showMemoryIndicator() {
      display.placeholder = 'm';
    }
    
    function handleOperator(op) {
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput || '0');
        operator = op;
        currentInput = '';
      } else if (currentInput !== '') {
        calculateResult();
        operator = op;
        currentInput = '';
      }
    }
    
    function calculateResult() {
      if (firstOperand !== null && operator && currentInput !== '') {
        const secondOperand = parseFloat(currentInput);
        switch(operator) {
          case '+':
            firstOperand += secondOperand;
            break;
          case '-':
            firstOperand -= secondOperand;
            break;
          case '*':
            firstOperand *= secondOperand;
            break;
          case '/':
            firstOperand = secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
            break;
        }
        display.value = firstOperand;
        currentInput = firstOperand.toString();
        firstOperand = null;
        operator = null;
      }
    }
    
    function updateDisplay(value) {
      if (value === '.' && currentInput.includes('.')) return;
      currentInput += value;
      display.value = currentInput;
    }
  });