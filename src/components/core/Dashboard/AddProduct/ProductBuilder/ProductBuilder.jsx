import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditProduct,
  setStep,
  setProduct,
} from "../../../../../slices/productSlice";
import IconButton from "../../../../common/IconButton";
import { MdNavigateNext } from "react-icons/md";
import { RiAddCircleLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import NestedView from "./NestedView";
import {
  createSection,
  editSection,
} from "../../../../../services/operations/productApi";

const ProductBuilder = () => {
  const { product } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);
  const [editSectionName, setEditSectionName] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    let result;
    if (editSectionName) {
      result = await editSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          productId: product._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          productId: product._id,
        },
        token
      );
    }

    if (result) {
      dispatch(setProduct(result));
      setEditSectionName(false);
      setValue("sectionName", "");
    }
  };

  const handleCancelEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
  };

  const goToNext = () => {
    if (product?.productContent.length === 0) {
      toast.error("At least Add One Section");
      return;
    }
    if (
      product?.productContent.some(
        (subsection) => subsection.subSection.length < 4
      )
    ) {
      toast.error("At least Add Four Detail About Product");
      return;
    }

    dispatch(setStep(3));
  };

  const handleChangeEditSection = (sectionId, sectionName) => {
    if (sectionId === editSectionName) {
      handleCancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="bg-[#161d29] p-7 rounded-lg">
      <h2 className="text-2xl font-semibold mb-10">Product Builder</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label htmlFor="sectionName"> Section Name</label>
          <input
            type="text"
            id="sectionName"
            name="sectionName"
            placeholder="Add a Section To build Your Product"
            className="form-style w-full mt-1 text-white"
            {...register("sectionName", { required: true })}
          />
          {errors.sectionName && (
            <span className="text-red-700 text-sm">
              Section Name is required
            </span>
          )}
        </div>
        <div className="flex gap-x-3">
          <IconButton
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <RiAddCircleLine />
          </IconButton>

          {editSectionName && (
            <button
              className="underline text-slate-400"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {product?.productContent.length > 0 && (
        <NestedView handleChangeEditSection={handleChangeEditSection} />
      )}

      <div className="flex gap-x-2 justify-end">
        <button
          onClick={() => {
            dispatch(setStep(1));
            dispatch(setEditProduct(true));
          }}
          className="font-medium px-7 py-2 bg-slate-400 text-slate-900 rounded-lg"
        >
          Back
        </button>

        <IconButton text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductBuilder;
