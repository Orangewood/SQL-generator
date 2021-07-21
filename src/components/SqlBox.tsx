import { useEffect, useState } from "react";
import { DropdownOperator, RowDataType } from "../services/AppTypes";

interface SqlBoxProps {
  compiledData: Array<RowDataType | undefined>;
}

export default function SqlBox(props: SqlBoxProps) {
  const { compiledData } = props;
  const [numberError, setNumerError] = useState<boolean>(false)
  const [string, setStringError] = useState<boolean>(false)


  useEffect(() => {
    console.log(compiledData);
  }, [compiledData]);

  return (
    <div>
      {compiledData?.map((a) => {
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
