import React from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import NewBudgetButton from './NewBudgetButton';


export default function Vehicle_history() {
  let tipo_vehiculo = 'auto'
  let matricula = 'saf 6255'
  let info_vehiculo = [{ Marca: 'Hyundai', Modelo: 'Electra', Color: 'Gris'
  }]
  const columns = ['Ingreso', 'detalle'];
  const data = [{ Ingreso: '24/10/2022', detalle: 'Cambio de aceite hjsen jhndxecWUO HNDXEJKWHCI'},
  { Ingreso: '24/10/2022', detalle: 'Chequeo general dl condnsador de flujos'},
  { Ingreso: '24/10/2022', detalle: 'Revision de frenos'},
	{ Ingreso: '24/10/2022', detalle: 'Electricidad'},
	{ Ingreso: '24/10/2022', detalle: 'Tren delantero'},
  { Ingreso: '24/10/2022', detalle: 'Tren delantero'},
  { Ingreso: '24/10/2022', detalle: ''}];
    return (
		<>
        <div className='w-screen h-screen bg-page_background'>
            <NavBar />
            {/* info del vehiculo y matricula*/}
            <div className='bg-gris-background lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap h-info_vehiculo rounded-r-lg'>
              {/* matricula general */}
              <div className='border border-azul-oscuro flex flex-col justify-start w-3/12 h-full' >
                {/*tipo de vehiculo*/}
                <div className='bg-azul-oscuro text-center text-white py-2'>
                  <p>{tipo_vehiculo}</p>
                </div>
                {/* N° matricula*/}
                <div className='bg-white  text-center text-2xl font-bold py-4 '>
                  <p>{matricula}</p>
                </div>
                {/*info del vehiculo */}
              </div>
              <div className='pl-10 w-9/12 flex  h-full'>
                {info_vehiculo.map((info, index) => (
                <div key={index} className='text-black sm:flex sm:flex-col sm:flex-wrap hidden text-xl my-4 w-9/12'>
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
            <div className='bg-gris-background items-center lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center'>
                <div className="data w-full flex flex-col ml-10">
                  <DataBox columns={columns} info={data}/>
                </div>
            <NewBudgetButton />
            </div>
        </div>
		</>

	)
}