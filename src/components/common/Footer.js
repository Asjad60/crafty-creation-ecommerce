import React from "react";
import "./Footer.css";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import bgImage from "../../assets/images/footerBgImg.jpg";
import logo from "../../assets/logo/craftyLogo.png";
import { policies, footerLinks } from "../../data/footer-links";

function Footer() {
  return (
    <div
      className={`text-white w-full bg-cover bg-no-repeat bg-center mx-auto mt-4 min-h-[50vh]`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className=" bg-[rgba(0,0,0,0.6)] min-h-[50vh] mx-auto w-full flex flex-col items-center p-4 sm:p-8">
        <div className="w-full flex flex-col sm:flex-row justify-center p-2 gap-6 max-w-maxContent border-b border-b-[#2c333f]">
          <div className="flex justify-between sm:justify-normal max-[365px]:flex-col sm:flex-col gap-4 sm:w-[50%]">
            <img
              src={logo}
              alt="logo"
              className=" mix-blend-lighten max-h-[3.9rem] max-w-[15rem] w-full min-w-[200px] object-cover"
            />

            <div className="flex flex-col gap-y-2">
              <p className="text-lg text-sky-400">Follow Us</p>
              <div className="flex gap-x-2">
                <FaFacebookF size={25} />
                <FaInstagram size={25} />
                <FaLinkedinIn size={25} />
                <FaTwitter size={25} />
              </div>
            </div>
          </div>

          <div className="w-full flex max-[365px]:flex-col gap-y-6 justify-between">
            {footerLinks.map((item, index) => (
              <div className="flex flex-col gap-2">
                <div className="flex  justify-between gap-2">
                  <p className="text-lg text-sky-400">{item.title}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {item.links.map((link, i) => (
                    <Link to={`${link.split(" ").join("-").toLowerCase()}`}>
                      <p className="hover:underline text-sm"> {link}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:flex-row md:justify-between gap-2 w-full max-w-maxContent py-8 text-sm">
          <div className="flex gap-x-2 ">
            {policies.map((ele, i) => (
              <>
                <Link to={`${ele.link}`} key={ele.id}>
                  {ele.title}
                </Link>
                {ele.id !== policies.length && <p>|</p>}
              </>
            ))}
          </div>

          <div>Made with ❤️ © 2023 CraftyCreation</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
