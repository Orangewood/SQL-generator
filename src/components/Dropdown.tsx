import React, { useEffect } from "react";
import { useState } from "react";
import "../sass/Dropdown.scss";
import { DropdownOperator } from "./BorderRow";

interface DropdownProps {
  size?: number;
  defaultText?: string;
  selectOptions: DropdownOperator[];
  onSelect: (data: DropdownOperator) => void;
  dropdownType?: string | number;
}

//TODO: Event listener to close drowdown on click
//of window

export default function Dropdown(props: DropdownProps) {
  const { size, defaultText, selectOptions, dropdownType, onSelect } = props;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [display, setDisplay] = useState<DropdownOperator>();

  useEffect(() => {
    if (display !== undefined) {
      onSelect(display);
      console.log(display);
    }
  }, [display]);

  return (
    <div className="dropdown">
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
              <div key={option.text} onClick={() => setDisplay(option)}>
                {option.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
