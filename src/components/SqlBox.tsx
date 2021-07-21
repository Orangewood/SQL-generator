import { useEffect, useState } from "react";
import { DropdownOperator, RowDataType } from "../services/AppTypes";

interface SqlBoxProps {
  compiledData: Array<RowDataType | undefined>;
}

export default function SqlBox(props: SqlBoxProps) {
  const { compiledData } = props;
  const [error, setError] = useState<boolean>(false)


  useEffect(() => {
    setError(false)
    // if( compiledData.filter((a) => a?.column).length >= 2 ){
    //   setError(true)
    //   return
    // }
  }, [compiledData]);

  return (
    <div>
      {error && <div>Error</div>}
      {!error && compiledData?.map((a) => {
        if (a?.stringInput) {
          return (
            <div>{`Select ${a.column} from session ${a.operator} ${a.stringInput}`}</div>
          );
        }
        if (a?.startRange && a?.endRange) {
          return (
            <div>{`Select ${a?.column} from session ${a?.startRange} ${a.operator} ${a.endRange}`}</div>
          );
        }
      })}
    </div>
  );
}
