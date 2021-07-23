import { useEffect } from "react";
import { useState } from "react";
import "../sass/Dropdown.scss";
import { DropdownOperator } from "../services/AppTypes";
import ChevronUp from "../images/chevron-up.svg";
import ChevronDown from "../images/chevron-down.svg";

interface DropdownProps {
  size?: string;
  selectOptions: DropdownOperator[] | undefined;
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
    // eslint-disable-next-line
  }, [display]);

  return (
    <>
      <div className="dropdown" style={{ width: size ? size : "30%" }}>
        <div
          className="dropdown-container"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span style={{ marginLeft: "5px" }}>{display?.text}</span>
          <div className="dropdown-button">
            {!showDropdown ? (
              <img src={ChevronDown} alt=""/>
            ) : (
              <img src={ChevronUp} alt=""/>
            )}
          </div>
        </div>
        {showDropdown && (
          <div className="dropdown-items">
            {selectOptions?.map((option: DropdownOperator) => (
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
            ))}
          </div>
        )}
      </div>
    </>
  );
}
