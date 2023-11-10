import React from 'react';
import { useState } from "react";
import axios from "axios"
import { Link } from 'react-router-dom';
import { Envelope } from 'react-bootstrap-icons';
import InputField from './InputField';
import PasswordInput from './PasswordInput';

const Login = () => {

  const [formData, setFormData] = useState([{
		name: '',
		mail: '',
	}])

  const [error, setError] = useState(null);
  
  const handleChange = (event) => {    
		const { id, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
	};

  const signIn = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/api/v1/signin',
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
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const status = error.response.status;

        if (status === 401) {
          setError('El email o contraseña no coincide');
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
      <div className='2xl:w-2/5 h-screen'>
        {/* pantalla derecha */}
        <div className="h-screen text-center flex items-center justify-center mx-auto my-auto">
          <div className='2xl:w-8/12 text-center 2xl:h-bloque_login relative mx-8 2xl:bottom-28 bottom-20'>
            <div className="rounded-full border-2 border-white mx-auto w-48 h-48 bg-gris-claro translate-y-1/2"></div>
            <div className="text-white border-4 my-auto rounded-2xl bg-cian-oscuro 2xl:h-4/5 border-gris-claro">
              <form action="" onSubmit={signIn} className="items-center justify-center px-pad-1 pb-pad-1 pt-pad-2 font-Inter">
                <InputField icon={<Envelope />} type='email' placeholder='Email' id="mail" value={formData.mail} onChange={handleChange}/>
                <PasswordInput PasswordInput='Contraseña' placeholder='Contraseña' id="password" value={formData.password} onChange={handleChange}/>
                {/* <div className="flex justify-between items-center mt-marg-3">
                  <div className="flex gap-1 items-center">
                    <input type="checkbox" className="w-4 h-4 border-2 border-white rounded-full" />
                    <label htmlFor="Recuerdame" className="2xl:text-base underline">Recuerdame</label>
                  </div>
                  <Link to='' className="2xl:text-base text-white underline">Olvide mi contraseña</Link>
                </div> */}
                <div className="text-center text-red-500 text-sm">
                    {error && <p>{error}</p>}
                  </div>
                <div className="mx-marg-3 ">
                  <button type="submit" className="text-center font-bold font-Inter 2xl:text-xl text-xl p-pad-3 bg-azul-oscuro rounded-full mb-marg-1 mt-marg-2 w-full mt-12">Iniciar sesión</button>
                </div>
                <div className='px-12'>
                  <span className="2xl:text-lg text-base mt-4 font-bold">¿Eres nuevo? <Link to='/SignUp' className='text-azul-oscuro underline' > Registrate</Link></span>
                </div>
              </form>
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

export default Login
