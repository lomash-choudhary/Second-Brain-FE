import { FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoDocumentSharp } from "react-icons/io5";
import { ImLink } from "react-icons/im";

interface ContentTypeFilterProps {
  activeType: string;
  onTypeChange: (type: string) => void;
}

export function ContentTypeFilter({ activeType, onTypeChange }: ContentTypeFilterProps) {
  const types = [
    { id: 'all', label: 'All', icon: null },
    { id: 'Youtube', label: 'YouTube', icon: FaYoutube },
    { id: 'X', label: 'Twitter', icon: BsTwitterX },
    { id: 'Documents', label: 'Documents', icon: IoDocumentSharp },
    { id: 'Links', label: 'Links', icon: ImLink },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {types.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTypeChange(id)}
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            transition-colors duration-200
            ${activeType === id 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
            }
          `}
        >
          {Icon && <Icon className="text-lg" />}
          {label}
        </button>
      ))}
    </div>
  );
}

