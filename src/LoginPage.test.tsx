import { act, render, screen } from "@testing-library/react";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter } from "react-router-dom";

describe("Maple is able to enter login details", () => {
    it("has username input", () => {
        render(
        <BrowserRouter>
            <LoginPage/>
        </BrowserRouter>
        )

        // const input = screen.getByLabelText('username');
        // expect(input).toBeInTheDocument()
    })
})