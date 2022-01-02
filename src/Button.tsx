const Button: React.FC<ButtonProps> = ({
  className,
  value,
  handler,
  children,
}) => {
  return (
    <button className={className} onClick={handler} value={value}>
      {children}
    </button>
  );
};

export default Button;
