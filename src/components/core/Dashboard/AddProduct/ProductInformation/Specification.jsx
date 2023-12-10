import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Specification = ({
  label,
  name,
  register,
  setValue,
  errors,
  getValues,
}) => {
  const [specification, setSpecification] = useState("");
  const [specificationList, setSpecificationList] = useState([]);
  const { editProduct, product } = useSelector((state) => state.product);

  useEffect(() => {
    if (editProduct) {
      setSpecificationList(product?.specifications);
    }
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, specificationList);
  }, [specificationList]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (specification) {
      setSpecificationList([...specificationList, specification]);
      setSpecification("");
    }
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecification = specificationList.filter(
      (_, i) => i !== index
    );
    setSpecificationList(updatedSpecification);
  };
  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={name}>
        {label} <sup className="text-red-500">*</sup>
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={specification}
        className="bg-[#2C333F] outline-none p-3 rounded-md border-b border-b-slate-300"
        onChange={(e) => setSpecification(e.target.value)}
      />

      <button
        className="text-yellow-500 self-start font-medium"
        onClick={handleAdd}
      >
        ADD
      </button>
      <div className="flex flex-col gap-x-2 self-start">
        {specificationList.length > 0 &&
          specificationList.map((item, index) => (
            <div className="flex gap-2" key={index}>
              <li> {item}</li>
              <button
                className="text-sm opacity-50 underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveSpecification(index);
                }}
              >
                clear
              </button>
            </div>
          ))}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-red-600">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default Specification;
