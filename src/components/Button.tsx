import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

//Added import from React so that the buttons operate in the same manner as they do in React
type ButtonProps = {
    small?: boolean
    gray?: boolean
    className?: string
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement>;



export function Button({
    small = false, 
    gray = false, 
    className = "", 
    ...props  
}: ButtonProps) {
    const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold";
    const colorClasses = gray 
        ? "bg-gray-600 hover:bg-gray-500 focus-visible:bg-gray-500 text-white"
        : "bg-purple-800 hover:bg-purple-700 focus-visible:bg-purple-700 text-white";

    return (
        <button className={`rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`} 
        {...props}
        ></button>
    );
}
