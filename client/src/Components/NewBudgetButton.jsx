import React from 'react'
import { Link } from 'react-router-dom'
import wheel from '../assets/wheel.webp'
export default function NewBudgetButton() {
  return (
    <>
      <Link to="/NewBudget" className='h-fit'>
        <div className='button space w-24 h-24 flex flex-col-1 flex-wrap justify-items-end mt-5'>
          <div className="image w-30 h-30">
            <img src={wheel}></img>
          </div>
          <spam className='font-black text-center mt-2'>Nuevo Presupuesto</spam>
        </div>
      </Link>
    </>
  )
}