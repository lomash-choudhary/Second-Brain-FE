import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { cleanYoutubeUrl } from "../helpers/clearYoutubeUrl";
import { FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoDocumentSharp } from "react-icons/io5";
import { PiImageSquareFill } from "react-icons/pi";
import { ImLink } from "react-icons/im";
import { RiVideoLine } from "react-icons/ri";
import { useContext } from "react";
import { CreateContext } from "../context/contextApi";

export interface cardInputInterface {
    title: string;
    link: string;
    type:string,
    _id: string;
    onDelete?: (id: string) => void;
    onEdit?: () => void;
  }


  const redirectToLink = (link:string) => {
    window.open(link,'__blank')
  }
  
  export const Card = ({ title, link, type, _id, onDelete, onEdit }: cardInputInterface) => {
    const {isSideBarOpen}:any = useContext(CreateContext)
    return (
      <div 
        className={`bg-white rounded-md w-[350px] ${
          type === "youtube" ? "h-[255px]" : "h-fit"
        } border-[1px] border-slate-200 shadow-xl shadow-slate-200 flex flex-col overflow-hidden group`}
        key={_id}
      >
        <div className="flex justify-between pt-4">
          <div className="flex items-center gap-4 pl-2">
            <div className="text-[#545454] text-xl font-bold hover:cursor-pointer" onClick={() => redirectToLink(link)}>
              {(() => {
                if(type === 'Youtube'){
                    return <FaYoutube className="text-[#ff0033]"/>
                }
                else if(type === 'X'){
                    return <BsTwitterX className="text-black"/> 
                }
                else if(type === 'Documents'){
                    return <IoDocumentSharp />
                }
                else if(type === 'Images'){
                  return <PiImageSquareFill />
                }
                else if(type === 'Videos'){
                  return <RiVideoLine />
                }
                else{
                    return <ImLink />
                }
              })()}
            </div>
            <div className={`text-xl font-medium truncate ${
              isSideBarOpen ? "w-[180px]" : "w-[220px]"
            }`} title={title}>
              {title}
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#adb3bd] pr-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <div className="text-xl hover:cursor-pointer transition-colors duration-200 hover:scale-110 hover:text-black" onClick={onEdit}>
              <BiSolidEdit />
            </div>
            <div onClick={() => onDelete?.(_id)} className="hover:cursor-pointer text-xl hover:text-red-300 hover:rounded-lg transition-colors duration-200 hover:scale-110">
              <MdOutlineDelete />
            </div>
          </div>
        </div>
        <div className="p-4 flex-1">
          {type === "Youtube" && (
            <div className="relative w-full h-full">
              <iframe 
                className="w-full h-full rounded-lg"
                src={cleanYoutubeUrl(link)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          
          {type === "X" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a> 
            </blockquote>
          )}

          {type === "Images" && (
            <img src={link} alt="Cloudinary Image" className="max-w-full h-auto rounded-lg" />
          )}

          {type === "Videos" && (
            <video controls className="max-w-full rounded-lg">
              <source src={link} type="video/mp4" />
            </video>
          )}

          {type === "Documents" && (
            <iframe src={link} className="max-w-full h-auto rounded-lg" />
          )}
        </div>
      </div>
    );
  };