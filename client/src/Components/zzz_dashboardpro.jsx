import React from 'react'
import Confirmation from './Confirmations'
import DashboardDataBox from './DashboardDataBox'
import DataFrame from './DataFrame'
import NewBudgetButton from './NewBudgetButton'
import TitleBox from './TitleBox'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import userAuth from './Authentication'


export default function Dashboard() {
  userAuth();

  const serviceColumns = ['plate', 'description'];
  const budgetColumns = ['plate', 'created', 'services'];

  const baseURL = 'http://127.0.0.1:5000/api/v1';

  const [servicesData, setServicesData] = useState([{ plate: "", description: "" }]);
  const [budgetData, setBudgetData] = useState([{ plate: "", created: "", services: "" }]);
  const [dashboardData, setDashboardData] = useState({});

  let userId = 'aabc26a4-a388-471a-b2c2-580a62ec5bf4';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/dashboard/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = response.data;
        setDashboardData(data);

        let services = Object.values(data.active);
        setServicesData(services.length > 0 ? services : [{ plate: " ", description: "No hay servicios activos" }]);

        let budgets = Object.values(data.budgets);
        budgets.forEach(budget => {
          budget.services = truncateServicesTitles(budget.services, 55);
        });
        setBudgetData(budgets.length > 0 ? budgets : [{ plate: " ", created: "No ingresaron presupuestos", services: " " }]);

      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, [userId]);

  const truncateServicesTitles = (arr, lNum) => {
    if (arr) {
      let stringedArray = arr.join();
      return stringedArray.length > lNum ? stringedArray.slice(0, lNum) + '...' : stringedArray;
    }
    return "sin servicios";
  };


  return (
    <>

      <div className='father flex flex-wrap  max-w-full mt-5'>
        <div className='flex flex-wrap md:grid md:grid-cols-1  md:place-content-evenly justify-center align-top h-full'>
          <div className="flex flex-wrap h-fit md:grid md:grid-cols-2 md:w-screen justify-items-center justify-center">
            {/* Titulo y DataFrames */}
            <div className='h-20 md:mb-10 mb-20 md:w-full md:h-full justify-center -translate-y-16'>
              <TitleBox title={dashboardData.user_name} />
            </div>
            <div className="flex flex-wrap h-full md:grid md:grid-cols-2 md:gap-8 md:place-items-center justify-items-center justify-center min-w-[50px] space-x-5 " >

              <DataFrame title="Presupuestos en espera" level='2' />

              <DataFrame title="Total de Vehiculos" level="10" />

            </div>
          </div>
          {/* Databoxes inferiores con detalles */}
          <div className=" flex flex-wrap w-screen md:grid md:grid-cols-2 justify-items-center justify-center mr-10" >


            <div className='spac-x-5'>
              <div className=" p-2 md:x-92 flex flex-col w-fit bg-[#09B6C2] rounded-lg md:max-w-[800px] ">
                <div className="title h-10">
                  <h3 className='text-2xl font-black text-center text-white'>Servicios activos</h3>
                </div>


                <DashboardDataBox columns={serviceColumns} info={servicesData} />

              </div>

            </div>
            <div>

              <div className="principal p-2 mt-10 md:x-92 flex flex-col bg-[#09B6C2] rounded-lg md:max-w-[800px] h-[200px] ">
                <div className="title h-10">
                  <h3 className='text-2xl font-black text-center text-white p-1'>Confirmaciones Recientes</h3>
                </div>
                <Confirmation columns={budgetColumns} info={budgetData} />
              </div>
              <div className="flex justify-end mt-5">

                <NewBudgetButton className="flex justify-end" />
              </div>
            </div>
            {/* BOTON NUEVO PRESUPUESTO */}
          </div >





        </div >
      </div >

    </>
  )
}
