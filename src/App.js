import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    value: null,
    display: '0',
    operating: false,
    operator: null
  }
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      console.log(e.key)
      let key = Number(e.key)
      if (key >= 0 && key <= 9) {
        this.inputKey(key)
      }
      let operate = ["+", "-", "*", "/", "="]
      if (operate.indexOf(e.key) !== -1) {
        this.operation(e.key)
      }
    });
  }

  inputKey(numberKey) {
    const { display, operating } = this.state
    if (operating) {
      this.setState({
        display: String(numberKey),
        operating: false
      })
    } else {
      this.setState({
        display: display === '0' ? String(numberKey) : display + numberKey
      })
    }
  }

  decimal() {
    const { display, operating } = this.state
    if (operating) {
      this.setState({
        display: display + '.',
        operating: false
      })
    }
    else if (display.indexOf('.') === -1) {

      this.setState({
        display: display + '.',
        operating: false
      })
    }
  }
  clearButton() {
    this.setState({
      display: '0'
    })
  }


  toggleSign() {
    const { display } = this.state
    this.setState({
      display: display.charAt(0) === '-' ? display.substr(1) : '-' + display

    })
  }

  operation(nextOperator) {
    const { display, operator, value } = this.state
    const inputValue = parseFloat(display)

    const CalculatorOperations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue
    }

    if (value == null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)

      this.setState({
        value: newValue,
        display: String(newValue)
      })
    }

    this.setState({
      operating: true,
      operator: nextOperator

    })
  }



  render() {
    const { display } = this.state
    return (
      <div id="wrapper">
        <div id="app">
          <div className="calc">
            <div className="calc-display" >{display}</div>
            <div className="calc-keyPad">
              <div className="input">
                <div className="func-key">
                  <button className="calc-key key-clear" onClick={() => this.clearButton()}>AC</button>
                  <button className="calc-key key-sign" onClick={() => this.toggleSign()}>±</button>
                </div>
                <div className="number-key">
                  <button className="calc-key key-0" onClick={() => this.inputKey(0)}>0</button>
                  <button className="calc-key  key-decimal" onClick={() => this.decimal(0)}>.</button>
                  <button className="calc-key key-1" onClick={() => this.inputKey(1)}>1</button>
                  <button className="calc-key key-2" onClick={() => this.inputKey(2)}>2</button>
                  <button className="calc-key key-3" onClick={() => this.inputKey(3)}>3</button>
                  <button className="calc-key key-4" onClick={() => this.inputKey(4)}>4</button>
                  <button className="calc-key key-5" onClick={() => this.inputKey(5)}>5</button>
                  <button className="calc-key key-6" onClick={() => this.inputKey(6)}>6</button>
                  <button className="calc-key key-7" onClick={() => this.inputKey(7)}>7</button>
                  <button className="calc-key key-8" onClick={() => this.inputKey(8)}>8</button>
                  <button className="calc-key key-9" onClick={() => this.inputKey(9)}>9</button>

                </div>
              </div>
              <div className="operator-keys">
                <button className="calc-key key-divide " onClick={() => this.operation('/')}>/</button>
                <button className="calc-key key-multiply " onClick={() => this.operation('*')}>*</button>
                <button className="calc-key key-minus " onClick={() => this.operation('-')}>-</button>
                <button className="calc-key key-add " onClick={() => this.operation('+')}>+</button>
                <button className="calc-key key-equal " onClick={() => this.operation('=')}>=</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
