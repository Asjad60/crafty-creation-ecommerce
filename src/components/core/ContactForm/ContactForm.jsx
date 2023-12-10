import React, { useEffect, useState } from "react";
import IconButton from "../../common/IconButton";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../../services/apiconnector";
import { contact } from "../../../services/apis";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();

  const onContactSubmit = async (data) => {
    try {
      let toastId = toast.loading("Loading...");
      setLoading(true);
      const response = await apiConnector("POST", contact.CONTACT_API, data);
      if (response.data.success) {
        toast.success("Message Sent");
      }
      toast.dismiss(toastId);
      setLoading(false);
    } catch (error) {
      console.log("ContactUs Error ==> ", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNumber: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <form
        className="flex flex-col gap-y-6"
        onSubmit={handleSubmit(onContactSubmit)}
      >
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex flex-col gap-y-1 w-full">
            <label htmlFor="firstname" className="text-sm">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              className="form-style"
              {...register("firstname")}
              required
            />
          </div>
          <div className="flex flex-col gap-y-1 w-full">
            <label htmlFor="lastname" className="text-sm">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              className="form-style"
              {...register("lastname")}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-1 w-full">
          <label htmlFor="email" className="text-sm">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-style"
            {...register("email")}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phoneNumber" className="text-sm">
            Phone Number
          </label>
          <div className="flex gap-x-6">
            <select
              name="countrycode"
              id="countrycode"
              className="form-style max-w-[90px] w-full"
              {...register("countrycode")}
            >
              {CountryCode.map((data, i) => (
                <option value={data.code} key={i}>
                  {data.code} {data.country}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              className="form-style w-full"
              {...register("phoneNumber")}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="message" className="text-sm">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="form-style h-[150px] resize-none"
            {...register("message")}
            required
          />
        </div>

        <IconButton
          disabled={loading}
          type="submit"
          text={"Send Message"}
          customClasses={"w-full grid place-items-center py-3"}
        />
      </form>
    </>
  );
};

export default ContactForm;
