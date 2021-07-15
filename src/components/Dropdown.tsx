import React, { useEffect } from "react";
import { useState } from "react";
import "../sass/Dropdown.scss";

export interface DropdownSignature {
  'Domain': string;
  'Screen Height': number;
}

interface DropdownProps {
  size?: number;
  defaultText?: string;
  selectOptions?: string[];
  onSelect: (data: string) => void;
  dropdownType?: string | number;
}

const test = ['wat', 'wat2', 'wat3']

//TODO: Event listener to close drowdown on click
//of window

export default function Dropdown(props: DropdownProps) {
  const { size, defaultText, selectOptions, dropdownType, onSelect } = props;
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [display, setDisplay] = useState<string>('Select...')

  useEffect(() => {
    if (display !== 'Select...') {
      onSelect(display)
      console.log(display)
    }
  }, [display])

  return (
    <div className='dropdown'>
      <div className="dropdown-container">
        <span>{display}</span>
        <div className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}> V</div>
      </div>
      {showDropdown &&
        <div className='dropdown-items'>
          {test.map((option: string) => {
            return (
              <div key={option} onClick={(e: any) => setDisplay(e.target.textContent)}>{option}</div>
            )
          }
          )}
        </div>
      }
    </div>
  );
}
