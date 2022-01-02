export const initialState = {
  mathState: '',
  val1: 0,
  val2: 0,
};

export function mathReducer(state: InitialState, action: any) {
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
        mathState: action.value,
      };
    case 'compute':
      switch (state.mathState) {
        case 'add':
          return {
            ...state,
            mathState: '',
            val1: state.val1 + state.val2,
            val2: 0,
          };
        case 'subtract':
          return {
            ...state,
            mathState: '',
            val1: state.val1 - state.val2,
            val2: 0,
          };
        case 'multiply':
          return {
            ...state,
            mathState: '',
            val1: state.val1 * state.val2,
            val2: 0,
          };
        case 'divide':
          return {
            ...state,
            mathState: '',
            val1: state.val1 / state.val2,
            val2: 0,
          };
        case 'power':
          return {
            ...state,
            mathState: '',
            val1: Math.pow(state.val1, state.val2),
            val2: 0,
          };
        case '':
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
