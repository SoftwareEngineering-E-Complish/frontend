import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "../../../products/detail/ProductDetail";
import Landing from "../../../pages/Landing.js";
import ProductList from "../../../products/ProductList";
import Login from "../../../pages/Login";
import Register from "../../../pages/Register";
import Profile from "../../../pages/Profile";
import Callback from "../../../pages/Callback";
import { LoggedInGuard } from "../routeProtectors/ProfileGuard.js";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/properties" element={<ProductList />} />
      <Route path="/properties/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<LoggedInGuard />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/" element={<Landing />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
};

export default AppRouter;
