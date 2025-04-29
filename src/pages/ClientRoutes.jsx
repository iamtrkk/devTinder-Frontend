import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Home from "./Home";
import Feed from "../components/Feed";
import Connections from "../components/Connections";
import Requests from "../components/Requests";
import Chat from "../components/Chat";

const ClientRoutes = () => {
  return (
    <div>
      {/* We can create multiple browser router with different base names
        base names basically a prefex which is required for each child routes */}
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />}>
            {/* These are basically children routes which will be rendered in
          outlet in previous project Swiggy we use children array for this */}
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/connections/:targetUserId" element={<Chat />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default ClientRoutes;
