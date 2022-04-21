import React from 'react'
import useClima from '../hooks/useClima'
import { useState } from 'react'

const Formulario = () => {

    const { busqueda, handleBusqueda, consultarClima } = useClima()
    const { ciudad, pais } = busqueda;

    const [alerta, setAlerta] = useState('')
    const handleSubmit = e => {
        e.preventDefault()

        if(Object.values(busqueda).includes('')) {
            setAlerta("Todos los campos son Obligatorios");
            return
        }

        consultarClima(busqueda)
    }

  return (
    <div className='contenedor'>
        {alerta && <p>{alerta}</p>}
        <form
        onSubmit={handleSubmit}
        >
            <div className='campo'>
                <label 
                htmlFor="ciudad">Ciudad</label>
                <input
                name="ciudad" 
                type="text"
                id="ciudad"
                onChange={handleBusqueda}
                value={ciudad}
                />
            </div>
            <div className='campo'>
                <label htmlFor="pais">Pais</label>
                <select 
                name="pais" 
                id="pais"
                onChange={handleBusqueda}
                value={pais}
                >
                    <option value="">Seleccione un País</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>


                </select>
            </div>

            <input type="submit" value="Consultar Clima" />
        </form>

    </div>
  )
}

export default Formulario