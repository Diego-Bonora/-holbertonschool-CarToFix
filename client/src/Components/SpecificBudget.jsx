import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import axios from 'axios';
import FilterService from './FilterService';
import { useParams } from 'react-router-dom';


export default function SpecificBudget() {

  const { id } = useParams();
  console.log('ID de la ruta:', id);

  let info_vehiculo = [{ Marca: '', Modelo: '', Color: ''
  }]
  const columns = ['title', 'description', 'done'];
  const [historyData, sethistoryData] = useState([]); {/* datos de las historias*/}
  const [datavehicle, setdatavehicle] = useState([]);

  const [selectedType, setSelectedType] = useState(''); {/* para el filtro y el tipo de servicio que se selecciona*/}
  const [typeservice, settypeService] = useState([]); {/*  por tipo */}
  const [Initial, setInitial] = useState([]); {/*  copia de los datos */}


  const bdgtId = id;
  const baseURL = 'http://127.0.0.1:5000';


  useEffect(() => {
    axios.get(`${baseURL}/api/v1/budget/done/${bdgtId}`)
      .then((res) => {
        console.log('history', res.data);
        const filterHistory = res.data.services.map(item => ({
          title: item.title,
          description: item.description,
          done: item.done,
        }));
        sethistoryData(filterHistory);
        setInitial(filterHistory); {/* Guarda la copia */}

        console.log('historial', filterHistory);
        const vehicleData = {
          model: res.data.vehicle.model,
          color: res.data.vehicle.color,
          brand: res.data.vehicle.brand,
          plate: res.data.vehicle.plate,
          vehicle_type: res.data.vehicle_type,
        };
        setdatavehicle(vehicleData);
        console.log('info de vehiculo', vehicleData);

        {/*tipo de servicio*/}
        const uniqueTypes = ['Tipo de servicio',...Array.from(new Set(filterHistory.map(item => item.title)))];
        settypeService(uniqueTypes);
        console.log('tipos de servicio', uniqueTypes);
      })
      .catch((error) => {
        console.error('Errormio', error);
      });

  }, [bdgtId]);

    {/*POR SERVICIO*/}
    const filterByType = (selectedType) => {
      setSelectedType(selectedType);
      
      if (selectedType === 'Tipo de servicio') {
        sethistoryData(Initial);
      } else {
        const filteredServiceData = Initial.filter(item => item.title === selectedType);
        sethistoryData(filteredServiceData);
      }
    };
  
    return (
		<>
        <div className='w-screen h-screen bg-page_background'>
            <NavBar />
            <div className='flex lg:ml-marg-4 ml-marg-1 mt-marg-3'>
            {/* info del vehiculo y matricula*/}
            <div className='bg-tabla_service lg:w-info_detalles w-info_detalles_mini flex flex-wrap h-28 rounded-r-lg shadow-md shadow-gray-300 ' >
              {/* matricula general */}
              <div className='border border-azul-oscuro flex flex-col justify-start w-3/12 h-full' >
                {/*tipo de vehiculo*/}
                <div className='bg-azul-oscuro flex items-center justify-center text-lg text-white py-2 h-22/5'>
                  <p>{datavehicle.vehicle_type}</p>
                </div>
                {/* N° matricula*/}
                <div className='bg-white flex items-center justify-center text-xl font-bold py-4 h-3/5'>
                  <p>{datavehicle.plate}</p>
                </div>
                {/*info del vehiculo */}
              </div>
              <div className='lg:pl-10 pl-5 lg:w-9/12 w-2/5 h-28 flex-wrap'>
                {info_vehiculo.map((index) => (
                <div key={index} className='text-black h-28  sm:flex flex-col flex-wrap hidden text-xl my-4 w-10/12'>
                  <div className='py-2'>
                    Marca: <span className='font-bold'>{}</span></div>
                  <div className='pb-1'>
                    Modelo: <span className='font-bold'>{datavehicle.model}</span></div>
                  <div className='py-2'>
                    Color: <span className='font-bold'>{datavehicle.color}</span></div>
                </div>
                ))}
              </div>
            </div>
              <FilterService typeservice={typeservice} filterByType={filterByType} selectedType={selectedType} classname="md:w-full w-1/2 ml-10" />
              </div>
            {/* info del historial */}
            <div className='bg-tabla_service items-center h-info_history w-35 lg:mr-marg_detalles mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
            <div className='overflow-y-scroll h-full w-full ml-9'>
                <DataBox columns={columns} info={historyData}/>
              </div>
            </div>
        </div>
		</>

	)
}
