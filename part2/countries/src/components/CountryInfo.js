import React, {useEffect, useState} from 'react'
import axios from 'axios'

const CountryInfo = ({ country }) => {

  const [weather, setWeather] = useState('undefined')

  useEffect(() => {
    const baseURL = 'http://api.weatherstack.com/'
    const capital = country.capital

    axios
      .get(`${baseURL}current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      {
        (typeof weather.current === 'undefined')
          ? <p>Loading...</p>
          : <div>
                <h1>{country.name}</h1>
                <h5>Capital: {country.capital}</h5>
                <h5>Population: {country.population}</h5>
                <h3>Languages</h3>
                <ul>
                  {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
                </ul>
                <img width='230px' height='150px' src={country.flag} alt={country.name} />
                <div>
                  <h3>{`Weather in ${country.capital}`}</h3>
                  <div>
                      <p>Temperature: {weather.current.temperature} Celsius</p>
                      <p><img src={weather.current.weather_icons[0]} alt={`Weather icon for ${country.capital}`} /></p>
                      <p>Wind: {weather.current.wind_speed} mph {weather.current.wind_dir}</p>
                    </div>
                </div>
          </div>
      }
    </div>
    )
}

export default CountryInfo
