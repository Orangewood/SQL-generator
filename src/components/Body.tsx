import { useState } from "react";
import { RowDataType, RowDictionary } from "../services/AppTypes";
import BorderRow from "./BorderRow";
import Button from "./Button";
import "../sass/Body.scss";
import { useEffect } from "react";
import SearchIcon from "../images/search.svg";

interface BodyProps {
  onDataInput: (data: (RowDictionary | undefined)[]) => void;
  showSql: (clicked: boolean) => void;
}

export default function Body(props: BodyProps) {
  const { onDataInput, showSql } = props;

  const initialData = {
    key: Date.now() + "row",
    data: {
      column: undefined,
      operator: undefined,
      stringInput: undefined,
      startRange: undefined,
      endRange: undefined,
    },
  };

  const [rawData, setRawData] = useState<(RowDictionary | undefined)[]>([
    initialData,
  ]);

  const addRow = () => {
    let addedData = [...rawData, initialData];
    setRawData(addedData);
    showSql(false);
  };

  const deleteRow = (index: any) => {
    if (!index) return;
    setRawData((dictionaryList) =>
      dictionaryList.filter((a) => a?.key !== index)
    );
    showSql(false);
  };

  const resetData = () => {
    rawData.length = 0;
    setRawData([initialData]);
    showSql(false);
  };

  useEffect(() => {
    onDataInput(rawData);
    // eslint-disable-next-line
  }, [rawData]);

  return (
    <>
      <div className="app-container">
        <h3>Search for Sessions</h3>
        {rawData.map((a, index) => {
          return (
            <div className="row-container" key={a?.key}>
              <Button
                onClick={() => {
                  if (rawData.length === 1) {
                    resetData();
                    return;
                  }
                  deleteRow(a!.key);
                }}
                text="X" //could use .svg
                type="button-delete"
              />
              <BorderRow
                key={a!.key}
                onSelectedData={(data: RowDataType | undefined) => {
                  let currentRow = { key: a!.key, data: data };
                  rawData.splice(index, 1, currentRow);
                  showSql(false);
                }}
              />
            </div>
          );
        })}
        <Button
          onClick={() => addRow()}
          text="And"
          type="button-add"
          disabled={rawData.length > 8}
        />
        <hr className="solid" />
        <div className="row-button">
          <Button
            onClick={() => showSql(true)}
            text="Search"
            type="button-search"
            disabled={rawData.length < 1}
            image={SearchIcon}
          />
          <Button
            onClick={() => resetData()}
            text="Reset"
            type="button-reset"
            disabled={rawData.length < 1}
          />
        </div>
      </div>
    </>
  );
}
