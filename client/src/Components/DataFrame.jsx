import React from 'react'

export default function DataFrame({ title, level }) {
  return (
    <>
      <div className='col-span-1 p-20 w-40 h-40 flex flex-col justify-center items-center bg-[#09B6C2] gap-y-3 rounded-lg'>
        <spam className="text-center text-lg"> {title}</spam>
        <spam className="text-center text-lg"> {level}</spam>
      </div>
    </>

  )
}
