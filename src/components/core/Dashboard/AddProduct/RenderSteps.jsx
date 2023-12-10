import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import ProductInformationForm from "./ProductInformation/ProductInformationForm";
import ProductPublish from "./ProductPublish/ProductPublish";
import ProductBuilder from "./ProductBuilder/ProductBuilder";

function RenderSteps() {
  const { step } = useSelector((state) => state.product);
  const steps = [
    {
      id: 1,
      title: "Product Information",
    },
    {
      id: 2,
      title: "Product Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <>
      <div className=" mb-1 flex justify-center w-full">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div>
              <div
                className={` self-center aspect-square rounded-full w-[34px] grid place-items-center border-[1px] ${
                  step === item.id
                    ? "bg-[rgba(255,124,94,0.2)] text-yellow-50 border-yellow-400 "
                    : "border-slate-900 bg-slate-800 text-slate-500"
                } ${step > item.id && "bg-yellow-400"}`}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-slate-900" />
                ) : (
                  item.id
                )}
              </div>
            </div>

            {item.id !== steps.length && (
              <div
                className={`w-[33%] h-[17px] border-dashed border-b-2 mt-[1px] ${
                  step > item.id ? "border-b-yellow-600" : "border-b-slate-500"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="relative flex justify-between select-none w-full mb-10 lg:pr-4 xl:pr-0">
        {steps.map((item) => (
          <div
            key={item.id}
            className="flex max-[520px]:min-w-[70px] min-w-[130px] flex-col items-center gap-y-2 "
          >
            <p
              className={`text-sm letter-spacing-1 tracking-wide max-[430px]:text-[12px] ${
                step >= item.id ? "text-white" : "text-slate-400"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
      {step === 1 && <ProductInformationForm />}
      {step === 2 && <ProductBuilder />}
      {step === 3 && <ProductPublish />}
    </>
  );
}

export default RenderSteps;
