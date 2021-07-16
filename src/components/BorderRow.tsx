import React, { useState } from "react";
import { ReactNode } from "react";
import "../sass/BorderRow.scss";
import Dropdown from "./Dropdown";

interface BorderRowProps {
  children: ReactNode;
  onSelectedData: (data: string[]) => void;
}

export interface DropdownOperator {
  value: string;
  text: string;
  type?: string;
}

const stringDropdown: DropdownOperator[] = [
  { value: "equals", text: "Equals" },
  { value: "contains", text: "Contains" },
  { value: "starts with", text: "Starts with" },
  { value: "in list", text: "In list" },
];

const numberDropdown: DropdownOperator[] = [
  { value: "equals", text: "Equals" },
  { value: "between", text: "Between" },
  { value: "greater than", text: "Greater than" },
  { value: "less than", text: "Less than" },
  { value: "in list", text: "In list" },
];

const predicateDropdown: DropdownOperator[] = [
  { value: "user_email", text: "User Email", type: "string" },
  { value: "screen_height", text: "Screen Height", type: "number" },
  { value: "screen_width", text: "Screen Width", type: "number" },
  { value: "visits", text: "# of Visits", type: "number" },
  { value: "user_first_name", text: "First Name", type: "string" },
  { value: "user_last_name", text: "Last Name", type: "string" },
  { value: "page_response", text: "Page Response Time", type: "number" },
  { value: "domain", text: "Domain", type: "string" },
  { value: "path", text: "Path", type: "string" },
];

export default function BorderRow(props: BorderRowProps) {
  const [rowType, setRowType] = useState<string>();
  const [rowData, setRowData] = useState<string | number[]>([]);

  return (
    <>
      <div className="row-container">
        <Dropdown
          selectOptions={predicateDropdown}
          onSelect={(value: DropdownOperator) => setRowType(value.type)}
        />
        {rowType === "string"
          ? (
              <Dropdown
                selectOptions={stringDropdown}
                onSelect={(value: DropdownOperator) => setRowData(value.value)}
              />
            ) && <input className="row-input"></input>
          : ""}
      </div>
    </>
  );
}
