import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../common/IconButton";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { updateProfilePicture } from "../../../../services/operations/settingsAPI";

const ChangeProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setImageFile(file);
      // console.log("ImageFile Sate =======>", imageFile);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      console.log("Uploading...");
      setLoading(true);
      let formData = new FormData();
      formData.append("pic", imageFile);
      console.log(formData);
      dispatch(updateProfilePicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("Error Message ====> ", error);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
      console.log(imageFile);
    }
  }, [imageFile]);

  return (
    <>
      <div className="flex flex-wrap gap-y-2 gap-x-4 bg-[#161d29] p-8 rounded-lg">
        <img
          src={previewSource || user?.image}
          alt={`Profile-${user?.name}`}
          className="rounded-[50%] max-w-[80px] object-cover aspect-square"
        />
        <div className="flex flex-col gap-y-2">
          <p className="text-slate-300">Change Profile Picture</p>
          <div className="flex flex-wrap gap-x-3 gap-y-3">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/gif, image/jpeg, image/jpg"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleClick}
                className="bg-[#2C333F] font-medium px-6 py-[9px] rounded-lg text-white"
              >
                Select
              </button>
            </div>
            <IconButton
              onclick={handleFileUpload}
              text={loading ? "Uploading..." : "Upload"}
            >
              {!loading && <AiOutlineCloudUpload className="text-xl" />}
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeProfile;
