/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext } from "react";
import { FlashContext, FlashContextType} from "../data/FlashProvider";

export default function FlashMessage() {
  const {flashMessage, visible, hideFlash} = useContext(FlashContext) as FlashContextType;
  
    return (
      <>
      { visible && <div className={"flex justify-between items-center w-4/12 p-4  my-0 mx-auto mb-10 " + "bg-" + flashMessage.type + "-300"}>
        <p 
        className={" " + flashMessage.type}
       >
           {flashMessage.message}
        </p>
   
        <p className="" onClick={hideFlash} onKeyDown={() => null }> &times;</p>
        </div>
      }
      </>
    );
    
}