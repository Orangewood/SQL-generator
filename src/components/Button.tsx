import React from "react";
interface ButtonProps {
  color?: string;
  text?: string;
  image?: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  const { color, text, image, disabled, onClick } = props;

  return (
    <button disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}
