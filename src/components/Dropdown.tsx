import React from "react";
import { useState } from "react";
import "../sass/Dropdown.scss";

interface DropdownProps {
  size?: number;
  defaultText?: string;
  selectOptions: string[];
  onSelect?: (selectedOption: string) => void;
  dropdownType: string | number;
}


export default function Dropdown(props: DropdownProps) {
  const { size, defaultText, selectOptions, dropdownType } = props;
  const [selectedDropdownType, setSelectedDropdownType] = useState<
    string | number
  >(dropdownType);

  return (
    <div className='dropdown'>
      <div>
        <div className='dropdown-items'>
          {selectOptions.map((option: string) => {
            return (
              <a href='#' key={option}>
                string
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
