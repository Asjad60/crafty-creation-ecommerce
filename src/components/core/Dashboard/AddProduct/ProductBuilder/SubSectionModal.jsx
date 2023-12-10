import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateSubSection,
  editSubSection,
} from "../../../../../services/operations/productApi";
import { setProduct } from "../../../../../slices/productSlice";
import { AiOutlineClose } from "react-icons/ai";
import IconButton from "../../../../common/IconButton";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { product } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (edit || view) {
      setValue("detailsTitle", modalData.title);
      setValue("detailsDescription", modalData.details);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValue = getValues();
    if (edit) {
      if (
        currentValue.detailsTitle !== modalData.title ||
        currentValue.detailsDescription !== modalData.description
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.detailsTitle !== modalData.title) {
      formData.append("title", currentValues.detailsTitle);
    }
    if (currentValues.detailsDescription !== modalData.description) {
      formData.append("details", currentValues.detailsDescription);
    }

    setLoading(true);
    const result = await editSubSection(formData, token);
    if (result) {
      const updatedSection = product.productContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedProduct = { ...product, productContent: updatedSection };
      dispatch(setProduct(updatedProduct));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No Changes Made To The Form");
      } else {
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.detailsTitle);
    formData.append("details", data.detailsDescription);
    setLoading(true);

    const result = await CreateSubSection(formData, token);
    if (result) {
      const updatedSection = product.productContent.map((section) =>
        section._id === modalData ? result : section
      );

      const updatedProduct = { ...product, productContent: updatedSection };
      dispatch(setProduct(updatedProduct));
    }

    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[rgba(0,0,0,0.5)] backdrop-blur-[2px] grid place-items-center">
      <div className="w-11/12 max-w-[600px] bg-[#161d29] flex flex-col  rounded-lg border border-slate-500">
        <div className="flex justify-between bg-[#2C333F] p-4 rounded-t-lg">
          {" "}
          <h2 className="text-2xl font-semibold text-white ">
            {add
              ? "Adding Details"
              : view
              ? "Viewing Details"
              : edit
              ? "Editing Details"
              : null}
          </h2>
          <button
            onClick={() => (!loading ? setModalData(null) : {})}
            className="text-2xl font-semibold"
          >
            <AiOutlineClose />
          </button>
        </div>
        <form
          className="flex flex-col gap-6 p-8 tracking-wide"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="detailsTitle">Information Title</label>
            <input
              type="text"
              disabled={view || loading}
              id="detailsTitle"
              className="form-style  w-full mt-1 text-white"
              {...register("detailsTitle", { required: true })}
            />
            {errors.detailsTitle && (
              <span className="text-sm text-red-600">Title Is required</span>
            )}
          </div>

          <div>
            <label htmlFor="detailsDescription">Details & Information</label>
            <textarea
              disabled={view || loading}
              id="detailsDescription"
              className="form-style  w-full mt-1 text-white resize-x-none min-h-[130px]"
              {...register("detailsDescription", { required: true })}
            ></textarea>
            {errors.detailsDescription && (
              <span className="text-sm text-red-600">
                Details & Information Is required
              </span>
            )}
          </div>
          {add || edit ? (
            <div className="flex justify-end w-full">
              <IconButton
                disabled={loading}
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                type="submit"
              />
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
