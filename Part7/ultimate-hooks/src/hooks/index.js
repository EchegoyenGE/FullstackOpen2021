import { useEffect, useState } from "react"
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios
            .get(baseUrl)
            .then(response => setResources(response.data))
    }, [baseUrl])
  
    const create = (resource) => {
        const response = axios.post(baseUrl, resource)
        return response.data
    }

    const getAll = () => {
        const request = axios.get(baseUrl)
        return request.then(response => setResources(response.data))
    }

    const update = (id, newObject) => {
        const request = axios.put(`${baseUrl}/${id}`, newObject)
        return request.then(response => response.data)
    }
  
    const service = {
        create,
        getAll,
        update
    }
  
    return [
      resources, service
    ]
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
  