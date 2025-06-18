import { useContext } from "react";
import { CreateContext } from "../context/contextApi";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../components/Button";
import axios from "axios";
import toast from "react-hot-toast";

export default function Modal({ shareId }: { shareId: String }) {
  const {
    loading,
    setLoading,
    setError,
    isModalOpen,
    setIsModalOpen,
    contentData,
    setContentData,
    isEditing,
    setIsEditing,
    document,
    setDocument,
  }: any = useContext(CreateContext);

  const handlerFn = async () => {
    const toastId = toast.loading(
      `${isEditing ? "Updating the Content" : "Adding Content"}`
    );
    // @ts-ignore
    let response;
    const token = localStorage.getItem("userAuthToken");

    try {
      if (!contentData.title || !contentData.type) {
        throw new Error("Please fill in required fields");
      }

      if (isEditing) {
        if (["Documents", "Images", "Videos"].includes(contentData.type)) {
          // If a new file is selected, update both file and metadata
          if (document) {
            const formData = new FormData();
            formData.append("uploadImage", document);
            formData.append("title", contentData.title);
            formData.append("type", contentData.type);

            response = await axios.patch(
              shareId
                ? `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/uploads/${
                    contentData._id
                  }/${shareId}`
                : `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/uploads/${
                    contentData._id
                  }`,
              formData,
              {
                headers: {
                  Authorization: token ? token : undefined,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } else {
            // If no new file, just update the metadata using content endpoint
            response = await axios.patch(
              shareId
                ? `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/content/${
                    contentData._id
                  }/${shareId}`
                : `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/content/${
                    contentData._id
                  }`,
              {
                title: contentData.title,
                type: contentData.type,
              },
              {
                headers: {
                  Authorization: token ? token : undefined,
                },
              }
            );
          }
        } else {
          // For non-file content types
          response = await axios.patch(
            shareId
              ? `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/content/${
                  contentData._id
                }/${shareId}`
              : `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/content/${
                  contentData._id
                }`,
            {
              title: contentData.title,
              link: contentData.link,
              type: contentData.type,
            },
            {
              headers: {
                Authorization: token ? token : undefined,
              },
            }
          );
        }
      } else {
        // Creating new content
        if (["Documents", "Images", "Videos"].includes(contentData.type)) {
          if (!document) {
            throw new Error("Please select a file to upload");
          }

          const formData = new FormData();
          formData.append("uploadImage", document);
          formData.append("title", contentData.title);
          formData.append("type", contentData.type);

          response = await axios.post(
            shareId
              ? `${
                  import.meta.env.VITE_APP_BACKEND_URL
                }/api/v1/upload/${shareId}`
              : `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/upload`,
            formData,
            {
              headers: {
                Authorization: token ? token : undefined,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          // For non-file content types
          response = await axios.post(
            shareId
              ? `${
                  import.meta.env.VITE_APP_BACKEND_URL
                }/api/v1/content/${shareId}`
              : `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/content`,
            {
              title: contentData.title,
              link: contentData.link,
              type: contentData.type,
            },
            {
              headers: {
                Authorization: token ? token : undefined,
              },
            }
          );
        }
      }

      setContentData({ title: "", link: "", type: "" });
      setDocument(null);
      setLoading(false);
      toast.success(
        `${
          isEditing
            ? "Content Updated Successfully"
            : "Content Added Successfully"
        }`,
        { id: toastId }
      );
      setIsEditing(false);
      window.location.reload();
    } catch (err: any) {
      const errorMessage = err.response?.data || err.message;
      setError(errorMessage);
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
      setError("");
      setIsEditing(false);
    }
  };

  return (
    //it will add overlay so that if clicked outside the modal then the modal closes
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={() => setIsModalOpen(!isModalOpen)}
    >
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#4f46e2]">Add Content</h2>
          <RxCross1
            className="text-2xl cursor-pointer"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-semibold text-xl">Title</label>
          <input
            value={contentData.title}
            onChange={(e) =>
              setContentData({ ...contentData, title: e.target.value })
            }
            className="px-4 py-2 bg-slate-100 border-2 rounded-lg text-lg"
            placeholder="Elon Tweet"
          />
          <label className="font-semibold text-xl">Platform</label>
          <select
            className="px-4 py-2 bg-slate-100 border-2 rounded-lg text-lg"
            value={contentData.type}
            onChange={(e) =>
              setContentData({ ...contentData, type: e.target.value })
            }
          >
            <option value={""} disabled>
              Select Platform
            </option>
            <option value={"Youtube"}>Youtube</option>
            <option value={"X"}>X</option>
            <option value={"Documents"}>Documents</option>
            <option value={"Videos"}>Videos</option>
            <option value={"Images"}>Images</option>
            <option value={"Links"}>Other Links</option>
          </select>
          <label className="font-semibold text-xl">
            {["Documents", "Images", "Videos"].includes(contentData.type)
              ? "Upload Document"
              : "Link"}
          </label>
          {["Documents", "Images", "Videos"].includes(contentData.type) ? (
            <input
              type="file"
              onChange={(e) => setDocument(e.target.files![0])}
            />
          ) : (
            <input
              value={contentData.link}
              onChange={(e) =>
                setContentData({ ...contentData, link: e.target.value })
              }
              className="px-4 py-2 bg-slate-100 border-2 rounded-lg text-lg"
              placeholder="x.com"
            />
          )}
        </div>
        <Button
          text={isEditing ? "Update Content" : "Add content"}
          className="w-full mt-4"
          variant="primary"
          onClick={handlerFn}
          isDisabled={loading ? true : false}
        />
      </div>
    </div>
  );
}
