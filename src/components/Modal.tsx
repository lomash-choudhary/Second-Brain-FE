import { useContext } from "react"
import { CreateContext } from "../context/contextApi"
import { RxCross1 } from "react-icons/rx"
import { Button } from "../components/Button"
import axios from "axios"
import toast from "react-hot-toast"

export default function Modal () {
    const {loading, setLoading, setError, isModalOpen, setIsModalOpen, contentData, setContentData, isEditing, setIsEditing, document, setDocument}:any = useContext(CreateContext)
    const formData = new FormData();
    formData.append('uploadImage', document)

    const handlerFn = async () => {
        const toastId = toast.loading(`${isEditing ? "Updating the Content":"Adding Content"}`);
        let response;
        try{
            console.log(contentData)
            if(contentData.type === 'Documents'){
                response = await axios.post(`http://localhost:3000/api/v1/upload`, formData)
                console.log(response);
            }
            else{
            const token = localStorage.getItem("userAuthToken");
            setLoading(true)
            if(isEditing){
                response = await axios.put(`http://localhost:3000/api/v1/content/${contentData._id}`,
                    {
                    title:contentData.title,
                    link:contentData.link,
                    type:contentData.type,
                    },
                    {
                        headers:{
                            Authorization: token ? token : ""
                        }
                    }
                )
            }
            else{
             response = await axios.post(`http://localhost:3000/api/v1/content`,
                {
                title:contentData.title,
                link:contentData.link,
                type:contentData.type,
                },
                {
                    headers:{
                        Authorization: token ? token : ""
                    }
                }
            )
            }
            }
            console.log(response)
            setContentData({
                title:"",
                link:"",
                type:"",
            })
            setLoading(false);
            toast.success(`${isEditing ? "Content Updated Successfully": "Content Added Successfully"}`, {id:toastId});
            setIsEditing(false) 
            window.location.reload()
        }
        catch(err:any){
            setError(err.response.data)
            toast.error(err.response.data,{id:toastId})
        }
        finally{
            setLoading(false)
            setError("");
            setIsEditing(false)
        
        }
        
    }


    return(
        //it will add overlay so that if clicked outside the modal then the modal closes
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsModalOpen(!isModalOpen)}
        >
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-[#4f46e2]">Add Content</h2>
                    <RxCross1 className="text-2xl cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}/>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold text-xl">Title</label>
                    <input 
                        value={contentData.title}
                        onChange={(e) => setContentData({...contentData, title:e.target.value})}
                        className="px-4 py-2 bg-slate-100 border-2 rounded-lg text-lg"
                        placeholder="Elon Tweet"
                    />  
                    <label className="font-semibold text-xl">Platform</label>
                    <select 
                        className="px-4 py-2 bg-slate-100 border-2 rounded-lg text-lg"
                        value={contentData.type}
                        onChange={(e) => setContentData({...contentData, type:e.target.value})}
                    >
                        <option value={""} disabled>Select Platform</option>
                        <option value={"Youtube"}>Youtube</option>
                        <option value={"X"}>X</option>
                        <option value={"Documents"}>Documents</option>
                        <option value={"Links"}>Other Links</option>
                    </select>
                    <label className="font-semibold text-xl">{contentData.type === 'Documents' ? "Upload Document": "Link"}</label>
                    {contentData.type === 'Documents' ? (
                        <input type="file" onChange={(e) => setDocument(e.target.files![0])}/>
                    ): (<input 
                        value={contentData.link}
                        onChange={(e) => setContentData({...contentData, link:e.target.value})}
                        className="px-4 py-2 bg-slate-100 border-2 rounded-lg text-lg"
                        placeholder="x.com"
                    />)}
                </div>
                <Button text="Add Content" className="w-full mt-4" variant="primary" onClick={handlerFn} isDisabled={loading ? true : false}/>
            </div>
        </div>
    )
}