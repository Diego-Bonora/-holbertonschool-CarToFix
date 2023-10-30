import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className=" py-3 pr-14 pl-8 bg-cian-oscuro md:rounded-b-header_border flex items-center justify-between">
        <div className='flex flex-grow items-center'>
          <div className='w-16 h-16 bg-slate-400 rounded-full border-2'></div>
        </div>
        {/* Icono de menú */}
        <div className="md:hidden pr-10">
        {menuOpen ? (
            <FaTimes onClick={toggleMenu} className='w-7 h-7'/>
          ) : (
            <FaBars onClick={toggleMenu} className='w-7 h-7'/>
          )}
        </div>
        <nav className={` md:flex md:justify-end md:gap-4 md:w-2/5 md:static top-[80px] fixed bg-cian-oscuro/95 w-full h-full flex flex-col items-center justify-center left-0 md:flex-row text-2xl rounded-bl-full transition-transform duration-200 ease-in-out
        ${menuOpen ? 'block' : 'hidden'}`}>
          <Link to='' className='w-40 md:bg-azul-oscuro inline-block rounded text-center py-2 text-white md:text-sm md:font-medium md:shadow-[0_4px_9px_-4px_#3b71ca] md:hover:bg-shadow_header md:hover:text-white'>Vehículos</Link>
          <Link to='' className='w-40 md:bg-azul-oscuro inline-block rounded text-center text-white py-2 md:text-sm font-medium md:shadow-[0_4px_9px_-4px_#3b71ca] md:hover:bg-shadow_header md:hover:text-white'>Presupuestos</Link>
          <Link to='' className='w-40 md:bg-azul-oscuro inline-block rounded text-center text-white py-2 md:text-sm font-medium md:shadow-[0_4px_9px_-4px_#3b71ca] md:hover:bg-shadow_header md:hover:text-white'>Servicios</Link>
        </nav>        
          </div>
    </header>
  )
}