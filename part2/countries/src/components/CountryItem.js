import React from 'react'

const CountryItem = ({country, handleShow}) => {
    return (
        <li key={country.name}>{country.name}<button onClick={handleShow(country)}>Show</button></li>
    )
}

export default CountryItem