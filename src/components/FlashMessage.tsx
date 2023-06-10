import React, { useContext } from "react";
import { FlashContext, FlashContextType } from "../data/FlashProvider";

export default function FlashMessage() {
  const {flashMessage} = useContext(FlashContext) as FlashContextType;
  
    return (
      <React.Fragment>
        <p className={"text-center mb-10 " + flashMessage.type}>{flashMessage.message}</p>
      </React.Fragment>
    );
}
