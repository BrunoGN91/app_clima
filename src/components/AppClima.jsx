import React from 'react'
import Formulario from './Formulario'
import Resultado from './Resultado'
import useClima from '../hooks/useClima'
import Spinner from './Spinner'


const AppClima = () => {

    const {resultado, cargando, noResultado} = useClima()


  return (
   <>
   <main className='dos-columnnas'>
    <Formulario/>
    {cargando  ? <Spinner/> : 
    resultado?.name ? <Resultado/> :
    noResultado ? <p>{noResultado}</p> :
    null
    }
   </main>
   </>
  )
}

export default AppClima