import React, { useState } from "react";
import "./Nav.css";
import { Link, matchPath, useLocation } from "react-router-dom";
// import { toast } from "react-hot-toast"
import { NavLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { logout } from "../../services/operations/authApi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import ProfileDropdown from "../core/profileDropDown/ProfileDropdown";
import { useEffect } from "react";
import { getCategories } from "../../services/operations/productApi";
import logo from "../../logo/craftyLogo.png";

const Nav = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getCategories();
      if (result) {
        setSubLinks(result);
      }
    })();
  }, []);

  const [openNavbar, setOpenNavbar] = useState(false);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // const subLinks = [
  //   {
  //     title: "Python",
  //     link: "/python",
  //   },
  //   {
  //     title: "Javascript",
  //     link: "/javascript",
  //   },
  //   {
  //     title: "Web-development",
  //     link: "/web-Development",
  //   },
  //   {
  //     title: "Android Development",
  //     link: "/Android-Development",
  //   },
  // ];

  return (
    <>
      <div className="nav z-[1000] py-7">
        <div className="navLinks relative z-[1000] flex max-w-maxContent items-center justify-between ">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>

          <nav
            className={`navbar z-10 md:block max-[768px]:backdrop-blur-sm ${
              openNavbar ? "flex " : "hidden"
            }`}
          >
            <ul className="nav-list flex flex-col md:flex-row">
              {NavLinks.map((link, index) => (
                <li key={index} className="text-lg">
                  {link.title === "Catalog" ? (
                    <>
                      <div
                        className={`catalog-dropDown ${
                          matchRoute("/catalog/:catalogName")
                            ? "active"
                            : "white"
                        }`}
                      >
                        <p style={{ cursor: "pointer" }}>{link?.title}</p>
                        <MdOutlineKeyboardArrowDown
                          style={{
                            color: "#ffffffd8",
                            fontSize: "23px",
                            transform: "translateY(2px)",
                          }}
                        />

                        <div className={`dropDown-links`}>
                          <div className="triangle"></div>
                          {subLinks.map((sublink, index) => (
                            <Link
                              to={`/catalog/${sublink?.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              key={index}
                              className="catalog-links z-[3000]"
                            >
                              <p> {sublink?.name} </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link?.path}
                      className={`${
                        matchRoute(link?.path) ? "active" : "white"
                      }`}
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Login / Sign-UP / Dashboard */}

          <div
            className={` max-[768px]:absolute right-10  md:flex  ${
              openNavbar ? "flex" : "hidden"
            }`}
          >
            {user && user?.accountType !== ACCOUNT_TYPE.SUPPLIER && (
              <Link to="dashboard/cart" className="cart-icon-link">
                <AiOutlineShoppingCart className="self-center text-white text-2xl mr-2" />
                {totalItems > 0 && (
                  <span className="totalItems-span">{totalItems}</span>
                )}
              </Link>
            )}

            {token === null && (
              <Link to="/login">
                <button className="login-sign-btn">Log in</button>
              </Link>
            )}

            {token === null && (
              <Link to="/signup">
                <button className="login-sign-btn">Sign Up</button>
              </Link>
            )}

            {token !== null && <ProfileDropdown />}
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpenNavbar(!openNavbar)}
          >
            <AiOutlineMenu fontSize={26} fill="#AFB2BF" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Nav;
