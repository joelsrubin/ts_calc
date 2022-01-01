import { useEffect, useReducer, useState } from 'react';
import './App.css';
import { initialState, mathReducer } from './Reducer';

function App() {
  const [state, dispatch] = useReducer(mathReducer, initialState);
  const [curNum, setCurNum] = useState('0');
  const [equals, setEquals] = useState(false);
  const { mathState, val1, val2 } = state;

  const handleClick: EventHandler = (e) => {
    const element = e.target as HTMLInputElement;
    const value = element.innerHTML;

    if (curNum === '0') {
      setCurNum(value);
      state.mathState
        ? dispatch({ type: 'val2', value: Number(value) })
        : dispatch({ type: 'val1', value: Number(value) });
    } else {
      const newVal = curNum + value;
      setCurNum(newVal);
      state.mathState
        ? dispatch({ type: 'val2', value: Number(newVal) })
        : dispatch({ type: 'val1', value: Number(newVal) });
    }
  };

  const handleMath: any = (e: any) => {
    const { value } = e.target as HTMLInputElement;
    dispatch({ type: 'math', value });
    setCurNum('');
  };

  const handleClear: ClickHandler = () => {
    setCurNum('');
    setEquals(false);
    dispatch({ type: 'clear' });
  };

  const handleEquals: ClickHandler = () => {
    setEquals(true);
    dispatch({ type: 'compute' });
  };

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
    if (!mathState) {
      return val1;
    }
    if (mathState && !equals && !val2) {
      return val1;
    }
    if (mathState && !equals) {
      return val2;
    }
    return '0';
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
                value={state.currentTotal || displayText()}
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
                <button className='btn' onClick={handleClear}>
                  C
                </button>
                <button className='btn' onClick={handleMath} value='power'>
                  ^
                </button>
                <button className='btn'>%</button>
                <button className='btn' onClick={handleMath} value='divide'>
                  /
                </button>
                <button className='btn' onClick={handleClick}>
                  7
                </button>
                <button className='btn' onClick={handleClick}>
                  8
                </button>
                <button className='btn' onClick={handleClick}>
                  9
                </button>
                <button className='btn' onClick={handleMath} value='multiply'>
                  x
                </button>
                <button className='btn' onClick={handleClick}>
                  4
                </button>
                <button className='btn' onClick={handleClick}>
                  5
                </button>
                <button className='btn' onClick={handleClick}>
                  6
                </button>
                <button className='btn' onClick={handleMath} value='subtract'>
                  -
                </button>
                <button className='btn' onClick={handleClick}>
                  1
                </button>
                <button className='btn' onClick={handleClick}>
                  2
                </button>
                <button className='btn' onClick={handleClick}>
                  3
                </button>
                <button className='btn' onClick={handleMath} value='add'>
                  +
                </button>
                <button className='btn' onClick={handleClick}>
                  0
                </button>
                <button className='btn'>.</button>
                <button className='btn-equals' onClick={handleEquals}>
                  =
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
