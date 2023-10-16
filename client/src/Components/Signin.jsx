import { Link } from 'react-router-dom';
import { Envelope, Lock, Telephone, Person } from 'react-bootstrap-icons';

export default function Signin() {
	return (
		<>
			<div className="w-screen h-screen  flex items-center  justify-center flex-row bg-cyan-200">
				<div className="logo-app px-5 mr-40 logo h-[100px] w-2/5  bg-gray-100 "> logo </div>
				{/* pantalla derecha */}
				<div className="w-3/5 sm:min-w-[400px] md:max-w-[500px] h-screen bg-gray-200 flex items-center justify-center">
					<div className="w-9/12 h-screen text-center mx-auto my-auto">
						<div className="rounded-full border-2 mx-auto w-28 h-28 bg-white translate-y-1/2"></div>
						<div className="text-white border-2 my-auto rounded-lg border-color-icons bg-cian-oscuro">
							<form action="" className=" h-full pb-3.5 pt-20 px-6">
								<div className='relative my-2 text-xs'>
									<Person className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 text-color-icons" />
									<input type="Name" placeholder="Nombre del taller" className="rounded-md h-6 w-full bg-gris-claro text-black p-1 pl-8 placeholder-white" />
								</div>
								<div className='relative my-2 text-xs'>
									<Telephone className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 text-color-icons" />
									<input type="Number" placeholder="Número del taller" className="rounded-md h-6 w-full bg-gris-claro text-black p-1 pl-8 placeholder-white" />
								</div>
								<div className='relative my-2 text-xs'>
									<Envelope className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 text-color-icons" />
									<input type="Email" placeholder="Email" className="rounded-md h-6 w-full bg-gris-claro text-black p-1 pl-8 placeholder-white" />
								</div>
								<div className='relative my-1 text-xs'>
									<Lock className="absolute left-2 top-1/2 transform -translate-y-3/4 w-4 h-6 text-color-icons" />
									<input type="Contraseña" placeholder="Contraseña" className="rounded-md h-6 w-full bg-gris-claro text-black p-1 pl-8 placeholder-white" />
								</div>
								<div className='relative my-1 text-xs'>
									<Lock className="absolute left-2 top-1/2 transform -translate-y-3/4 w-4 h-6 text-color-icons" />
									<input type="Contraseña" placeholder="Repetir contraseña" className="rounded-md h-6  w-full bg-gris-claro text-black p-1 pl-8 placeholder-white" />
								</div>
								<div className="'BOTON LOGIN ">
									<button type="submit" className="active:scale-[.98] text-center py-1 bg-azul-oscuro rounded-full mb-2 mt-4 w-full ">Registrarse</button>
								</div>
								<div className='px-14 text-center'>
									<span className="text-xs  mt-4">¿Ya tienes cuenta? </span>
								</div>
								<div className='px-20 text-center'>
									<Link to='/' className='text-azul-oscuro underline text-xs mt-4' > Iniciar sesión</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}