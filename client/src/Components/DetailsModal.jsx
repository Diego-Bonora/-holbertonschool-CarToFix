import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

export default function DetailsModal({ onClose, ids }) {


  console.log('ids', ids);
  const [ModalData, setModalData] = useState([]);
  const baseURL = 'http://127.0.0.1:5000';

  useEffect(() => {
    console.log('idfjfjke', ids);
    axios.get(`${baseURL}/api/v1/service/${ids}`)
      .then((res) => {
        console.log('model', res.data);
        // Verifica si res.data es un objeto
        if (res.data) {
          const model = {
            title: res.data.title,
            price: res.data.price,
            description: res.data.description,
            worker: res.data.worker,
            plate: res.data.plate,
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
  }, [ids]);

  return (
    <div>
      <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <form action="" className="">
          <div className="fixed  inset-0 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 h-96">
              <div className="overflow-y-scroll bg-white border-8 border-cian-oscuro relative transform rounded-lg text-left shadow-xl transition-all w-4/5 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 h-96">
                <button onClick={onClose} className="absolute top-0 right-0 m-4 rounded-full bg-white"><FaTimes /></button>
                {ModalData.map((item, index) => (
                  <h2 key={index} className='text-5xl font-black mt-9 text-center '>{item.plate}</h2>))}
                <div className="mx-9 mt-16">
                  <div className='flex flex-col-2 justify-between items-center bg-gris-footer rounded-2xl'>
                    <label className="text-xl font-bold pl-8">Servicio:</label>
                    <div className='flex flex-row-reverse w-1/2'>
                      {ModalData.map((item, index) => (
                        <p key={index} className=' p-1 my-2 text-left pl-3 w-full rounded-md'>{item.title}</p>))}
                    </div>
                  </div>
                  <div className='flex flex-col-2 justify-between items-center bg-gris-footer rounded-2xl my-1'>
                    <label className="text-xl font-bold pl-8">Descripción:</label>
                    <div className='flex flex-row-reverse w-1/2'>
                      {ModalData.map((item, index) => (
                        <p key={index} className='p-1 my-2 text-left pl-3 w-full'>{item.description}</p>))}
                    </div>
                  </div>
                  <div className='flex flex-col-2 justify-between items-center bg-gris-footer rounded-2xl my-1'>
                    <label className="text-xl font-bold pl-8">Asignado a:</label>
                    <div className='flex flex-row-reverse w-1/2 h-12'>
                      {ModalData.map((item, index) => (
                        <p key={index} className=' p-1 my-2 text-left pl-3 w-full rounded-md'>{item.worker}</p>))}
                    </div>
                  </div>
                  <div className='flex flex-col-2 justify-between items-center bg-gris-footer rounded-2xl my-1'>
                    <label className="text-xl font-bold pl-8">Precio:</label>
                    <div className='flex flex-row-reverse w-1/2'>
                      {ModalData.map((item, index) => (
                        <p key={index} className='] p-1 my-2 text-left pl-3 w-full rounded-md'>{item.price}</p>))}
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