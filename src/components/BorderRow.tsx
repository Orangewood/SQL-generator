import {useEffect, useState } from "react";
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
  onSelectedData: (data: RowDataType | undefined) => void;
  // id: string;
}

export default function BorderRow(props: BorderRowProps) {
  const { onSelectedData,  } = props;
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
  const [sameType, setSameType] = useState<boolean>(false);

  useEffect(() => {
    setConstructedData({
      column: column,
      operator: operator,
      stringInput: stringInput,
      startRange: startRange,
      endRange: endRange,
    });
    if (changeType) {
      setOperator(sameType ? operator : undefined);
      setStringInput(undefined);
      setStartRange(undefined);
      setEndRange(undefined);
    }
    setChangeType(false);

  }, [
    column,
    operator,
    stringInput,
    startRange,
    endRange,
    changeType,
    sameType,
  ]);

  useEffect(() => {
    onSelectedData(constructedData);
    // eslint-disable-next-line
  }, [constructedData]);

  const placeHolderText = (row: DropdownOperator | undefined) => {
    if (!row) return;
    switch (row.text) {
      case "User Email":
        return "johndoe@email.com";
      case "First Name":
        return "first name";
      case "Last Name":
        return "last name";
      case "Domain":
        return "website.com";
      case "Path":
        return "url path";
    }
  };

  return (
    <>
      <Dropdown
        selectOptions={predicateDropdown}
        onSelect={(selectedOption: DropdownOperator) => {
          setRowType(selectedOption);
          setColumn(selectedOption.value);
          setChangeType(rowType?.text !== selectedOption.text);
          setSameType(rowType?.type === selectedOption.type);
        }}
        size={rowType?.type === "string" || !rowType ? "30%" : "20%"}
      />

      {rowType?.type === "number" ? (
        <>
          <div className="row-text-field">is</div>
          <Dropdown
            selectOptions={numberDropdown}
            size={"20%"}
            onSelect={(value: DropdownOperator) => {
              setOperator(value.value);
            }}
          />
          <input
            className="row-input"
            onChange={(e: any) => {
              let input = e.target.value;
              setStartRange(input.replace(/[^0-9]/gi, ""));
            }}
            value={startRange ?? ""}
            placeholder={"0"}
          ></input>
          <div className="row-text-field">and</div>
          <input
            className="row-input"
            onChange={(e: any) => {
              let input = e.target.value;
              setEndRange(input.replace(/[^0-9]/gi, ""));
            }}
            value={endRange ?? ""}
            placeholder={"0"}
          ></input>
        </>
      ) : (
        <>
          <Dropdown
            selectOptions={stringDropdown}
            size={"30%"}
            onSelect={(value: DropdownOperator) => {
              setOperator(value.value);
            }}
          />
          <input
            className="row-input-string"
            onChange={(e: any) => {
              if (
                rowType?.text === "First Name" ||
                rowType?.text === "Last Name"
              ) {
                let input = e.target.value;
                setStringInput(input.replace(/[^A-Za-z]/gi, ""));
                return;
              }
              setStringInput(e.target.value);
            }}
            value={stringInput ?? ""}
            placeholder={placeHolderText(rowType)}
          ></input>
        </>
      )}
    </>
  );
}
