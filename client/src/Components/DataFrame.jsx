import React from 'react'

export default function DataFrame({ title, level }) {
    return (
        <>
            <div className='col-span-1  w-60 py-11 flex my-4  flex-col justify-center items-center bg-[#09B6C2] gap-y-3 rounded-lg'>
                <spam className="text-center text-lg font-bold"> {title}</spam>
                <spam className="text-center text-2xl font-black"> {level}</spam>
            </div>
        </>

    )
}
