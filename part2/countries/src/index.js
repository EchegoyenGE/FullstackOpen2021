import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CountryInfo from './components/CountryInfo'
import CountryItem from './components/CountryItem';
import SearchForm from './components/SearchForm'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  const handleSearchChange = (event) => { 
    setSearch(event.target.value)
  }

  const handleShow = country => {
    const handler = () => {
      setSearch(country.name.toLowerCase())
    }
    return handler
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(search))

  return (
    <div>
      <h1>Get some info about countries!</h1>
      <SearchForm search={search} handleChange={handleSearchChange} />
      <div>
        {
          (countriesToShow.length > 10)
            ? <h5>Too many countries, specify another filter</h5>
            : (countriesToShow.length === 1)
              ? <CountryInfo country={countriesToShow[0]}/>
              : <ul>{countriesToShow.map(country => <CountryItem key={country.name} country={country} handleShow={handleShow}/>)
                  }
                </ul>
        }
      </div>
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
