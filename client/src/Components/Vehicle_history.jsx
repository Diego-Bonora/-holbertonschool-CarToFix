import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import NewBudgetButton from './NewBudgetButton';
import axios from 'axios';


export default function Vehicle_history() {
  let tipo_vehiculo = 'auto'
  let matricula = 'saf 6255'
  let info_vehiculo = [{ Marca: 'Hyundai', Modelo: 'Electra', Color: 'Gris'
  }]
  const columns = ['created_at', 'description'];
  const [historyData, sethistoryData] = useState([]); {/* datos de las historias*/}

  const vehId = 'fc2c180e-5828-4f5b-a408-70390655711b';
  const baseURL = 'http://127.0.0.1:5000';

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/vehicle/${vehId}/service`)
      .then((res) => {
        console.log('history', res.data);
        const filterHistory = res.data.map(item => ({
          created_at: item.created_at,
          description: item.description,
        }));
        sethistoryData(filterHistory);
        console.log('historial', filterHistory);
      })
      .catch((error) => {
        console.error('Errormio', error);
      });
  }, [vehId]);
    return (
		<>
        <div className='w-screen h-screen bg-page_background'>
            <NavBar />
            {/* info del vehiculo y matricula*/}
            <div className='bg-tabla_service lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap h-info_vehiculo rounded-r-lg shadow-md shadow-gray-300' >
              {/* matricula general */}
              <div className='border border-azul-oscuro flex flex-col justify-start w-3/12 h-full' >
                {/*tipo de vehiculo*/}
                <div className='bg-azul-oscuro flex items-center justify-center text-lg text-white py-2 h-22/5'>
                  <p>{tipo_vehiculo}</p>
                </div>
                {/* N° matricula*/}
                <div className='bg-white flex items-center justify-center text-xl font-bold py-4 h-3/5'>
                  <p>{matricula}</p>
                </div>
                {/*info del vehiculo */}
              </div>
              <div className='pl-10 w-9/12 h-full'>
                {info_vehiculo.map((info, index) => (
                <div key={index} className='text-black h-full  sm:flex flex-col flex-wrap hidden text-xl my-4 w-9/12'>
                  <div  className='py-2'>
                    Marca: <span className='font-bold'>{info.Marca}</span></div>
                  <div className='pb-1'>
                    Modelo: <span className='font-bold'>{info.Modelo}</span></div>
                  <div className='py-2'>
                    Color: <span className='font-bold'>{info.Color}</span></div>
                </div>
                ))}
              </div>
            </div>
            {/* info del historial */}
            <div className='bg-tabla_service items-center lg:h-info_history h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
            <div className='overflow-y-scroll h-full w-full ml-9'>
                <DataBox columns={columns} info={historyData}/>
              </div>
            <NewBudgetButton />
            </div>
        </div>
		</>

	)
}
