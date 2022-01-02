import { useEffect, useReducer, useState } from 'react';
import './App.css';
import Button from './Button';
import { initialState, mathReducer } from './Reducer';
import { buttons } from './Utils';

function App() {
  const [state, dispatch] = useReducer(mathReducer, initialState);
  const [curNum, setCurNum] = useState('0');
  const [equals, setEquals] = useState(false);
  const { mathState, val1, val2, currentTotal } = state;

  const handleClick: EventHandler = (e) => {
    const element = e.target as HTMLInputElement;
    const value = element.innerHTML;
    if (value === '.' && curNum.includes('.')) {
      return;
    }

    // if curNum is 0, clear input and replace
    if (curNum === '0') {
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
  const handleClear: EmptyReturnFunction = () => {
    setCurNum('');
    setEquals(false);
    dispatch({ type: 'clear' });
  };

  // compute math operation
  const handleEquals: EmptyReturnFunction = () => {
    setEquals(true);
    dispatch({ type: 'compute' });
  };

  // set listeners for keyboard math ops
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
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
      return val1;
    }

    // scenario: we've entered val1, chosen an op, but haven't hit equals -> show val1
    if (mathState && !equals && !val2) {
      return val1;
    }

    // scenario: we've computed an operation -> val2 gets reset and val1 becomes current total -> show val1 (currentTotal in this case)
    if (mathState && !val2 && equals) {
      return val1;
    }

    // scenario: currentTotal is set -> show currentTotal
    if (currentTotal) {
      return currentTotal;
    }

    // scenario: -> otherwise show val2
    return val2;
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
      case 'root':
        return '√';
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
