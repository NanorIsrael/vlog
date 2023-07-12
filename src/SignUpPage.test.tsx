import { act, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";

describe("Maple is able to signup", () => {
    it("has all input", () => {
        render(
        <BrowserRouter>
            <RegistrationPage/>
        </BrowserRouter>
        )

        const userNameInput = screen.getByLabelText('username');
        const emailInput = screen.getByLabelText('email');
        const passwordInput: HTMLInputElement = screen.getByLabelText('password');
        const confirmPasswordInput: HTMLInputElement = screen.getByLabelText('confirm password');
        
        expect(emailInput).toBeInTheDocument()
        expect(userNameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(passwordInput).toHaveAttribute('type')
        expect(passwordInput.type).toBe('password')
        expect(confirmPasswordInput).toBeInTheDocument()
        expect(confirmPasswordInput.type).toBe("password")

    })

    it("has signup button", () => {
        render(
        <BrowserRouter>
            <RegistrationPage/>
        </BrowserRouter>
        )

        const submitButton = screen.getByRole('button');
       
        expect(submitButton).toBeInTheDocument()
    })
 
})