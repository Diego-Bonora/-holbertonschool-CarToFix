import React from 'react';
import { Link } from 'react-router-dom';
import wheel from '../assets/wheel.webp';

export default function NewBudgetButton() {
  return (
    <div className='absolute bottom-0 right-0 lg:py-5 pr-28 pl-5'>
      <Link to="/NewBudget">
        <div className='button lg:w-24 lg:h-24 w-16 h-16 flex flex-col justify-end items-center mt-5'>
          <div className="image w-30 h-30">
            <img src={wheel} alt="Wheel" />
          </div>
          <span className='font-black text-center mt-2 lg:text-2xl text-lg'>Nuevo Presupuesto</span>
        </div>
      </Link>
    </div>
  );
}
