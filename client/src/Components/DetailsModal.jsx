import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

export default function DetailsModal() {

  const { serviceId } = useParams();
  const [ModalData, setModalData] = useState([]);
  const baseURL = 'http://127.0.0.1:5000';
  
  useEffect (() => {
    console.log('idfjfjke', serviceId);
    axios.get(`${baseURL}/api/v1/service/${serviceId}`)
    .then((res) => {
      console.log('model', res.data);
      // Verifica si res.data es un objeto
      if (res.data) {
        const model = {
          title: res.data.title,
          price: res.data.price,
          description: res.data.description,
          worker: res.data.worker,
        };
        setModalData([model]);  //Envolver el único objeto en un arreglo
        console.log('info', model);
      } else {
        console.error("Invalid data structure:", res.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, [serviceId]);

    return (
      <div>
        <div className=" w-full">
          <form action="" className="">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 h-96">
                <div className="bg-white border-8 border-cian-oscuro relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg h-96">
                
                  <h2 className='text-2xl font-black mt-9 text-center'>Matricula</h2>
                  <div className="mx-9 mt-16">
                    <div className='flex flex-col-2 justify-between items-center'>
                      <label className="text-xl">Servicio</label>
                      <div className='flex flex-row-reverse w-1/2'>
                        {ModalData.map((item, index) => (
                        <p key={index} className='bg-[#B4D1D3] p-1 my-2 text-left pl-3 w-full rounded-md'>{item.title}</p>))}
                      </div>
                    </div>
                    <div className='flex flex-col-2 justify-between items-center'>
                        <label className="text-xl">Descripción</label>
                        <div className='flex flex-row-reverse w-1/2'>
                          {ModalData.map((item, index) => (
                          <p key={index} className='bg-[#B4D1D3] p-1 my-2 text-left pl-3 w-full rounded-md'>{item.description}</p>))}
                        </div>
                    </div>
                    <div className='flex flex-col-2 justify-between items-center'>
                        <label className="text-xl">Asignado a</label>
                        <div className='flex flex-row-reverse w-1/2 h-12'>
                          {ModalData.map((item, index) => (
                          <p key={index} className='bg-[#B4D1D3] p-1 my-2 text-left pl-3 w-full rounded-md'>{item.worker}</p>))}
                        </div>
                    </div>
                    <div className='flex flex-col-2 justify-between items-center'>
                        <label className="text-xl">Precio</label>
                        <div className='flex flex-row-reverse w-1/2'>
                          {ModalData.map((item, index) => (
                          <p key={index} className='bg-[#B4D1D3] p-1 my-2 text-left pl-3 w-full rounded-md'>{item.price}</p>))}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}