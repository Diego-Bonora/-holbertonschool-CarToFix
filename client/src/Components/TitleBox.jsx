import React from 'react'

export default function TitleBox({ title, photo }) {
    return (<>
        <div className="principal flex flex-col w-full h-0 mb-5 mt-6">
            <div>
                <div className="logo-app-inicio rounded-full bg-gray-100 border-zinc-300 w-12 h-12 md:w-20 md:h-20 shrink-0 grow-0 border-solid border-2 border-white-500/50 m-auto translate-y-5">
                </div>
                <div className='col-span-1 px-5 py-3 h-40 flex flex-col justify-center items-center bg-[#09B6C2]  rounded-lg md:w-full'>
                    <spam className="text-center text-2xl font-black"> {title}</spam>
                </div>
            </div>
        </div>

    </>
    )
}
