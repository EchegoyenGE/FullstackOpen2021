import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL':
            return action.data
        case 'CREATE_BLOG': {
            return [...state, action.data]
        }
        case 'UPDATE_BLOG': {
            const id = action.data.id
            return state.map(b => {
                if (b.id === id) {
                    return action.data
                }
                return b
            })
        }
        case 'REMOVE': {
            const id = action.data.id
            return state.filter(b => b.id !== id)
        }
        case 'SORT_BLOGS':
            return action.data
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'GET_ALL',
            data: blogs
        })
    }
}

export const createBlog = newBlog => {
    return async dispatch => {
        const blog = await blogService.create(newBlog)
        dispatch({
            type: 'CREATE_BLOG',
            data: blog
        })
    }
}

export const updateBlog = newBlog => {
    return async dispatch => {
        const blog = await blogService.updateBlog(newBlog)
        dispatch({
            type: 'UPDATE_BLOG',
            data: blog
        })
    }
}

export const removeBlog = blogToRemove => {
    return async dispatch => {
        const removedBlog = await blogService.remove(blogToRemove)
        dispatch({
            type: 'REMOVE',
            data: removedBlog
        })
    }
}

export const sortBlogs = blogs => {
    return async dispatch => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        dispatch({
            type: 'SORT_BLOGS',
            data: sortedBlogs
        })
    }
}

export default blogReducer