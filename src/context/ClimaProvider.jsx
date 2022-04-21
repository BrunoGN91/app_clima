import {useState, createContext} from 'react'
import axios from 'axios'
const ClimaContext = createContext()

const ClimaProvider = ({children}) => {
    

    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: ''
    })

    const [resultado, setResultado] = useState({})
    const [cargando, setCargando] = useState(false);
    const [noResultado, setNoResultado] = useState(false)

    const handleBusqueda = (e) => {
        setBusqueda({
            ...busqueda, 
            [e.target.name]: e.target.value
        })
    }

    const consultarClima = async (busqueda) => {
        setCargando(true);
        setNoResultado(false)
        try {
            
            const {ciudad, pais} = busqueda
            const appId = import.meta.env.VITE_API_KEY;
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`
            const { data }= await axios(url)
            const { lon, lat } = data[0]

            const urlClimaVerdad = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const { data: dataClima } = await axios(urlClimaVerdad);

            setResultado(dataClima)
            
        } catch (error) {
            setNoResultado('No hay Resultados')
        } finally {
            setCargando(false)
        }
    }

    return (
        <ClimaContext.Provider
        value={{
            busqueda,
            handleBusqueda,
            consultarClima,
            resultado,
            cargando,
            noResultado

        }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}

export default ClimaContext