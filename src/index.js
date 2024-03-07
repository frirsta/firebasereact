import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import Register from "./pages/Auth/Register";
import Reset from "./pages/Auth/Reset";
import Context from "./components/Context/Context";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/register", element: <Register /> },
  { path: "/reset", element: <Reset /> },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Context>
  </React.StrictMode>
);

reportWebVitals();
