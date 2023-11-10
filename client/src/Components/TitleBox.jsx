import React from 'react'

export default function TitleBox({ title, photo }) {

    return (<>
        <div className="principal flex flex-col w-3/5 h-0 mb-5 mt-6 mx-auto">
            <div>
                <div className="logo-app-inicio rounded-full bg-gray-100 border-zinc-300 w-18 h-18 md:w-24 md:h-24 shrink-0 grow-0 border-solid border-2 border-white-500/50 m-auto translate-y-10" >
                </div>
                <div className='col-span-1 px-5 py-3 h-[138px] flex flex-col justify-center items-center bg-[#09B6C2]  rounded-lg md:w-full'>
                    <spam className="text-center text-2x1 lg:text-3xl font-black text-white"> {title}</spam>
                </div>
            </div>
        </div>

    </>
    )
}