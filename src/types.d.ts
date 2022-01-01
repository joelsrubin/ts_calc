type ClickHandler = () => void;
type EventHandler = (e: React.MouseEvent<HTMLInputELement>) => void;
type TextHandler = () => string;

type MathState =
  | 'multiply'
  | 'add'
  | 'subtract'
  | 'divide'
  | 'power'
  | 'root'
  | '';

type ActionTypes = 'math' | 'compute' | 'clear' | 'val1' | 'val2';

type InitialState = {
  currentTotal: number;
  mathState: MathState;
  val1: number;
  val2: number;
};

type Action = {
  type: ActionTypes;
  value?: number | MathState;
};
