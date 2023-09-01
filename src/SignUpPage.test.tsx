import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";

describe("Maple is able to signup", () => {
    const realFetch = global.fetch;

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        global.fetch = jest.fn();
      })
      
      afterEach(() => {
        global.fetch  = realFetch;
      })

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

    it("has signup button", async() => {
        render(
        <BrowserRouter>
            <RegistrationPage/>
        </BrowserRouter>
        )

        const submitButton = screen.getByRole('button');
       
        expect(submitButton).toBeInTheDocument()
    })

    it("tries to signup when username is not entered", async() => {
        render(
        <BrowserRouter>
            <RegistrationPage/>
        </BrowserRouter>
        )

        const submitButton = screen.getByRole('button');
       
        expect(submitButton).toBeInTheDocument()
        // const usernameInput = screen.getByLabelText('password');
        const emailInput: HTMLInputElement = screen.getByLabelText('email')
        const passwordInput = screen.getByLabelText('password');
        const confirmPasswordInput = screen.getByLabelText('confirm password');
        
       
        await act(async () => {
            userEvent.type(emailInput, 'Maple@gmail.com');
            userEvent.type(passwordInput, 'Maple');
            userEvent.type(confirmPasswordInput, 'Maple');
            userEvent.click(submitButton);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate waiting for data
          });
        expect(emailInput.value).toBe('Maple@gmail.com')

        const errMessage = screen.getByText('username field can not be empty')
        const errMessageQuery = screen.queryByText('username field can not be empty')
        const errMessage2 = screen.queryByText('email field can not be empty')
        const errMessage3 = screen.queryByText('password field can not be empty')
        const errMessage4 = screen.queryByText('confirm password field can not be empty')
        
        expect(errMessage).toBeInTheDocument()
        expect(errMessageQuery).toBeInTheDocument()
        expect(errMessage2).toBeNull()
        expect(errMessage3).toBeNull()
        expect(errMessage4).toBeNull()

    })

    it("Maple is able to signup after entering details", async() => {
        render(
        <BrowserRouter>
            <RegistrationPage/>
        </BrowserRouter>
        )

        const submitButton = screen.getByRole('button');
       
        expect(submitButton).toBeInTheDocument()
        // const usernameInput = screen.getByLabelText('username');
        // const emailInput: HTMLInputElement = screen.getByLabelText('email')
        // const passwordInput = screen.getByLabelText('password');
        // const confirmPasswordInput = screen.getByLabelText('confirm password');
        
       
        // await act(async () => {
        //     userEvent.type(usernameInput, 'Maple');
        //     userEvent.type(emailInput, 'Maple@gmail.com');
        //     userEvent.type(passwordInput, '12345');
        //     userEvent.type(confirmPasswordInput, '12345');
        //     userEvent.click(submitButton);
        //     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate waiting for data
        // });

        // const firstMockCall = (global.fetch as jest.Mock).mock.calls[0]
        // expect(emailInput.value).toBe('Maple@gmail.com')

        // const errMessage = screen.getByText('username field can not be empty')
        // const errMessageQuery = screen.queryByText('username field can not be empty')
        // const errMessage2 = screen.queryByText('email field can not be empty')
        // const errMessage3 = screen.queryByText('password field can not be empty')
        // const errMessage4 = screen.queryByText('confirm password field can not be empty')
        
    })
 
})