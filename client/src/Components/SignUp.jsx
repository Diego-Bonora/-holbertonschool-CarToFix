import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import { Link } from 'react-router-dom';
import { Envelope, Telephone, Person } from 'react-bootstrap-icons';
import InputField from './InputField';
import PasswordInput from './PasswordInput';

export default function SignUp() {

  const [formData, setFormData] = useState([{
		name: '',
		mail: '',
		phone: '',
		password: '',
		password2: '',
	}])

  const [error, setError] = useState(null);
  
  const handleChange = (event) => {    
		const { id, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
	};

  const signUp = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/api/v1/signup',
    JSON.stringify(formData),
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // Handle the data in the response
      console.log('Response data:', response.data);

      localStorage.setItem('userID', JSON.stringify(response.data));

      if (response.status === 201){
        window.location.href = "/home"
      }
  
      // You can now use the response data in your application
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const status = error.response.status;

        if (status === 409) {
          setError('El usuario ya existe. Por favor, elija otro correo electrónico.');
        } else if (status === 401) {
          setError('Credenciales inválidas. Verifique su nombre de usuario o contraseña.');
        } else if (status === 422) {
          if (error.response.data.error === "bad phone number"){
            setError('El numero de telefono es incorrecto');
          }else if(error.response.data.error === "bad password"){
            setError('La contraseña tiene que tener al menor 8 caracteres y una mayuscula');
          }else{
          setError('Las contraseñas no coinciden');
          }
        } else {
          setError('Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError('No se recibió respuesta del servidor. Por favor, verifique su conexión a Internet.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Ocurrió un error en la configuración de la solicitud. Por favor, inténtelo de nuevo.');
      }
    });
    
    console.log(formData);
  };

  return (
    <>
      <div className="w-screen 2xl:min-h-screen  2xl:flex 2xl:items-center bg-cyan-100">
        <div className="hidden 2xl:w-3/5 h-full 2xl:flex 2xl:items-center 2xl:justify-center "> logo </div>
        {/* pantalla derecha */}
        <div className='2xl:w-2/5 h-screen'>
          <div className="h-screen text-center flex items-center justify-center mx-auto my-auto">
            <div className='2xl:w-9/12 text-center 2xl:h-bloque relative mx-8 2xl:bottom-20 bottom-16'>
              <div className="rounded-full border-2 border-white mx-auto 2xl:w-44 2xl:h-44 w-40 h-40 bg-gris-claro translate-y-1/2"></div>
              <div className="text-white border-4 my-auto rounded-2xl bg-cian-oscuro md:h-4/5 border-gris-claro">
                <form action="" onSubmit={signUp} className="items-center justify-center px-pad-1 pb-pad-1 pt-pad-5 font-Inter" >
                  <InputField icon={<Person />} type='text' placeholder='Nombre del taller' id="name" value={formData.name} onChange={handleChange}/>
                  <InputField icon={<Envelope />} type='email' placeholder="Email" id="mail" value={formData.mail} onChange={handleChange}/>
                  <InputField icon={<Telephone />} type='text' placeholder='Número del taller' id="phone" value={formData.phone} onChange={handleChange}/>
                  <PasswordInput placeholder='Contraseña' id="password" value={formData.password} onChange={handleChange}/>
                  <PasswordInput placeholder='Repita la Contraseña' id="password2" value={formData.password2} onChange={handleChange}/>
                  <div className="text-center text-red-500 text-sm">
                    {error && <p>{error}</p>}
                  </div>
                  <div className="mx-marg-4">
                    <button type="submit" className="font-bold text-center 2xl:text-xl text-xl p-pad-3 bg-azul-oscuro rounded-full mb-marg-1 mt-marg-1 w-full">Registrarse</button>
                  </div>
                  <div className='px-14 text-center'>
                    <span className="2xl:text-lg text-base mt-4 font-bold">¿Ya tienes cuenta? </span>
                  </div>
                  <div className='px-20 text-center'>
                    <Link to='/' className='text-azul-oscuro underline 2xl:text-lg text-base mt-4' > Iniciar sesión</Link>
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