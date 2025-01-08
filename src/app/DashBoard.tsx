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

export function DashBoard() {
  const { shareId } = useParams()
  const { isOpen, setIsOpen, data, setData,loading, setLoading, setError, isModalOpen, setIsModalOpen, setIsEditing, setContentData, isSharing, setIsSharing, setHash}: any = useContext(CreateContext);
  const isSharedBrain = !!shareId
    useEffect(() => {
        const toastId = toast.loading(isSharedBrain ? 'Loading Shared Brain Data': 'Loading the Users Data')
        const datacall = async () => {
        try {
            setLoading(true);
            if(isSharedBrain){
              const response = await axios.get(`http://localhost:3000/api/v1/brain/${shareId}`)
              // if(!response){
              //   toast.error('This brain does not exists publicaly',{id:toastId});
              // }
              setData(response.data.content)
            }
            else{
              const response = await axios.get("http://localhost:3000/api/v1/content",{
                  headers:{
                      authorization:localStorage.getItem("userAuthToken")
                  }
              })
              console.log('user content data',response.data.userContentData);
              setData(response.data.userContentData)
            }
            setLoading(false);
            toast.success("Data Loaded Successfully",{id:toastId});
        } catch (error:any) {
            setError(error.message)
            toast.error('Error occured while loading the data', {id:toastId})
        }
        finally{
          setLoading(false)
        }
    }
    datacall()
    },[shareId, isSharedBrain])


    useEffect(() => {
      let sharingState = localStorage.getItem("sharing")
      if(sharingState !== null){
        setIsSharing(JSON.parse(sharingState))
      }
    },[])

    const deleteContent = async (_id:any) => {
      const toastId = toast.loading("Deleting the Selected Content");
      try{
        setLoading(true);
        const token = localStorage.getItem("userAuthToken")
        await axios.delete(`http://localhost:3000/api/v1/content/${_id}`,{
          headers:{
            Authorization: token ? token : ""
          }
        })
        setLoading(false)
        toast.success("Content Deleted Successfully", {id:toastId})
        window.location.reload()

      }catch(error:any){
        toast.error(error.response.data,{id:toastId})
      }
      finally{
        setLoading(false)
      }
    }

    const editContent = (item:any) => {
      setIsEditing(true);
      setIsModalOpen(true)
        setContentData({
          title:item.title,
          link:item.link,
          type:item.type,
          _id:item._id
        })
      }
      const shareYourBrain = async () => {
        let newUpdatedState = !isSharing;
        setIsSharing(newUpdatedState);
        localStorage.setItem('sharing', JSON.stringify(newUpdatedState))
        const toastId = toast.loading(`${isSharing ? 'Stoping Your Brain From being shared': 'Sharing Your Brain'}`);
        const token = localStorage.getItem('userAuthToken')
        try {
          setLoading(true);
          const response = await axios.post('http://localhost:3000/api/v1/brain/share',
            {
              share: isSharing !== true ? true : false
            },
            {
              headers:{
                Authorization: token ? token : ""
              }
            }
          )
          setHash(isSharing ? "":response.data.link)
          if(!isSharing){
            const shareUrl = `${window.location.origin}/brain/share/${response.data.link}`
            window.open(`${shareUrl}`, '_blank')
          }
          setLoading(false);
          toast.success(`${isSharing ? 'Successfully Brain Sharing Stopped':'Successfully Shared Your Brain'}`,{id:toastId})
        } catch (error:any) {
          setError(error.response.data)
          setLoading(false)
          toast.error(`${isSharing ? 'Error occured while stopping the brain sharing':'Error occured while sharing the brain'}`,{id:toastId})
        }
        finally{
          setLoading(false)
        }
      }
  return (
    <div className="flex min-h-screen">
      <div
        className={`h-screen transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-12"
        }`}
      >
        {isModalOpen && <Modal />}
        {isOpen ? (
          <SideBar />
        ) : (
          <TbLayoutSidebarRightCollapseFilled
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl cursor-pointer"
          />
        )}
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out px-4 py-6`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-4xl font-bold">All Notes</div>
              <div className="flex gap-4 justify-end ">
                {!isSharedBrain && (<Button
                  variant="secondary"
                  text={isSharing === true ? "Stop Sharing" : "Share Brain"}
                  startIcon={<IoShareSocialOutline className="text-2xl" />}
                  className="w-44"
                  onClick={() => shareYourBrain()}
                  isDisabled={loading ? true : false}
                />)}
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
          <div className="grid grid-cols-2 md:grid-cols-3 mt-10 gap-8">
            {data.map((item:any) => (
                <Card title={item.title} type={item.type} link={item.link} _id={item._id} onDelete={deleteContent} key={item._id} onEdit={() => editContent(item)} />
            ))}
        </div>
        </div>
      </div>
    </div>
  );
}