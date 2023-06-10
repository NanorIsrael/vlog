import React from "react";
import Sidebar from "./Sidebar";
import FlashMessage from "./FlashMessage"

export default function Body({ sidebar, children }: any) {
  return (
    <React.Fragment>
      {sidebar && <Sidebar />}
      <FlashMessage/>
      <React.Fragment>{children}</React.Fragment>
    </React.Fragment>
  );
}
