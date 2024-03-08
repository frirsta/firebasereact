import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Reset from "./pages/Auth/Reset";
import Context from "./components/Context/Context";
import NotFound from "./components/error/NotFound";

const router = createBrowserRouter([
  { root: true, path: "/", errorElement: <NotFound />, element: <App /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
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
