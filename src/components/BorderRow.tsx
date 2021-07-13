import { ReactNode } from "react";
import "../sass/BorderRow.scss";

interface BorderRowProps {
  rowType?: string | number;
  children: ReactNode;
}

export default function BorderRow(props: BorderRowProps) {
  const { rowType, children } = props;
  return <div>{children}</div>;
}
