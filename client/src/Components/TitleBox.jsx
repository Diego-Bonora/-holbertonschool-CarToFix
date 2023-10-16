import React from 'react'

export default function TitleBox({ title, photo }) {
    return (<>
        <div className="principal flex flex-col align-top">

            <div className="logo-app-inicio rounded-full bg-gray-100 border-zinc-300 w-20 h-20 shrink-0 grow-0 border-solid border-2 border-white-500/50 m-auto translate-y-5">
            </div>
            <div className='col-span-1 p-5 flex flex-col justify-center items-center bg-[#09B6C2] gap-y-3 rounded-lg'>
                <spam className="text-center text-lg"> {title}</spam>
            </div>
        </div>

    </>
    )
}
