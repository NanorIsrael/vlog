// eslint-disable-next-line import/no-unresolved
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

const root =  createRoot(document.getElementById("root") as HTMLElement)

// hydrateRoot(
//   root,
//  <BrowserRouter>
//       <App />
//  </BrowserRouter>
// )
root.render(
  <BrowserRouter>
       <App />
  </BrowserRouter>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
