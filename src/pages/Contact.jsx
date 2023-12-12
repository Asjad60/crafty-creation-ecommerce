import React from "react";
import * as Icons from "react-icons/io";
import * as Icon2 from "react-icons/io5";
import ContactForm from "../components/core/ContactForm/ContactForm";

const contactDetails = [
  {
    icon: "IoMdChatbubbles",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@craftycreation.com",
  },
  {
    icon: "IoEarth",
    heading: "Visit Us",
    description: "Come and say hello at our office HQ.",
    details: "Char Darwaza,Jaipur Rejasthan 302002",
  },
  {
    icon: "IoIosCall",
    heading: "Call us",
    description: "  Mon - Fri From 8am to 5pm.",
    details: "+123 456 7869",
  },
];

const Contact = () => {
  return (
    <div className="mx-auto max-w-maxContent w-full flex flex-col items-center lg:flex-row lg:items-start lg:justify-between gap-6 p-4 mt-5 text-white">
      <div className="bg-[#161d29]  w-full max-h-[390px] rounded-md py-10 px-5">
        {contactDetails.map((ele, i) => {
          let Icon = Icons[ele.icon] || Icon2[ele.icon];

          return (
            <div className="flex flex-col gap-[2px] p-3 text-sm" key={i}>
              <div className="flex flex-row items-center gap-3">
                <Icon size={25} />
                <h1 className="text-lg font-semibold text-richblack-5">
                  {ele?.heading}
                </h1>
              </div>
              <p className=" opacity-60">{ele?.description}</p>
              <p className="font-medium opacity-60">{ele?.details}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-transparent p-6 lg:p-14 border border-[#2c333f] rounded-md  w-full">
        <div className="flex flex-col gap-3 mb-12">
          <p className="text-4xl font-medium">
            Got a Idea? We've got the skills. Let's team up
          </p>
          <p className="text-sm opacity-60">
            Tell us more about yourself and what you're got in mind.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
