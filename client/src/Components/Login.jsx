import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Envelope } from 'react-bootstrap-icons';
import InputField from './InputField';
import PasswordInput from './PasswordInput';
import axios from 'axios';

const Login = () => {

  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recuerdame, setRecuerdame] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (eventSubmit) => {
    eventSubmit.preventDefault();

    const formData = {
      mail: mail,
      password: password
    };

    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem('sessionToken', response.data.sessionToken);
        navigate('/home');
      } else if ([400, 404, 401].includes(response.status)) {
        setError(response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
    // when log out
    // localStorage.removeItem('sessionToken');
  };


  return (
    <>
      <div className='2xl:w-2/5 h-screen'>
        {/* pantalla derecha */}
        <div className="h-screen text-center flex items-center justify-center mx-auto my-auto">
          <div className='2xl:w-8/12 text-center 2xl:h-bloque_login relative mx-8 2xl:bottom-28 bottom-20'>
            <div className="rounded-full border-2 border-white mx-auto w-48 h-48 bg-gris-claro translate-y-1/2"></div>
            <div className="text-white border-4 my-auto rounded-2xl bg-cian-oscuro 2xl:h-4/5 border-gris-claro">
              <form action="" className="items-center justify-center px-pad-1 pb-pad-1 pt-pad-2 font-Inter" onSubmit={handleSubmit}>
                <InputField icon={<Envelope />} type='email' placeholder='Email' value={mail} onChange={(emailEvent) => setEmail(emailEvent.target.value)} />
                <PasswordInput PasswordInput='Contraseña' value={password} onChange={(passwordEvent) => setPassword(passwordEvent.target.value)} placeholder='Contraseña' />
                <div className="flex justify-between items-center mt-marg-3">
                  <div className="flex gap-1 items-center">
                    <input type="checkbox" className="w-4 h-4 border-2 border-white rounded-full" onChange={(remembermeEvent) => setRecuerdame(remembermeEvent.target.checked)} />
                    <label htmlFor="Recuerdame" className="2xl:text-base underline">Recuerdame</label>
                  </div>
                  <Link to='' className="2xl:text-base text-white underline">Olvide mi contraseña</Link>
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
