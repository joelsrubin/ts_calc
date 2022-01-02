// Func Types //

type EventHandler = (e: React.MouseEvent<HTMLInputELement>) => void;
type EmptyReturnFunction = () => void;
type TextHandler = () => string;

// Reducer Types //

type MathState = 'multiply' | 'add' | 'subtract' | 'divide' | 'power' | '';
type ActionTypes = 'math' | 'compute' | 'clear' | 'val1' | 'val2';
type InitialState = {
  currentTotal: number;
  mathState: MathState;
  val1: number;
  val2: number;
};

// Prop Types //

type ButtonProps = {
  className: string;
  value: string;
  handler: ClickHandler;
  children: string | number;
};
