import { Link } from 'react-router-dom';
import { Envelope, Telephone, Person } from 'react-bootstrap-icons';
import InputFied from './InputFied';
import PasswordInput from './PasswordInput';

export default function Signin() {
	return (
		<>
    <div className="w-screen 2xl:min-h-screen  2xl:flex 2xl:items-center bg-cyan-100">
      <div className="hidden 2xl:w-3/5 h-full 2xl:flex 2xl:items-center 2xl:justify-center "> logo </div>
			{/* pantalla derecha */}
			<div className='2xl:w-2/5 h-screen'>
        <div className="h-screen text-center flex items-center justify-center mx-auto my-auto">
          <div className='2xl:w-9/12 text-center 2xl:h-bloque relative mx-8 2xl:bottom-24 bottom-16'>
            <div className="rounded-full border-2 border-white mx-auto 2xl:w-48 2xl:h-48 w-40 h-40 bg-gris-claro translate-y-1/2"></div>
            <div className="text-white border-4 my-auto rounded-2xl bg-cian-oscuro md:h-4/5 border-gris-claro">
              <form action="" className="items-center justify-center px-pad-1 pb-pad-1 pt-pad-5 font-Inter">
                <InputFied icon={<Person />} type='text' placeholder='Nombre del taller' />
                <InputFied icon={<Telephone />} type='num' placeholder='Número del taller' />
                <InputFied icon={<Envelope />} type='email' placeholder='Email' />
                <PasswordInput />
                <PasswordInput />
                <div className="mx-marg-4">
                  <button type="submit"className="font-bold text-center 2xl:text-2xl text-xl p-pad-3 bg-azul-oscuro rounded-full mb-marg-1 mt-marg-1 w-full">Registrarse</button>
                </div>
                <div className='px-14 text-center'>
                  <span className="2xl:text-xl text-base mt-4 font-bold">¿Ya tienes cuenta? </span>
                </div>
                <div className='px-20 text-center'>
                  <Link to='/' className='text-azul-oscuro underline 2xl:text-xl text-base mt-4' > Iniciar sesión</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 w-full text-center ">
        <div className="bg-gris-footer 2xl:py-1 rounded-t-full">
          <span className="text-black text-xl">Powered by DEEPS Devs 2023</span>
        </div>
      </div>
		</>
	)
}