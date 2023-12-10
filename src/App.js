import { Routes, Route, useNavigate } from "react-router-dom";
import Nav from "./components/common/Nav";
import "./App.css";
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";
import PrivateComponent from "./components/PrivateComponent";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import { useSelector, useDispatch } from "react-redux";
import OpenRoute from "./components/core/OpenRoute";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import { getUserDetails } from "./services/operations/profileApi";
import { useEffect } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Setting from "./components/core/Dashboard/Settings/Setting";
import MyOrders from "./components/core/Dashboard/MyOrders";
import Cart from "./components/core/Dashboard/Cart/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddProduct from "./components/core/Dashboard/AddProduct";
import ErrorPage from "./pages/ErrorPage";
import MyProducts from "./components/core/Dashboard/MyProducts";
import EditProduct from "./components/core/Dashboard/EditProduct/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token, navigate));
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="App flex min-h-screen w-screen bg-[#000814] flex-col font-serif">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateComponent>
              <Dashboard />
            </PrivateComponent>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Setting />} />

          {user?.accountType === ACCOUNT_TYPE.VISITOR && (
            <>
              <Route path="/dashboard/my-orders" element={<MyOrders />} />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.SUPPLIER && (
            <>
              <Route path="/dashboard/add-product" element={<AddProduct />} />
              <Route path="/dashboard/my-listings" element={<MyProducts />} />
              <Route
                path="/dashboard/edit-product/:productId"
                element={<EditProduct />}
              />
            </>
          )}
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
