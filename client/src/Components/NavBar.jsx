import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import isologotipo from '../assets/isologotipo.png';
import nobre_taller from '../assets/nobre_taller.png';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="py-1 pr-14 pl-8 bg-cian-oscuro md:rounded-b-header_border flex items-center justify-between">
        <div className='flex flex-grow items-center'>
          <img src={isologotipo} alt=""  className='w-20 md:block hidden ml-8'/>
          <img src={nobre_taller} alt=""  className='w-60 ml-6'/>
        </div>
        {/* Icono de menú */}
        <div className="lg:hidden pr-10">
        {menuOpen ? (
            <FaTimes onClick={toggleMenu} className='w-7 h-7'/>
          ) : (
            <FaBars onClick={toggleMenu} className='w-7 h-7'/>
          )}
        </div>
        <nav className={`z-50 lg:w-2/5 mr-20 lg:flex lg:justify-end lg:gap-4 lg:static top-[80px] fixed bg-cian-oscuro/95 h-full flex flex-col items-center justify-center lg:flex-row text-2xl transition-transform duration-200 ease-in-out -right-20 w-72
        ${menuOpen ? 'block' : 'hidden'}`}>
          <Link to='/vehicle' className='w-48 h-10 lg:bg-azul-oscuro inline-block rounded text-center py-2 text-white lg:text-base lg:font-medium lg:shadow-[0_4px_9px_-4px_#3b71ca] lg:hover:bg-shadow_header lg:hover:text-white'>Vehículos</Link>
          <Link to='/budgets' className='w-48 h-10 lg:bg-azul-oscuro inline-block rounded text-center text-white py-2 lg:text-base lg:font-medium lg:shadow-[0_4px_9px_-4px_#3b71ca] lg:hover:bg-shadow_header lg:hover:text-white'>Presupuestos</Link>
          <Link to='/Service' className='w-48 h-10 lg:bg-azul-oscuro inline-block rounded text-center text-white py-2 lg:text-base lg:font-medium lg:shadow-[0_4px_9px_-4px_#3b71ca] lg:hover:bg-shadow_header lg:hover:text-white'>Servicios</Link>
        </nav>        
          </div>
    </header>
  )
}