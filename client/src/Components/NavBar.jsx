import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
      <header>
        <div className="py-3 pr-14 pl-8 bg-cian-oscuro h-[80px] rounded-b-header_border flex items-center">
          <div className='flex flex-grow items-center'>
            <div className='w-16 h-16 bg-slate-400 rounded-full border-2'></div>
          </div>
          <nav className="flex justify-end gap-4 self-center w-2/5">
            <Link to='' className='w-40 bg-azul-oscuro inline-block rounded text-center py-2 text-white text-sm font-medium shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-shadow_header hover:text-white'>Vehículos</Link>
            <Link to='' className='w-40 bg-azul-oscuro inline-block rounded text-center text-white py-2 text-sm font-medium shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-shadow_header hover:text-white'>Presupuestos</Link>
            <Link to='' className='w-40 bg-azul-oscuro inline-block rounded text-center text-white py-2 text-sm font-medium shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-shadow_header hover:text-white'>Servicios</Link>
          </nav>
        </div>
      </header>
    </div>
  )
}
