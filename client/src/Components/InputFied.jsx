import React from "react";

// eslint-disable-next-line react/prop-types
export default function InputFied({ icon, type, placeholder }) {
    return (
        <div className="relative mb-1 my-2 mt-2 2xl:text-xl text-lg">
            {icon && (<div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-9 h-15 text-color-icons">
                {icon}
            </div>
            )}
            <input type={type}
                placeholder={placeholder}
                className="rounded-b-2xl rounded-t-2xl h-7 my-1.5 w-full bg-gris-claro text-black py-5 p-16 placeholder-white" />
        </div>
    );
}