import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Reset from "./pages/Auth/Reset";
import Context from "./components/Context/Context";
import NotFound from "./components/error/NotFound";
import AddPost from "./pages/posts/AddPost";
import FriendProfile from "./pages/Friends/FriendProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Context>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="profile/:id" element={<FriendProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Context>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
