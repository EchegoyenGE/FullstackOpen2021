import axios from 'axios'
const baseUrl = '/api/comments'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createComment = async (blogId, content) => {
    const newComment = { content, blog: blogId }

    const response = await axios.post(`${baseUrl}/${blogId}`, newComment)
    return response.data
}

export default { getAll, createComment }
