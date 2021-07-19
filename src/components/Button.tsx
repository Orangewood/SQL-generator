import "../sass/Button.scss"
interface ButtonProps {
  color?: string;
  text?: string;
  image?: string;
  disabled?: boolean;
  type: string
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  const { type, text, image, disabled, onClick} = props;

  return (
    <button className={type} disabled={disabled} onClick={onClick}>
      <>
        {image && <img src={image} />}
        {text}
      </>
    </button>
  );
}
