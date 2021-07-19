import { useEffect, useState } from "react";
import { ReactNode } from "react";
import "../sass/BorderRow.scss";
import Dropdown from "./Dropdown";

interface BorderRowProps {
  children: ReactNode;
  onSelectedData: (data: Array<string | number>) => void;
  index: number;
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
  const { onSelectedData } = props;
  const [rowType, setRowType] = useState<string>();
  const [rowData, setRowData] = useState<(string | number)[]>([]);

  useEffect(() => {
    onSelectedData(rowData);
    console.log(rowData)
  }, [rowData]);

  return (
    <>
      <Dropdown
        selectOptions={predicateDropdown}
        onSelect={(value: DropdownOperator) => {
          setRowType(value.type);
          setRowData([]);
          setRowData([...rowData, value.value])
        }}
        size={rowType === "string" ? "30%" : "20%"}
      />
      {rowType === "string" ? (
        <>
          <Dropdown
            selectOptions={stringDropdown}
            size={"30%"}
            onSelect={(value: DropdownOperator) => {
              setRowData([...rowData,value.value])
            }}
          />
          <input className="row-input-string"></input>
        </>
      ) : (
        <>
          <div className="row-text-field">is</div>
          <Dropdown
            selectOptions={numberDropdown}
            size={"20%"}
            onSelect={(value: DropdownOperator) => {
              setRowData([...rowData,value.value])
            }}
          />
          <input
            className="row-input"
            // onChange={(e: any) => setRowData([...rowData, e.target.value])}
          ></input>
          <div className="row-text-field">and</div>
          <input
            className="row-input"
            // onChange={(e: any) => setRowData([...rowData, e.target.value])}
          ></input>
        </>
      )}
    </>
  );
}
