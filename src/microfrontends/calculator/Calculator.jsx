import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);
    
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button className="calculator-key key-clear" onClick={clearDisplay}>
              AC
            </button>
            <button className="calculator-key key-sign" onClick={() => setDisplay(String(-1 * parseFloat(display)))}>
              ±
            </button>
            <button className="calculator-key key-percent" onClick={() => setDisplay(String(parseFloat(display) / 100))}>
              %
            </button>
          </div>
          <div className="digit-keys">
            <button className="calculator-key key-0" onClick={() => inputDigit(0)}>
              0
            </button>
            <button className="calculator-key key-dot" onClick={inputDecimal}>
              .
            </button>
            <button className="calculator-key key-1" onClick={() => inputDigit(1)}>
              1
            </button>
            <button className="calculator-key key-2" onClick={() => inputDigit(2)}>
              2
            </button>
            <button className="calculator-key key-3" onClick={() => inputDigit(3)}>
              3
            </button>
            <button className="calculator-key key-4" onClick={() => inputDigit(4)}>
              4
            </button>
            <button className="calculator-key key-5" onClick={() => inputDigit(5)}>
              5
            </button>
            <button className="calculator-key key-6" onClick={() => inputDigit(6)}>
              6
            </button>
            <button className="calculator-key key-7" onClick={() => inputDigit(7)}>
              7
            </button>
            <button className="calculator-key key-8" onClick={() => inputDigit(8)}>
              8
            </button>
            <button className="calculator-key key-9" onClick={() => inputDigit(9)}>
              9
            </button>
          </div>
        </div>
        <div className="operator-keys">
          <button className="calculator-key key-divide" onClick={() => performOperation('/')}>
            ÷
          </button>
          <button className="calculator-key key-multiply" onClick={() => performOperation('*')}>
            ×
          </button>
          <button className="calculator-key key-subtract" onClick={() => performOperation('-')}>
            −
          </button>
          <button className="calculator-key key-add" onClick={() => performOperation('+')}>
            +
          </button>
          <button className="calculator-key key-equals" onClick={handleEquals}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
