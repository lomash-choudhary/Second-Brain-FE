import { IoAddOutline, IoShareSocialOutline } from "react-icons/io5";
import { Button } from "../components/Button";
import { SideBar } from "../components/sideBar";
import { CreateContext } from "../context/contextApi";
import { useContext, useEffect } from "react";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { Card } from "../components/Card";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import { useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export function DashBoard() {
  const { shareId } = useParams();
  const { 
    isOpen, setIsOpen, data, setData, loading, setLoading, setError, 
    isModalOpen, setIsModalOpen, setIsEditing, contentData, setContentData, 
    isSharing, setIsSharing, setHash, filteredData, setFilteredData, 
    searchQuery, setSearchQuery, inputRef 
  }: any = useContext(CreateContext);

  const isSharedBrain = !!shareId;

  useEffect(() => {
    const toastId = toast.loading(isSharedBrain ? 'Loading Shared Brain Data' : 'Loading the Users Data');
    const datacall = async () => {
      try {
        setLoading(true);
        const response = isSharedBrain
          ? await axios.get(`http://localhost:3000/api/v1/content/${shareId}`)
          : await axios.get("http://localhost:3000/api/v1/content", {
              headers: { authorization: localStorage.getItem("userAuthToken") }
            });

        setData(response.data.userContentData);
        toast.success("Data Loaded Successfully", { id: toastId });
      } catch (error: any) {
        setError(error.message);
        toast.error('Error occurred while loading the data', { id: toastId });
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
      await axios.delete(
        ["Documents", "Images", "Videos"].includes(contentData.type)
          ? `http://localhost:3000/api/v1/deleteUploads/${_id}/${shareId}`
          : `http://localhost:3000/api/v1/content/${_id}/${shareId}`,
        { headers: { Authorization: token ? token : "" } }
      );
      toast.success("Content Deleted Successfully", { id: toastId });
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response.data, { id: toastId });
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
        ? data.filter((item: any) => item?.type.toLowerCase() === query.toLowerCase())
        : data
    );
  };

  const shareYourBrain = async () => {
    let newUpdatedState = !isSharing;
    setIsSharing(newUpdatedState);
    localStorage.setItem("sharing", JSON.stringify(newUpdatedState));
    const toastId = toast.loading(
      `${isSharing ? "Stopping Your Brain From being shared" : "Sharing Your Brain"}`
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
        `${isSharing ? "Successfully Brain Sharing Stopped" : "Successfully Shared Your Brain"}`,
        { id: toastId }
      );
    } catch (error: any) {
      setError(error.response.data);
      toast.error(
        `${isSharing ? "Error occurred while stopping the brain sharing" : "Error occurred while sharing the brain"}`,
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
    <div className="flex min-h-screen">
      <div className={`h-screen transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-12"}`}>
        {isModalOpen && <Modal shareId={shareId!} />}
        {isOpen ? <SideBar onClick={filterAccordingToPlatform} /> : (
          <TbLayoutSidebarRightCollapseFilled
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl cursor-pointer"
          />
        )}
      </div>
      <div className="flex-1 transition-all duration-300 ease-in-out px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-4xl font-bold">All Notes</div>
              <div className="flex gap-4 justify-end">
                {!isSharedBrain && (
                  <Button
                    variant="secondary"
                    text={isSharing ? "Stop Sharing" : "Share Brain"}
                    startIcon={<IoShareSocialOutline className="text-2xl" />}
                    className="w-44"
                    onClick={shareYourBrain}
                    isDisabled={loading}
                  />
                )}
                <Button
                  variant="primary"
                  text="Add Content"
                  startIcon={<IoAddOutline className="text-2xl" />}
                  className="w-44"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                />
              </div>
            </div>
          </div>
          <div className="relative flex items-center max-w-sm mt-4">
            <CiSearch 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" 
              onClick={focusOnInputBox} 
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter the title to search"
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-2 border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={inputRef}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 gap-4 sm:gap-6 md:gap-8">
            {filteredData.map((item: any) => (
              <Card 
                key={item._id} 
                title={item.title} 
                type={item.type} 
                link={item.link} 
                _id={item._id} 
                onDelete={deleteContent} 
                onEdit={() => editContent(item)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}