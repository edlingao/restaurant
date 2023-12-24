import "@/styles/button.scss";

type ButtonProps = {
  text: string;
  onClick?: () => void;
}

export function Button({text, onClick}: ButtonProps) {
  return (
    <button className="Button__button" onClick={onClick}>
      {text}
    </button>
  )
}
