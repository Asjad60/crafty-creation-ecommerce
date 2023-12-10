import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  setValue,
  errors,
  getValues,
}) => {
  const [chips, setChips] = useState([]);
  const { editProduct, product } = useSelector((state) => state.product);

  useEffect(() => {
    if (editProduct) {
      console.log("products Tags => ", product?.tags);
      // const fetchedChips = product?.tags[0].split(",");
      setChips(product?.tags);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, chips);
  }, [chips]);

  const handleKeydown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const chipValue = e.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue];
        setChips(newChips);
        console.log("new chips", newChips);
        e.target.value = "";
      }
    }
  };

  const handleDeleteItem = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>
        {label}
        <sup className="text-red-500">*</sup>
      </label>
      <div className="flex flex-wrap items-center gap-2 ">
        {chips.length > 0 &&
          chips.map((item, index) => (
            <div
              key={index}
              className="flex  gap-x-2 bg-yellow-800 text-white px-3 py-1  rounded-full items-center"
            >
              {item}
              <button type="button" onClick={(e) => handleDeleteItem(index)}>
                <MdClose className="text-sm" />
              </button>
            </div>
          ))}
      </div>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        onKeyDown={handleKeydown}
        className="bg-[#2C333F] outline-none p-3 rounded-md border-b border-b-slate-300 "
      />
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-red-600">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default ChipInput;
