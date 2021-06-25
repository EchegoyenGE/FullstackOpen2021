import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const url = `${baseURL}/${id}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}

const updateNumber = (id, newPerson) => {
    const request = axios.put(`${baseURL}/${id}`, newPerson)
    return request.then(response => response.data)
}

export default { getAll, create, deletePerson, updateNumber }