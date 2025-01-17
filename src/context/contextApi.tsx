import { createContext, useRef, useState } from "react";

export function ContextProvider({children}:any){
    const [isOpen, setIsOpen] = useState(true)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [userData, setUserData] = useState({
        username:"",
        password:""
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [contentData, setContentData] = useState({
        title:"",
        link:"",
        type:"",
        _id:""
    })
    const [isEditing, setIsEditing] = useState(false)
    const [isSharing, setIsSharing] = useState(false);
    const [hash, setHash] = useState("");
    const [sharedData, setSharedData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([])
    const inputRef = useRef();
    const [document, setDocument] = useState("");
    return(
        <CreateContext.Provider value={{isOpen, setIsOpen, setData, data, loading, setLoading,error, setError, userData, setUserData, isModalOpen, setIsModalOpen, contentData, setContentData, isEditing, setIsEditing, isSharing, setIsSharing, hash, setHash, sharedData, setSharedData, filteredData, setFilteredData, searchQuery, setSearchQuery, inputRef, document, setDocument}}>
            {children}
        </CreateContext.Provider>
    )
}

export const CreateContext = createContext({});