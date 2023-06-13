import React, { ReactElement } from "react";
import Sidebar from "./Sidebar";

interface BodyProps {
  sidebar?: any,
  children: any
}
export default function Body({sidebar, children }: BodyProps) {
  return (
    <React.Fragment>
      {sidebar && < Sidebar />}
      <React.Fragment>{children}</React.Fragment>
    </React.Fragment>
  );
}
