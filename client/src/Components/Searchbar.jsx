import React from "react";
import {AiOutlineSearch} from 'react-icons/ai'

export default function Search() {
    return (
        <form className='w-1/2 relative'>
            <div className="relative ">
                <input type="search" placeholder='Buscar' className='w-full p-2 rounded-2xl bg-gris-footer '/>
                <button className='absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-gris-footer rounded-full'>
                    <AiOutlineSearch />
                </button>
            </div>      
        </form>
      )
}