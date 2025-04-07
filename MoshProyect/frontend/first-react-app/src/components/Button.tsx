interface ButtonProps {
  children: string;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  onClick: () => void;
}

function Button({ children, color, onClick }: ButtonProps) {
  return (
    <>
      <button className={"btn btn-outline-" + color} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

export default Button;
