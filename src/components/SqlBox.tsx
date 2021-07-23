import { useEffect, useState } from "react";
import { RowDataType } from "../services/AppTypes";
import "../sass/SqlBox.scss";

interface SqlBoxProps {
  compiledData: (RowDataType | undefined)[];
}

export default function SqlBox(props: SqlBoxProps) {
  const { compiledData } = props;
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(
      compiledData.some(
        (a) => !a?.stringInput && (!a?.startRange || !a?.endRange)
      )
    );
  }, [compiledData]);

  return (
    <div className="sql-box">
      {error && <div>Invalid query detected</div>}
      {!error &&
        compiledData?.map((a, index) => {
          if (a?.stringInput) {
            if (a?.operator === "in list") {
              <div
                key={index}
              >{`SELECT ${a.column} FROM session WHERE ${a.column}  ${a.operator} (${a.stringInput})`}</div>;
            }
            if (a?.operator === "starts with") {
              return (
                <div
                  key={index}
                >{`SELECT ${a.column} FROM session WHERE ${a.column} LIKE  "%${a.stringInput}%"`}</div>
              );
            }
            if (a?.operator === "contains") {
              return (
                <div
                  key={index}
                >{`SELECT ${a.column} FROM session CONTAINS(${a.column}, 'NEAR(${a.stringInput})')`}</div>
              );
            }
            return (
              <div
                key={index}
              >{`SELECT ${a.column} FROM session ${a.operator} ${a.stringInput}`}</div>
            );
          }
          if (a?.startRange && a?.endRange) {
            if (a?.operator === "in list") {
              return (
                <div
                  key={index}
                >{`SELECT ${a.column} FROM session WHERE ${a.column}  ${a.operator} (${a?.startRange}, ${a.endRange})`}</div>
              );
            }
            if (a?.operator === "BETWEEN") {
              return (
                <div
                  key={index}
                >{`SELECT ${a.column} FROM session WHERE ${a.column}  ${a.operator} ${a?.startRange} AND ${a.endRange}`}</div>
              );
            }
            return (
              <div
                key={index}
              >{`SELECT ${a?.column} FROM session WHERE ${a?.startRange} ${a.operator} ${a.endRange}`}</div>
            );
          }
          return <div></div>;
        })}
    </div>
  );
}
