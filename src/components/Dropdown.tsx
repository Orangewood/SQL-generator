import { useEffect } from "react";
import { useState } from "react";
import "../sass/Dropdown.scss";
import { DropdownOperator } from "./BorderRow";

interface DropdownProps {
  size?: string;
  selectOptions: DropdownOperator[];
  onSelect: (data: DropdownOperator) => void;
}

//TODO: Event listener to close drowdown on click
//of window

export default function Dropdown(props: DropdownProps) {
  const { size, selectOptions, onSelect } = props;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [display, setDisplay] = useState<DropdownOperator>();

  useEffect(() => {
    if (display !== undefined) {
      onSelect(display);
    }
  }, [display]);

  return (
    <div className="dropdown" style={{ width: size ? size : "30%" }}>
      <div
        className="dropdown-container"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span style={{ marginLeft: "5px" }}>{display?.text}</span>
        <div className="dropdown-button">V</div>
      </div>
      {showDropdown && (
        <div className="dropdown-items">
          {selectOptions.map((option: DropdownOperator) => {
            return (
              <div
                className="dropdown-row"
                key={option.text}
                onClick={() => {
                  setDisplay(option);
                  setShowDropdown(!showDropdown);
                }}
              >
                {option.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
