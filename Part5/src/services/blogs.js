import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async newBlog => {
  const data = {
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    likes: newBlog.likes
  }

  const updatedBlog = await axios.put(`${baseUrl}/${newBlog.id}`, data)
  return updatedBlog.data
}

const remove = async blogToRemove => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  console.log(token)

  await axios.delete(`${baseUrl}/${blogToRemove.id}`, config)
  return blogToRemove
}

export default { getAll, setToken, create, updateBlog, remove }