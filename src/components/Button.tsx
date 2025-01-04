import { MouseEventHandler, ReactElement } from "react"

export const Button = ({variant, text, startIcon, className, onClick, isDisabled}:ButtonInterface) => {
    return (
        <div>
        <button className={`${variantObject[variant]} ${className} flex items-center gap-2 justify-center`} onClick={onClick} disabled={isDisabled}>{startIcon}{text}</button>
        </div>
    )
}


interface ButtonInterface{
    variant: "primary" | "secondary",
    text: string,
    startIcon?:ReactElement,
    className?:string,
    onClick?: MouseEventHandler<HTMLButtonElement>
    isDisabled?:boolean
    // loading:boolean,
    // setLoading:Dispatch<SetStateAction<boolean>>
}

const variantObject = {
    "primary":"bg-[#5046e4] px-4 py-2 rounded-lg text-white hover:bg-[#372eb6] transition ease-in",
    "secondary":"bg-[#e0e7ff] px-4 py-2 rounded-lg text-[#5c56c1] hover:bg-[#a0b2f3] transition eas-in"
}