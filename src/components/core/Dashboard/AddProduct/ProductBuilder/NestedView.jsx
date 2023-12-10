import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { AiFillCaretDown } from "react-icons/ai";
import { setProduct } from "../../../../../slices/productSlice";
import SubSectionModal from "./SubSectionModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/productApi";
import { IoMdAdd } from "react-icons/io";

const NestedView = ({ handleChangeEditSection }) => {
  const { product } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId, productId) => {
    const response = await deleteSection({ sectionId, productId }, token);
    if (response) {
      dispatch(setProduct(response));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId }, token);
    if (result) {
      const updatedSection = product?.productContent?.map((section) => {
        return section._id === sectionId ? result : section;
      });
      const updatedProduct = { ...product, productContent: updatedSection };
      dispatch(setProduct(updatedProduct));
    }

    setConfirmationModal(null);
  };
  return (
    <div>
      <div className="bg-[#2C333F] p-4 mt-10 mb-10 rounded-lg">
        {product?.productContent?.map((section) => (
          <details key={section._id} open className="cursor-pointer">
            <summary className="flex items-center justify-between gap-2 border-b border-b-[#ffffff2a] py-2">
              <div className="flex gap-2 items-center opacity-80">
                <RxDropdownMenu className="text-xl" />{" "}
                <p className="font-semibold ">{section?.sectionName}</p>
              </div>
              <div className="flex gap-x-2 opacity-50">
                <button
                  onClick={() =>
                    handleChangeEditSection(section._id, section.sectionName)
                  }
                >
                  <GoPencil className="text-xl" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete This Section",
                      text2: "All The Details Of Section Will Be Deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => {
                        handleDeleteSection(section._id, product._id);
                      },
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl" />
                </button>

                <div className="flex items-center">
                  <span className=" text-xl">|</span>{" "}
                  <AiFillCaretDown className="text-xl mt-1 ml-2" />
                </div>
              </div>
            </summary>
            <div>
              {section.subSection.length > 0 &&
                section.subSection.map((subSection) => (
                  <div
                    key={subSection._id}
                    onClick={() => setViewSubSection(subSection)}
                    className="flex justify-around p-3"
                  >
                    <div className="flex gap-2 items-center opacity-80">
                      <RxDropdownMenu className="text-xl" />
                      <p className="font-semibold ">{subSection.title}</p>
                    </div>

                    <div
                      className="flex gap-x-2 opacity-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          setEditSubSection({
                            ...subSection,
                            sectionId: section._id,
                          })
                        }
                      >
                        <GoPencil className="text-xl" />
                      </button>

                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete This SubSection",
                            text2:
                              "All The Details Of SubSection Will Be Deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => {
                              handleDeleteSubSection(
                                subSection._id,
                                section._id
                              );
                            },
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                      >
                        <RiDeleteBin6Line className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              <button
                className="text-yellow-400 font-medium tracking-wide flex items-center mt-1 ml-2 py-2"
                onClick={() => setAddSubSection(section._id)}
              >
                <IoMdAdd className="text-xl" /> Add Details
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default NestedView;
