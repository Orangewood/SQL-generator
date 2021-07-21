import { SIGFPE } from "constants";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import "../sass/BorderRow.scss";
import {
  DropdownOperator,
  numberDropdown,
  predicateDropdown,
  RowDataType,
  stringDropdown,
} from "../services/AppTypes";
import Dropdown from "./Dropdown";

interface BorderRowProps {
  children: ReactNode;
  onSelectedData: (data: RowDataType | undefined) => void;
}

export default function Test(props: BorderRowProps) {
  const { onSelectedData } = props;
  const [rowType, setRowType] = useState<DropdownOperator>();
  const [column, setColumn] = useState<string>();
  const [operator, setOperator] = useState<string>();
  const [stringInput, setStringInput] = useState<string>();
  const [startRange, setStartRange] = useState<string>();
  const [endRange, setEndRange] = useState<string>();
  const [constructedData, setConstructedData] = useState<
    RowDataType | undefined
  >();
  const [changeType, setChangeType] = useState<boolean>(false);

  useEffect(() => {
    setConstructedData({
      column: column,
      operator: operator,
      stringInput: stringInput,
      startRange: startRange,
      endRange: endRange,
    });
    if (changeType) {
      setOperator(undefined);
      setStringInput(undefined);
      setStartRange(undefined);
      setEndRange(undefined);
    }
  }, [column, operator, stringInput, startRange, endRange, changeType]);

  useEffect(() => {
    onSelectedData(constructedData);
  }, [constructedData]);

  return(
    <>
      <Dropdown
        selectOptions={predicateDropdown}
        onSelect={(value: DropdownOperator) => {
          setRowType(value);
          setColumn(value.value);
          setChangeType(rowType?.text !== value.text);
        }}
        size={"30%"}
      />
        {rowType?.text &&
        <>
          <div className="row-text-field">is</div>
          <Dropdown
            selectOptions={numberDropdown}
            size={"20%"}
            onSelect={(value: DropdownOperator) => {
              setOperator(value.value);
            }}
            reset={changeType}
          /> 
       </> }
    </>
  );
}
