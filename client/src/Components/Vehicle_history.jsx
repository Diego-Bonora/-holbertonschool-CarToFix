import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import NewBudgetButton from './NewBudgetButton';
import TypeVehicleIcons from './TypeVehicleIcons';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function Vehicle_history() {

  const { id } = useParams();
  console.log('ID de la ruta:', id);

  let info_vehiculo = [{ Marca: '', Modelo: '', Color: ''
  }]
  const columns = ['created_at', 'description'];
  const columnsName = {
    created_at: 'Ingreso',
    description: 'Detalles',
  }
  const [historyData, sethistoryData] = useState([]); {/* datos de las historias*/}
  const [datavehicle, setdatavehicle] = useState([]);

  const vehId = id;
  const baseURL = 'http://127.0.0.1:5000';

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/vehicle/${vehId}`)
      .then((res) => {
        console.log('history', res.data);
        const filterHistory = res.data.services.map(item => ({
          created_at: item.created_at,
          description: item.description,
          type: res.data.type,
        }));
        sethistoryData(filterHistory);
        console.log('historial', filterHistory);
        const vehicleData = {
          model: res.data.model,
          color: res.data.color,
          brand: res.data.brand,
          type: res.data.type,
          plate: res.data.plate,
        };
        setdatavehicle(vehicleData);
        console.log('info de vehiculo', vehicleData);
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
                <div className={`bg-azul-oscuro flex items-center justify-center text-lg text-white ${datavehicle.type ? 'py-2' : 'py-5'}  h-22/5`}>
                  <p>{datavehicle.type}</p>
                </div>
                {/* N° matricula*/}
                <div className='bg-white flex items-center justify-center py-4 h-3/5'>
                  <p className='text-2xl font-black'>{datavehicle.plate}</p>
                </div>
                {/*info del vehiculo */}
              </div>
              <div className='pl-10 w-9/12 h-full'>
                {info_vehiculo.map((index) => (
                <div key={index} className='text-black h-full  sm:flex flex-col flex-wrap hidden text-xl my-4 w-9/12'>
                  <div  className='py-2'>
                    Marca: <span className='font-bold'>{datavehicle.brand}</span></div>
                  <div className='pb-1'>
                    Modelo: <span className='font-bold'>{datavehicle.model}</span></div>
                  <div className='py-2'>
                    Color: <span className='font-bold'>{datavehicle.color}</span></div>
                </div>
                ))}
              </div>
            </div>
            {/* info del historial */}
            <div className='bg-tabla_service hover:overflow-y-scroll  items-center lg:h-info_history h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
            {historyData.length === 0 ? (
              <div className="text-center text-gray-500 my-8 mx-2.25rem">
              <h2 className="text-xl font-bold">No hay datos disponibles</h2>
            </div>
            ): (
              <div className='h-full w-full mx-9'>
                <DataBox columns={columns}
                info={historyData}
                columnsName={columnsName}
                renderCell={(column, rowData) => {
                  if (column === 'created_at') {
                    const typeIcon = <TypeVehicleIcons TypeVehicle={rowData.type} />;
                    return (
                      <div className="flex items-center">
                        {typeIcon}
                        <span className="ml-4">{rowData[column]}</span>
                      </div>
                    );
                  }
                  return rowData[column];
                }}/>
              </div>
            )}

            <NewBudgetButton />
            </div>
        </div>
		</>

	)
}
