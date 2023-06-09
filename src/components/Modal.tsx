import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "../App.css";


export default function Modal({ children }: any) {
    const modalref = useRef<HTMLElement>()

    if (!modalref.current) {
        modalref.current = document.createElement("div")
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal")
        modalRoot?.appendChild(modalref.current as Node)

        return () => {modalRoot?.removeChild(modalref.current as Node)}
    }, [])
  return createPortal(
                <section className={'modal'}>
                {children}
                </section>, modalref.current
            );
}
