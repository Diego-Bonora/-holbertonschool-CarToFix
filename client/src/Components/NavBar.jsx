import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import isologotipo from '../assets/isologotipo.png';
import nobre_taller from '../assets/nobre_taller.png';
import { IoClose } from "react-icons/io5";

export default function NavBar({ logOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <header>
      <div className=" py-1 pr-14 pl-8 bg-cian-oscuro md:rounded-b-header_border flex items-center justify-between">
        <div className='flex flex-grow items-center' >
          <Link to="/home" className='md:block hidden ml-8'>
            <img src={isologotipo} alt="" className='w-20' />
          </Link>
          <img src={nobre_taller} alt="" className='w-60 ml-6' />
        </div>
        {/* Icono de menú */}
        <div className="md:hidden pr-10">
          {menuOpen ? (
            <FaTimes onClick={toggleMenu} className='w-7 h-7' />
          ) : (
            <FaBars onClick={toggleMenu} className='w-7 h-7' />
          )}
        </div>
        <nav className={`mr-20 md:flex md:justify-end md:gap-4 md:w-2/5 md:static top-[80px] fixed bg-cian-oscuro/95 w-full h-full flex flex-col items-center justify-center left-0 md:flex-row text-2xl rounded-bl-full transition-transform duration-200 ease-in-out
        ${menuOpen ? 'block' : 'hidden'}`}>
          <Link to='/vehicle' className='w-48 h-10 md:bg-azul-oscuro inline-block rounded text-center py-2 text-white md:text-base md:font-medium md:shadow-[0_4px_9px_-4px_#3b71ca] md:hover:bg-shadow_header md:hover:text-white' >Vehículos</Link>
          <Link to='/budgets' className='w-48 h-10 md:bg-azul-oscuro inline-block rounded text-center text-white py-2 md:text-base font-medium md:shadow-[0_4px_9px_-4px_#3b71ca] md:hover:bg-shadow_header md:hover:text-white' >Presupuestos</Link>
          <Link to='/Service' className='w-48 h-10 md:bg-azul-oscuro inline-block rounded text-center text-white py-2 md:text-base font-medium md:shadow-[0_4px_9px_-4px_#3b71ca] md:hover:bg-shadow_header md:hover:text-white' >Servicios</Link>
          <IoClose className='text-black w-8 h-8' onClick={toggleDropdown} />
          {dropdown && (<div className='absolute mt-1 shadow-md rounded translate-y-full'> <button className='w-48 h-10 md:bg-azul-oscuro inline-block rounded text-center text-white py-2 md:text-base font-medium md:shadow-[0_4px_9px_-4px_#3b71ca] md:hover:bg-shadow_header md:hover:text-white mt-2 pr-4' onClick={logOut}>Cerrar sesion</button> </div>)}
        </nav>
      </div>
    </header>
  )
}