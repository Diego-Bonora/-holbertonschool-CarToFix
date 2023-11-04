import React, { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';

export default function Search({ onSearch }) {
    const [Query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault(); {/*evita la recarga de la pagina cuando se utiliza el buscador */}
        onSearch(Query);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value || '');
    }
  return (
    <form className='w-1/2 relative'>
      <div className="relative">
        <input
          type="search"
          placeholder='Buscar matricula'
          value={Query}
          onChange={handleChange}
          className='w-full p-2 rounded-2xl bg-gris-footer'
        />
        <button onClick={handleSearch} className='absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-gris-footer rounded-full'>
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
}
