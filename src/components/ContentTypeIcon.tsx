import { FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoDocumentSharp } from "react-icons/io5";
import { ImLink } from "react-icons/im";

interface ContentTypeIconProps {
  type: string;
  className?: string;
}

export function ContentTypeIcon({ type, className = "" }: ContentTypeIconProps) {
  const iconClass = `${className} transition-colors`;
  
  switch (type) {
    case 'Youtube':
      return <FaYoutube className={`${iconClass} text-red-600 hover:text-red-700`} />;
    case 'X':
      return <BsTwitterX className={`${iconClass} text-black hover:text-gray-800`} />;
    case 'Documents':
      return <IoDocumentSharp className={`${iconClass} text-blue-600 hover:text-blue-700`} />;
    default:
      return <ImLink className={`${iconClass} text-gray-600 hover:text-gray-700`} />;
  }
}

