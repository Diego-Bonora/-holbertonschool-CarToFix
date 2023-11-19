import React from 'react'
import Confirmation from './Confirmations'
import DashboardDataBox from './DashboardDataBox'
import DataFrame from './DataFrame'
import NewBudgetButton from './NewBudgetButton'
import TitleBox from './TitleBox'
import axios, { all } from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import NavBar from './NavBar'


export default function Dashboard() {

  // Columns for databoxes

  const serviceColumns = ['plate', 'description'];
  const serviceColumnsNames = ['Matricula', 'Descripcion'];
  const budgetColumns = ['plate', 'created', 'services'];
  const budgetColumnsNames = ['Matricula', 'ingresado', 'Servicios'];
  const [budgetId, setBudgetId] = useState([])
  const [serviceIds, setSserviceIds] = useState([])

  const baseURL = 'http://127.0.0.1:5000'

  // States for services and budgets data
  const [servicesData, setServicesData] = useState([
    {
      plate: "",
      description: "",
    }]);
  const [budgetData, setBudgetData] = useState([
    {
      plate: "",
      created: "",
      services: "",
      id: ""
    }]);

  // Get a strig from services title array and truncat them for confirmation databox preview
  const truncateServicesTitles = (arr, lNum) => {
    if (arr) {
      let stringedArray = arr.join(', ')
      console.log("JOIN", stringedArray)
      if (stringedArray.length > lNum) {
        return stringedArray.slice(0, lNum) + '... '
      } else {
        return stringedArray
      }
    } else { return "sin servios" }
  }

  // generating the updating interval
  const updateTime = 120 * 1000
  const [update, setUpdate] = useState('now')

  const now = new Date()

  let updating = now.getTime
  const updateData = () => {
    setUpdate(now)
    console.log("UPDATING...", update)
    clearInterval(updating)
  }

  useEffect(() => {

    updating = setInterval(updateData, updateTime)
  }, [window.onload])




  // Get all data from API

  let userId = JSON.parse(localStorage.getItem('userID'));
  const [dashboardData, setDashboardData] = useState([])

  if (userId === null) {
    window.location.href = "/"
  }

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/dashboard/${userId}`)
      .then((res) => {
        if (res) {
          setDashboardData(res.data)
          console.log("dashboard data", dashboardData)
          let services = dashboardData.active
          if (services && services.length) {
            setServicesData(services)
            console.log("active services", services)
            let allservices = services.map((s) => s.budget)
            setSserviceIds(allservices)
            console.log("services id", allservices)
          } else {
            setServicesData([{
              plate: " ",
              description: "No hay servicios activos",
            }])
          }
        }
        let arrServiceTitle = []

        let budgets = []
        if (Object.values(dashboardData.budgets) && (Object.values(dashboardData.budgets).length)) {
          budgets = Object.values(dashboardData.budgets)
          console.log("services", arrServiceTitle)
          budgets.map((b) => {
            let newServices = truncateServicesTitles(b.services, 15)
            b.services = newServices
          })
          setBudgetData(budgets)
          setBudgetId(Object.values(budgets).map((b) => b.id))
          console.log("budgets ids", budgetId)
        } else {
          budgets = [{
            plate: " ",
            created: "No ingresaron presupuestos",
            services: " ",
          }]
          setBudgetData(budgets)
        }
      })
  }, [document.readyState, update]
  )
  const logOut = () => {
    console.log("entro")
    localStorage.removeItem('userID')
    window.location.href = "/";
  }



  return (
    <>
      <div className='w-screen h-screen bg-page_background' >
        <NavBar logOut={logOut} />
        <div className=''>
          <div className='flex flex-col m-2 md:grid md:grid-cols-1 md:place-content-evenly justify-center align-top h-full'>
            <div className='flex flex-wrap md:flex-nowrap'>
              {/* Titulo y DataFrames */}
              <div className='md:w-3/5 w-11/12 md:-translate-y-6 justify-end'>
                <TitleBox title={dashboardData.user_name} userId={userId} />
              </div>
              <div className='w-full md:w-info_confirmations md:translate-y-9 justify-center'>
                <div className='flex flex-wrap md:grid md:grid-cols-2 md:gap-8 md:place-items-center justify-items-center min-w-[50px] space-x-5'>
                  <DataFrame title="Presupuestos en espera" level={dashboardData.onhold} />
                  <DataFrame title="Total de Vehiculos" level={dashboardData.vehicles_total} />
                </div>
              </div>
            </div>
            {/* Databoxes inferiores con detalles */}
            <div className='flex flex-wrap md:flex-nowrap'>
              <div className='spac-x-5 w-full md:w-3/5 mt-10 md:m-0'>
                <div className='p-2 md:x-92 flex flex-col bg-[#09B6C2] rounded-lg md:w-11/12 w-9/12 md:ml-10'>
                  <div className='title h-10'>
                    <h3 className='text-2xl font-black text-center text-white'>Servicios activos</h3>
                  </div>
                  <DashboardDataBox columns={serviceColumns} info={servicesData} titles={serviceColumnsNames} ids={serviceIds} />
                </div>
              </div>
              <div className="principal p-2 md:x-9 flex flex-col bg-[#09B6C2] rounded-lg md:max-w-[800px] h-1/2 md:w-info_confirmations w-9/10 mt-10 md:m-0 h-[280px]">
                <div className="title h-10">
                  <h3 className='text-2xl font-black text-center text-white p-1'>Confirmaciones Recientes</h3>
                </div>
                <Confirmation columns={budgetColumns} info={budgetData} titles={budgetColumnsNames} ids={budgetId} />
              </div>
              <div className="flex justify-end md:mt-5 md:m-0">
                <NewBudgetButton className="flex justify-end" />
              </div>
            </div>
          </div >
        </div >
      </div>
    </>
  )
}