import React from "react";
import Sidebar from "./Sidebar";

export default function Body({ sidebar, children }: any) {
  return (
    <React.Fragment>
      {sidebar && <Sidebar />}
      <React.Fragment>{children}</React.Fragment>
    </React.Fragment>
  );
}
