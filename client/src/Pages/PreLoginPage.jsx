import Login from '../Components/Login';
import logo_taller from '../assets/logo_taller.png';

export default function PreLoginPage() {
  return (
    <>
      <div className="w-screen 2xl:min-h-screen  2xl:flex 2xl:items-center bg-cyan-100">
        <div className="hidden 2xl:w-3/5 h-full 2xl:flex 2xl:items-center 2xl:justify-center "> <img src={logo_taller} alt="" className='w-auto' /> </div>
        <Login />
      </div>
    </>
  )
}