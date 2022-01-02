import { useEffect, useReducer, useState } from 'react';
import './App.css';
import Button from './Button';
import { initialState, reducer } from './Reducer';
import { buttons } from './Utils';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [curNum, setCurNum] = useState('');
  const { mathState, val1, val2 } = state;

  const handleClick: EventHandler = (e) => {
    const element = e.target as HTMLInputElement;
    const value = element.innerHTML;

    // only allow one decimal per val
    if (value === '.' && curNum.includes('.')) {
      return;
    }

    // if curNum is 0, clear input and replace
    if (!curNum) {
      setCurNum(value);
      mathState
        ? // if mathState is set, that means we've already set val1, so set val2
          dispatch({ type: 'val2', value: Number(value) })
        : dispatch({ type: 'val1', value: Number(value) });
    } else {
      // otherwise concat numStrings before dispatching
      const newVal = curNum + value;
      setCurNum(newVal);
      mathState
        ? // if mathState is set, that means we've already set val1, so set val2
          dispatch({ type: 'val2', value: Number(newVal) })
        : dispatch({ type: 'val1', value: Number(newVal) });
    }
  };

  // handler to dispatch arithmatic operation
  const handleMath: EventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch({ type: 'math', value });
    setCurNum('');
  };

  // handler to clear all calc vals and operators
  const handleClear: DispatchFunction = () => {
    setCurNum('');
    dispatch({ type: 'clear' });
  };

  // compute math operation
  const handleEquals: DispatchFunction = () => {
    dispatch({ type: 'compute' });
  };

  // alternate vals between neg and pos
  const handlePlusMinus: DispatchFunction = () => {
    mathState
      ? dispatch({ type: 'plusMinus', value: 'val2' })
      : dispatch({ type: 'plusMinus', value: 'val1' });
  };

  // set listeners for keyboard math ops
  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case '+':
          dispatch({ type: 'math', value: 'add' });
          setCurNum('');
          break;
        case '*':
          dispatch({ type: 'math', value: 'multiply' });
          setCurNum('');
          break;
        case '-':
          dispatch({ type: 'math', value: 'subtract' });
          setCurNum('');
          break;
        case 'x':
          dispatch({ type: 'math', value: 'multiply' });
          setCurNum('');
          break;
        case '/':
          dispatch({ type: 'math', value: 'divide' });
          setCurNum('');
          break;
        case 'c':
          dispatch({ type: 'clear' });
          break;
        default:
          return;
      }
    });
  }, []);

  const displayText: TextHandler = () => {
    // scenario: we haven't selected an operation -> show val1
    if (!mathState) {
      return val1 ?? 0;
    }

    // scenario: we've entered val1, chosen an op, but haven't hit equals -> show val1
    if (mathState && !val2) {
      return val1 ?? 0;
    }

    // scenario: -> otherwise show val2
    return val2 ?? 0;
  };

  const mathText: TextHandler = () => {
    switch (mathState) {
      case 'add':
        return '+';
      case 'subtract':
        return '-';
      case 'multiply':
        return '*';
      case 'divide':
        return '/';
      case 'power':
        return '^';
      default:
        return '';
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='container'>
          <div className='display'>
            <div className='readouts'>
              <input
                className='readout'
                type='text'
                readOnly
                // if no currentTotal, show vals
                value={displayText()}
              />
              <input
                className='math-readout'
                type='text'
                readOnly
                value={mathText()}
              />
            </div>
            <br></br>
            <div className='calc-container'>
              <div className='btn-container'>
                {buttons.flat().map((btn) => (
                  <Button
                    key={btn}
                    handler={
                      typeof btn === 'number' || btn === '.'
                        ? handleClick
                        : btn === 'C'
                        ? handleClear
                        : btn === '='
                        ? handleEquals
                        : btn === '+-'
                        ? handlePlusMinus
                        : handleMath
                    }
                    value={
                      btn === '^'
                        ? 'power'
                        : btn === '/'
                        ? 'divide'
                        : btn === 'x'
                        ? 'multiply'
                        : btn === '-'
                        ? 'subtract'
                        : btn === '+'
                        ? 'add'
                        : ''
                    }
                    className={btn === '=' ? 'btn-equals' : 'btn'}
                  >
                    {btn}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
