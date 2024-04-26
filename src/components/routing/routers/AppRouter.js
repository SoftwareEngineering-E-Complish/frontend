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
import EditAdd from "../../../pages/EditAdd";

const AppRouter = () => {

  return (
    <Routes>
      <Route path="/properties" element={<ProductList />}>
      </Route>
      <Route path="/properties/:id" element={<ProductDetail />}>
      </Route>
      <Route path="/login" element={<Login />}>
      </Route>
      <Route path="/register" element={<Register />}>
      </Route>
      <Route path="/profile" element={<LoggedInGuard />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/editAdd" element={<LoggedInGuard />}>
        <Route path="/editAdd" element={<EditAdd />} />
      </Route>
      <Route path="/" element={<Landing />}>
      </Route>
      <Route path="/callback" element={<Callback />}>
      </Route>
    </Routes>
  );
};

export default AppRouter;
