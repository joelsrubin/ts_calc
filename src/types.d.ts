type ClickHandler = () => void;
type EventHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

type MathState = 'multiply' | 'add' | 'subtract' | 'divide' | '';

type ValState = 'val1' | 'val2' | 'clear';

type InitialState = {
  currentTotal: number;
  mathState: MathState;
  val1: number;
  val2: number;
};

type Action = {
  type: 'math' | 'compute' | 'clear' | 'val1' | 'val2';
  mathState: MathState;
  value: number;
};
