import { createContext, useContext, useState } from "react";


export interface FlashType {
    message: string
    type: string
}
export interface FlashContextType {
    flash :(
        message: string,
        type: string
    ) => void
    flashMessage: FlashType
}
export const FlashContext = createContext<FlashContextType | null>(null);

export default function FlashProvider({ children }: any) {
    // const [visible, setVisible] = useState(false)
    const [flashMessage, setFlashMessage] = useState<FlashType>({
        message: "",
        type: ""
    })


    const flash = (message: string, type: string) => {
        setFlashMessage({message, type})
    };

    return  <FlashContext.Provider value={{flash, flashMessage}}> {children} </FlashContext.Provider>
}
  
export function useFlash() {
    return (useContext(FlashContext)?.flash)
}
