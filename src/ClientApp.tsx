import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root: Document | Element =  document.getElementById('root') as Document | Element;
hydrateRoot(
    root,
    <BrowserRouter>
    <App/>
    </BrowserRouter>
)