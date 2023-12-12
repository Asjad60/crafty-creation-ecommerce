import React from "react";

const ProuctSpecification = ({ product }) => {
  return (
    <div className="divide-y divide-[#2c333f] border border-[#2c333f]">
      <h1 className="text-2xl font-medium p-4">
        {product?.category?.name === "Mobile"
          ? "Specifications"
          : "Product Details"}
      </h1>
      <div className="flex flex-col gap-4">
        {product?.productContent?.map((section, i) => (
          <div
            className="flex flex-col gap-4 border-b border-b-[#2c333f]"
            key={section._id}
          >
            <h2 className="p-2 font-medium mt-1">{section.sectionName}</h2>

            {section?.subSection?.map((subSection, i) => (
              <div
                className="flex gap-x-10 ml-2 pb-4 text-sm"
                key={subSection._id}
              >
                <p className="text-gray-400 whitespace-nowrap w-full">
                  {subSection.title}
                </p>

                <p className="flex w-full">{subSection?.details}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProuctSpecification;
