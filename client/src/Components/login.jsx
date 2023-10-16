import React from "react";
import Button from "./button";
function Login() {
	return (
		<>
			<div className="login-y-logo flex flex-col justify-center  mr-10">

				<div className="logo-app-inicio rounded-full bg-gray-100 border-zinc-300 w-20 h-20 shrink-0 grow-0 border-solid border-2 border-white-500/50 translate-y-8 m-auto">
				</div>

				<div className="ventana-login flex flex-col py-11 bg-[#09B6C2] rounded-2xl border-2 border-white-800">
					<div className="p-5 ">
						<form action="" className="login-form font-sans text-white mb-5">
							<p>Correo</p>
							<input type="text" name="correo" className=" mail bg-[#CCDBDB] mb-4 w-full" />
							<p className="font-sans ">Contraseña</p>
							<input type="text" name="contraseña" className="password bg-[#CCDBDB] mb-4 w-full" />
						</form>
						<div className="buttons flex flex-row gap-4 w-full justify-center">
							<Button color="orange" children="Iniciar Sesion" size="normal" />
						</div>

					</div>

				</div>
			</div>


		</>
	)
}

export default Login;