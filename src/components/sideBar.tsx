import { useContext } from "react";
import { FaBrain } from "react-icons/fa";
import { CreateContext } from "../context/contextApi";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { RiTwitterXFill } from "react-icons/ri";
import { CgFileDocument, CgYoutube } from "react-icons/cg";
import { IoIosLink } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export function SideBar(){
    const {isOpen, setIsOpen}:any = useContext(CreateContext)
    const navigate = useNavigate()
    return(
        <div className="fixed bg-white h-screen top-0 left-0 w-68 border-r-2 border-slate-200 pr-2">
            <div className="flex justify-end text-2xl" onClick={() => setIsOpen(!isOpen)}>
                {isOpen && <TbLayoutSidebarRightExpandFilled className="hover:cursor-pointer"/> }
            </div>
            <div className="flex gap-4 items-center text-3xl px-4 py-1 mb-4 hover:cursor-pointer" onClick={() => navigate('/dashboard')}>
                <FaBrain />
                <p className="font-semibold">Second Brain</p>
            </div>
            <div className="text-2xl flex flex-col gap-4 px-4">
                <div className="flex gap-2 items-center justify-center hover:rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer py-2 px-2">
                    <RiTwitterXFill />
                    Tweets
                </div>
                <div className="flex gap-2 items-center justify-center hover:rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer py-2 px-2">
                    <CgYoutube />
                    Youtube
                </div>
                <div className="flex gap-2 items-center justify-center hover:rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer py-2 px-2">
                    <CgFileDocument />
                    Documents
                </div>
                <div className="flex gap-2 items-center justify-center hover:rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer py-2 px-2">
                    <IoIosLink />
                    Links
                </div>
            </div>
        </div>
    )
}