import React, { useState } from "react";
import "./Nav.css";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import ProfileDropdown from "../core/profileDropDown/ProfileDropdown";
import { useEffect } from "react";
import { getCategories } from "../../services/operations/productApi";
import logo from "../../assets/logo/craftyLogo.png";

const Nav = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
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
      <div className="nav z-[1000] relative py-7">
        <div className="navLinks z-[1000]  flex max-w-maxContent items-center justify-between ">
          <Link to="/" className="overflow-y-hidden h-12">
            <img src={logo} alt="logo" className="logo" />
          </Link>

          <nav
            className={`navbar z-10 md:block ${
              openNavbar ? "flex " : "hidden"
            }`}
          >
            <ul className="nav-list">
              {NavLinks.map((link, index) => (
                <li key={index} className="text-lg text-start">
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
              {token === null && (
                <>
                  <Link to="/login" className="md:hidden">
                    <button className="login-sign-btn">Log in</button>
                  </Link>

                  <Link to="/signup" className="md:hidden">
                    <button className="login-sign-btn">Sign Up</button>
                  </Link>
                </>
              )}
            </ul>
          </nav>

          {/* Login / Sign-UP / Dashboard */}

          <div
            className={`md:flex max-[767px]:absolute right-14 max-[325px]:right-8 ${
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
              <Link to="/login" className="hidden md:block">
                <button className="login-sign-btn">Log in</button>
              </Link>
            )}

            {token === null && (
              <Link to="/signup" className="hidden md:block">
                <button className="login-sign-btn">Sign Up</button>
              </Link>
            )}

            {token !== null && window.innerWidth < 768 && <ProfileDropdown />}
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
