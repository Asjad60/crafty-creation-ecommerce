import React from "react";
import RenderSteps from "./RenderSteps";

export default function AddProduct() {
  return (
    <div className="text-white flex items-start gap-x-6 w-full">
      <div className="flex flex-col flex-1">
        <h1 className="text-3xl mb-10 font-semibold">Add Product</h1>
        <div className="flex-1">
          <RenderSteps />
        </div>
      </div>
      <div className="sticky top-10 right-0 hidden flex-1  border-[#495468] max-w-[385px] rounded-md p-4 border bg-[#2C333F] xl:block">
        <p className="mb-8 text-lg text-richblack-5"> ⚡ Product Upload Tips</p>
        <ul className="ml-5 list-item list-disc space-y-4 text-xs text-slate-50">
          <li>Set the Product Price option or make it free.</li>
          <li>Standard size for the Product Images is 1024x576.</li>
          <li>Highlights of a Product tells what is in the Product, </li>
          <li>Product Builder is where you create & organize a Product.</li>
          <li>
            Add Topics in the Product Builder section to create Specification or
            ProductDetails of a Product.
          </li>
          <li>Add Section Name Like, Specification , ProductDetails.</li>
          <li>
            Information from the Additional Data section shows up on the Product
            single page.
          </li>
          <li>Make Announcements to notify any important</li>
        </ul>
      </div>
    </div>
  );
}
