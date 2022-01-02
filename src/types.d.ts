// Func Types //

type EventHandler = (e: React.MouseEvent<HTMLInputELement>) => void;
type DispatchFunction = () => void;
type TextHandler = () => string;

// Reducer Types //

type MathState = 'multiply' | 'add' | 'subtract' | 'divide' | 'power' | '';
type ActionTypes = 'math' | 'compute' | 'clear' | 'val1' | 'val2' | 'plusMinus';
type InitialState = {
  mathState: MathState;
  val1: number | null;
  val2: number | null;
};

// Prop Types //

type ButtonProps = {
  className: string;
  value: string;
  handler: ClickHandler;
  children: string | number;
};
