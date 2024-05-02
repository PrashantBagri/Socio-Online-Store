import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Route } from "react-router-dom";
import LandingPage from "./PageComponents/LandingPage.jsx";
import Login from "./PageComponents/Authentication/Login.jsx";
import Signup from "./PageComponents/Authentication/Signup.jsx";
import Products from "./PageComponents/Products.jsx";
import Cart from "./PageComponents/ui/Cart.jsx";
import AuthenticationLayout from "./PageComponents/Authentication/AuthenticationLayout.jsx";
import Layout from "./PageComponents/Layout.jsx";
import AddProducts from "./PageComponents/AddProducts.jsx";
import ProtectedRoutes from "./PageComponents/ProtectedRoutes.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import PersistLogin from "./PageComponents/Authentication/PersistLogin.jsx";
import LoginDropDownProvider from "./context/LoginDropDownProvider.jsx";
import ProductIdProvider from "./context/ProductIdProvider.jsx";
import MenProduct from "./PageComponents/MenProduct.jsx";
import WomenProducts from "./PageComponents/WomenProducts.jsx";
import Hoodies from "./PageComponents/Hoodies.jsx";
import MyProducts from "./PageComponents/MyProducts.jsx";
import Product from "./PageComponents/Product.jsx";
import MyProfile from "./PageComponents/MyProfile.jsx";
import EditProfile from "./PageComponents/EditProfile.jsx";
import CheckoutCart from "./PageComponents/CheckoutCart.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  path="/" element={<App />} exact>
      <Route element={<Layout />}>
        <Route element={<PersistLogin />}>
        <Route path="/men" element={<MenProduct/>}/>
        <Route path="/women" element={<WomenProducts/>}/>
        <Route path="/hoodies" element={<Hoodies/>}/>
        <Route path="/products/:productId"  element={<Product/>}/>
        <Route path="" element={<LandingPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/me"  element={<MyProfile/>}/>
            <Route path="/checkout"  element={<CheckoutCart/>}/>
            <Route path="/edit-profile"  element={<EditProfile/>}/>
            <Route path="/products" element={<Products />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/add-product" element={<AddProducts/>} />
          </Route>
        </Route>
        <Route />
      </Route>
      <Route element={<AuthenticationLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginDropDownProvider>
    <AuthProvider>
      <ProductIdProvider>
      <RouterProvider router={router} />
      </ProductIdProvider>
    </AuthProvider>
    </LoginDropDownProvider>
  </React.StrictMode>
);
