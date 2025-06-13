import { IoAddOutline, IoShareSocialOutline } from "react-icons/io5";
import { Button } from "../components/Button";
import { SideBar } from "../components/sideBar";
import { CreateContext } from "../context/contextApi";
import { useContext, useEffect } from "react";
import {
  TbLayoutSidebarRightCollapseFilled,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";
import { Card } from "../components/Card";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import { useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export function DashBoard() {
  const { shareId } = useParams();
  const {
    isOpen,
    setIsOpen,
    data,
    setData,
    loading,
    setLoading,
    setError,
    isModalOpen,
    setIsModalOpen,
    setIsEditing,
    contentData,
    setContentData,
    isSharing,
    setIsSharing,
    setHash,
    filteredData,
    setFilteredData,
    searchQuery,
    setSearchQuery,
    inputRef,
  }: any = useContext(CreateContext);

  const isSharedBrain = !!shareId;

  useEffect(() => {
    const toastId = toast.loading(
      isSharedBrain ? "Loading Shared Brain Data" : "Loading the Users Data"
    );
    const datacall = async () => {
      try {
        setLoading(true);
        const response = isSharedBrain
          ? await axios.get(
              `http://localhost:3000/api/v1/brain/${shareId}`
            )
          : await axios.get("http://localhost:3000/api/v1/content", {
              headers: { authorization: localStorage.getItem("userAuthToken") },
            });

        if (isSharedBrain) {
          setData(response.data.content);
        } else {
          setData(response.data.userContentData);
        }
        toast.success("Data Loaded Successfully", { id: toastId });
      } catch (error: any) {
        setError(error.message);
        toast.error("Error occurred while loading the data", { id: toastId });
      } finally {
        setLoading(false);
      }
    };
    datacall();
  }, [shareId, isSharedBrain]);

  useEffect(() => {
    let sharingState = localStorage.getItem("sharing");
    if (sharingState !== null) {
      setIsSharing(JSON.parse(sharingState));
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const result = data.filter((item: any) =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(result);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  const deleteContent = async (_id: any) => {
    const toastId = toast.loading("Deleting the Selected Content");
    try {
      setLoading(true);
      const token = localStorage.getItem("userAuthToken");

      // Create the appropriate URL based on content type and whether we're in a shared brain
      let deleteUrl;
      if (["Documents", "Images", "Videos"].includes(contentData.type)) {
        deleteUrl = isSharedBrain
          ? `http://localhost:3000/api/v1/deleteUploads/${_id}/${shareId}`
          : `http://localhost:3000/api/v1/deleteUploads/${_id}`;
      } else {
        deleteUrl = isSharedBrain
          ? `http://localhost:3000/api/v1/content/${_id}/${shareId}`
          : `http://localhost:3000/api/v1/content/${_id}`;
      }

      await axios.delete(deleteUrl, {
        headers: { Authorization: token ? token : "" },
      });

      toast.success("Content Deleted Successfully", { id: toastId });
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data || "Error deleting content", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const editContent = (item: any) => {
    setIsEditing(true);
    setIsModalOpen(true);
    setContentData({
      title: item.title,
      link: item.link,
      type: item.type,
      _id: item._id,
    });
  };

  const filterAccordingToPlatform = (query: string) => {
    setFilteredData(
      query
        ? data.filter(
            (item: any) => item?.type.toLowerCase() === query.toLowerCase()
          )
        : data
    );
  };

  const shareYourBrain = async () => {
    let newUpdatedState = !isSharing;
    setIsSharing(newUpdatedState);
    localStorage.setItem("sharing", JSON.stringify(newUpdatedState));
    const toastId = toast.loading(
      `${
        isSharing
          ? "Stopping Your Brain From being shared"
          : "Sharing Your Brain"
      }`
    );
    const token = localStorage.getItem("userAuthToken");

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/brain/share",
        { share: !isSharing },
        { headers: { Authorization: token ? token : "" } }
      );

      setHash(isSharing ? "" : response.data.link);

      if (!isSharing) {
        const shareUrl = `${window.location.origin}/brain/share/${response.data.link}`;
        window.open(shareUrl, "_blank");
      }

      toast.success(
        `${
          isSharing
            ? "Successfully Brain Sharing Stopped"
            : "Successfully Shared Your Brain"
        }`,
        { id: toastId }
      );
    } catch (error: any) {
      setError(error.response.data);
      toast.error(
        `${
          isSharing
            ? "Error occurred while stopping the brain sharing"
            : "Error occurred while sharing the brain"
        }`,
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  const focusOnInputBox = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar - Adjusted for better mobile experience */}
      <div
        className={`fixed z-40 h-full bg-white shadow-lg transition-all duration-300 ease-in-out
        ${isOpen ? "w-64 left-0" : "w-16 -left-16 sm:left-0"}`}
      >
        {isModalOpen && <Modal shareId={shareId!} />}

        {isOpen ? (
          <>
            <div className="flex justify-end p-4">
              <TbLayoutSidebarLeftCollapseFilled
                onClick={() => setIsOpen(false)}
                className="text-2xl text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors"
              />
            </div>
            <SideBar onClick={filterAccordingToPlatform} />
          </>
        ) : (
          <div className="flex justify-center py-4">
            <TbLayoutSidebarRightCollapseFilled
              onClick={() => setIsOpen(true)}
              className="text-2xl text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors"
            />
          </div>
        )}
      </div>

      {/* Mobile Menu Button - Only visible when sidebar is closed */}
      <div
        className={`fixed z-40 top-4 left-4 sm:hidden ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg bg-white shadow-md text-indigo-600 hover:text-indigo-800 transition-colors"
          aria-label="Open menu"
        >
          <TbLayoutSidebarRightCollapseFilled className="text-2xl" />
        </button>
      </div>

      {/* Main Content Area - Modified for better mobile handling */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out w-full
        ${
          isOpen ? "sm:ml-64" : "sm:ml-16"
        } ml-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-8`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
              <div className="w-full sm:w-auto">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  All Notes
                </h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                  {filteredData.length} items •{" "}
                  {isSharedBrain ? "Shared Brain" : "Personal Brain"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {!isSharedBrain && (
                  <Button
                    variant="secondary"
                    text={isSharing ? "Stop Sharing" : "Share Brain"}
                    startIcon={<IoShareSocialOutline className="text-xl" />}
                    className="w-full sm:w-44 py-2.5 shadow-sm"
                    onClick={shareYourBrain}
                    isDisabled={loading}
                  />
                )}
                <Button
                  variant="primary"
                  text="Add Content"
                  startIcon={<IoAddOutline className="text-xl" />}
                  className="w-full sm:w-44 py-2.5 shadow-sm"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full">
              <CiSearch
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                onClick={focusOnInputBox}
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by title..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                ref={inputRef}
              />
            </div>
          </div>

          {/* Content Grid - Better mobile spacing */}
          {filteredData.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center w-full">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                <CiSearch className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No notes found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or add some new content
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full">
              {filteredData.map((item: any) => (
                <div
                  key={item._id}
                  className="transform transition-transform hover:scale-[1.02] w-full"
                >
                  <Card
                    title={item.title}
                    type={item.type}
                    link={item.link}
                    _id={item._id}
                    onDelete={deleteContent}
                    onEdit={() => editContent(item)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Footer with Pagination - Adjusted for mobile */}
          {filteredData.length > 0 && (
            <div className="mt-6 sm:mt-8 flex justify-center w-full">
              <div className="bg-white px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between border border-gray-200 rounded-lg shadow-sm w-full max-w-lg mx-auto">
                <div className="flex items-center justify-between w-full">
                  <div className="text-center w-full">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">{filteredData.length}</span>{" "}
                      of{" "}
                      <span className="font-medium">{filteredData.length}</span>{" "}
                      results
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
