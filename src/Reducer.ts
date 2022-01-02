export const initialState = {
  mathState: '',
  val1: null,
  val2: null,
};

export function reducer(state: InitialState, action: any) {
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
    case 'plusMinus':
      switch (action.value) {
        case 'val1':
          return {
            ...state,
            val1: state.val1 ? state.val1 * -1 : 0,
          };
        case 'val2':
          return {
            ...state,
            val2: state.val2 ? state.val2 * -1 : 0,
          };
        default:
          return {
            ...state,
          };
      }
    case 'compute':
      switch (state.mathState) {
        case 'add':
          return {
            ...state,
            mathState: '',
            val1: (state.val1 ?? 0) + (state.val2 ?? 0),
            val2: 0,
          };
        case 'subtract':
          return {
            ...state,
            mathState: '',
            val1: (state.val1 ?? 0) - (state.val2 ?? 0),
            val2: 0,
          };
        case 'multiply':
          return {
            ...state,
            mathState: '',
            val1: (state.val1 ?? 0) * (state.val2 ?? 0),
            val2: 0,
          };
        case 'divide':
          if (state.val2 === 0) {
            return {
              ...state,
            };
          }
          return {
            ...state,
            mathState: '',
            val1: (state.val1 ?? 0) / (state.val2 ?? 0),
            val2: 0,
          };
        case 'power':
          return {
            ...state,
            mathState: '',
            val1: Math.pow(state.val1 ?? 0, state.val2 ?? 0),
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
