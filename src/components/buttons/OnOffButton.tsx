import { useState, MouseEventHandler } from "react";

interface OnOffButtonProps {
  defaultOn?: boolean;
  onClick?: (isOn: boolean) => void;
}

export function OnOffButton(props: OnOffButtonProps) {
  const [isOn, setIsOn] = useState(props.defaultOn ?? false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newIsOn = !isOn;
    setIsOn(newIsOn);
    console.log(newIsOn);
    if (props.onClick) {
      props.onClick(newIsOn);
    }
  };
  return (
    <button
      type="button"
      className={`btn btn-${isOn ? "success" : "secondary"}`}
      style={{
        fontWeight: "bold",
        backgroundColor: "#1c161b",
        aspectRatio: "2/1",
        height: "2rem",
        borderRadius: "0.125rem",
        border: "none",
        outline: "none",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {isOn ? "ON" : "OFF"}
    </button>
  );
}
