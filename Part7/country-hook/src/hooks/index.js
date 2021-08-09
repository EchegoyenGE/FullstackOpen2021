import { useEffect, useState } from "react"
import axios from 'axios'

export const useCountry = (name) => {
    const [value, setValue] = useState('')

  useEffect(() => {
      if(!name) return
        axios
            .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
            .then(response => {
              setValue(response.data[0])
            })
    }, [name])

    return {
        value
    }
}

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}
  