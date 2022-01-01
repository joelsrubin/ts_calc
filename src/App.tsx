import { useEffect, useReducer, useState } from 'react';

import './App.css';

const initialState = {
  mathState: '',
  currentTotal: 0,
  val1: 0,
  val2: 0,
};

function mathReducer(state: InitialState, action: any) {
  switch (action.type) {
    case 'val1':
      return {
        ...state,
        val1: action.value,
      };
    case 'val2':
      return {
        ...state,
        val2: action.value,
      };
    case 'math':
      return {
        ...state,
        mathState: action.mathState,
      };
    case 'compute':
      switch (state.mathState) {
        case 'add':
          return {
            ...state,
            mathState: '',
            currentTotal: state.val1 + state.val2,
            val1: state.val1 + state.val2,
          };
        case 'subtract':
          return {
            ...state,
            mathState: '',
            currentTotal: state.val1 - state.val2,
            val1: state.val1 - state.val2,
          };
        case 'multiply':
          return {
            ...state,
            mathState: '',
            currentTotal: state.val1 * state.val2,
            val1: state.val1 * state.val2,
          };
        case 'divide':
          return {
            ...state,
            mathState: '',
            currentTotal: state.val1 / state.val2,
            val1: state.val1 / state.val2,
          };
        default:
          return state;
      }
    case 'clear':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(mathReducer, initialState);
  const [curNum, setCurNum] = useState('0');
  const [equals, setEquals] = useState(false);

  const handleClick = (e: any) => {
    const value = e.target.innerHTML;
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

  const handleMath = (e: any) => {
    const { value } = e.target;
    dispatch({ type: 'math', mathState: value });
    setCurNum('');
  };

  const handleClear = () => {
    setCurNum('');
    setEquals(false);
    dispatch({ type: 'clear' });
  };

  const handleEquals = () => {
    setEquals(true);
    dispatch({ type: 'compute' });
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case '+':
          dispatch({ type: 'math', mathState: 'add' });
          setCurNum('');
          break;
        case '*':
          dispatch({ type: 'math', mathState: 'multiply' });
          setCurNum('');
          break;
        case '-':
          dispatch({ type: 'math', mathState: 'subtract' });
          setCurNum('');
          break;
        case 'x':
          dispatch({ type: 'math', mathState: 'multiply' });
          setCurNum('');
          break;
        case '/':
          dispatch({ type: 'math', mathState: 'divide' });
          setCurNum('');
          break;
        default:
          return;
      }
    });
  }, []);

  const displayText = () => {
    if (!state.mathState) {
      return state.val1;
    }
    if (state.mathState && !equals && !state.val2) {
      return state.val1;
    }
    if (state.mathState && !equals) {
      return state.val2;
    }
    return '0';
  };

  useEffect(() => {});

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
                value={state.mathState}
              />
            </div>
            <br></br>
            <div className='calc-container'>
              <div className='btn-container'>
                <button className='btn' onClick={handleClick}>
                  9
                </button>
                <button className='btn' onClick={handleClick}>
                  8
                </button>
                <button className='btn' onClick={handleClick}>
                  7
                </button>
                <button className='btn' onClick={handleClick}>
                  6
                </button>
                <button className='btn' onClick={handleClick}>
                  5
                </button>
                <button className='btn' onClick={handleClick}>
                  4
                </button>
                <button className='btn' onClick={handleClick}>
                  3
                </button>
                <button className='btn' onClick={handleClick}>
                  2
                </button>
                <button className='btn' onClick={handleClick}>
                  1
                </button>
                <button className='btn' onClick={handleClick}>
                  0
                </button>
                <button className='btn' onClick={handleClear}>
                  C
                </button>
                <button className='btn' onClick={handleEquals}>
                  =
                </button>
              </div>
              <div className='math-container'>
                <button className='math-btn' onClick={handleMath} value='add'>
                  +
                </button>
                <button
                  className='math-btn'
                  onClick={handleMath}
                  value='multiply'
                >
                  x
                </button>
                <button
                  className='math-btn'
                  onClick={handleMath}
                  value='divide'
                >
                  /
                </button>
                <button
                  className='math-btn'
                  onClick={handleMath}
                  value='subtract'
                >
                  -
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
