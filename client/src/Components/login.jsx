import React from 'react';
import { Link } from 'react-router-dom';
import { Envelope } from 'react-bootstrap-icons';
import { Lock } from 'react-bootstrap-icons';

export default function Login() {
	return (
		<>
			<div className='w-2/5 h-screen bg-gray-200'>
				{/* pantalla derecha */}
				<div className="w-9/12 h-screen text-center flex items-center justify-center mx-auto my-auto">
					<div>
						<div className="rounded-full border-2 mx-auto w-28 h-28 bg-white translate-y-1/2"></div>
						<div className="text-white border-2 my-auto rounded-lg border-color-icons bg-cian-oscuro">
							<form action="" className=" pb-10 pt-20 px-8">
								<div className='relative my-2 text-xs'>
									<Envelope className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 text-color-icons" />
									<input type="Email" placeholder="Email" className="rounded-md h-7 my-2.5 w-full bg-gris-claro text-black p-1 pl-8 placeholder-white" />
								</div>
								<div className='relative my-1 text-xs'>
									<Lock className="absolute left-2 top-1/2 transform -translate-y-3/4 w-4 h-6 text-color-icons" />
									<input type="Contraseña" placeholder="Contraseña" className="rounded-md mb-3 h-7 w-full bg-gris-claro text-black p-1 pl-8 placeholder-white" />
								</div>
								<div className="flex justify-between items-center">
									<div className="flex gap-1 items-center">
										<input type="checkbox" />
										<label htmlFor="Recuerdame" className="text-xs underline">Recuerdame</label>
									</div>
									<Link to='' className="text-xs text-white underline">Olvide mi contraseña</Link>
								</div>
								<div className="'BOTON LOGIN ">
									<button type="submit" className="text-center py-1 bg-azul-oscuro rounded-full mb-2 mt-4 w-full ">Iniciar sesión</button>
								</div>
								<div className='px-12'>
									<span className="text-xs mt-4">¿Eres nuevo? <Link to='/Signin' className='text-azul-oscuro underline' > Registrate</Link></span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}