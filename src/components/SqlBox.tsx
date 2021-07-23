import { useEffect, useState } from "react";
import { RowDataType } from "../services/AppTypes";
import "../sass/SqlBox.scss";

interface SqlBoxProps {
  compiledData: (RowDataType | undefined)[];
}

export default function SqlBox(props: SqlBoxProps) {
  const { compiledData } = props;
  const [error, setError] = useState<boolean>(false);

  // const sqlGenerator = (data:(RowDataType | undefined)[]) => {
  //   data.map((a) => {
  //     switch a?.operator:
  //     case 
  //   })
  // }

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
            return (
              <div
                key={index}
              >{`SELECT ${a.column} FROM session ${a.operator} ${a.stringInput}`}</div>
            );
          }
          if (a?.startRange && a?.endRange) {
            return (
              <div
                key={index}
              >{`SELECT ${a?.column} FROM session WHERE ${a?.startRange} ${a.operator} ${a.endRange}`}</div>
            );
          }
          return <div></div>
        })}
        
    </div>
  );
}
