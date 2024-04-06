import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductDetail from "../../../products/detail/ProductDetail";
import Landing from "../../../pages/Landing.js";
import ProductList from "../../../products/ProductList";
import Login from "../../../pages/Login";
import Register from "../../../pages/Register";
import Profile from "../../../pages/Profile";
import AddPage from "../../../pages/CreateAdd";
import Callback from "../../../pages/Callback";
import {ProfileGuard} from "../routeProtectors/ProfileGuard.js";


const AppRouter = () => {
  //        <Route path="/createAdd" element={<ProfileGuard />}>
  //<Route path="/createAdd" element = {<AddPage newCreated={true}/>}>
  //</Route>
  return (
      <Routes>
        <Route path="/properties" element={<ProductList />}>
        </Route>
        <Route path="/properties/:id" element = {<ProductDetail />}>
        </Route>
        <Route path="/login" element = {<Login />}>
        </Route>
        <Route path="/register" element = {<Register />}>
        </Route>
        <Route path="/profile" element={<ProfileGuard />}>
            <Route path="/profile" element = {<Profile />}/>
        </Route>

          <Route path="/createAdd" element = {<AddPage newCreated={true}/>}>

        </Route>
        <Route path="/" element = {<Landing />}>
        </Route>
        <Route path="/callback" element = {<Callback />}>
        </Route>
      </Routes>
  );
};

export default AppRouter;
