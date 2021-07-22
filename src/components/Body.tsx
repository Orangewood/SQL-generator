import React, { useState } from "react";
import { RowDataType, RowDictionary } from "../services/AppTypes";
import BorderRow from "./BorderRow";
import Button from "./Button";
import "../sass/Body.scss";
import { useEffect } from "react";

interface BodyProps {
  // rowData: (RowDataType | undefined)[];
  onDataInput: (data: (RowDictionary | undefined) []) => void;
}

export default function Body(props: BodyProps) {
  const { onDataInput } = props;
  const row = (
    <BorderRow
      key={Date.now() + "row"}
      id={Date.now() + "row"}
      onSelectedData={(data: RowDataType | undefined, id: string) => {
        setRawData([...rawData, { key: id, data: data } as RowDictionary]);
      }}
    />
  );
  const [rowList, setRowList] = useState<JSX.Element[]>([row]);
  const [rawData, setRawData] = useState<(RowDictionary | undefined)[]>([]);

  const addRow = () => {
    let addedRow = [...rowList, row];
    setRowList(addedRow);
  };

  const deleteRow = (index: React.Key | null) => {
    if (!index) return;
    setRowList((rowList) => rowList.filter((a) => a.key !== index));
    setRawData((dictionaryList) =>
      dictionaryList.filter((a) => a?.key !== index)
    );
  };

  useEffect(() => {
    onDataInput(rawData)
  }, [rawData])

  return (
    <>
      <h3>Search for Sessions</h3>
      <div className="app-container">
        {rowList.map((a) => {
          return (
            <div className="row-container">
              <Button
                onClick={() => deleteRow(a.key)}
                text="X"
                type="button-delete"
                disabled={rowList.length === 1}
              />
              {a}
            </div>
          );
        })}
      </div>
      <Button
        onClick={() => addRow()}
        text="And"
        type="button-add"
        disabled={rowList.length > 8}
      />
    </>
  );
}
