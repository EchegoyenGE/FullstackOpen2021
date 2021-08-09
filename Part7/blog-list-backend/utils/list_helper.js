const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return null
    }
    let bestBlog
    let max = 0
    blogs.forEach(element => {
        if (element.likes > max) {
            bestBlog = element
            max = element.likes
        }
    })
    return bestBlog
}

const flatArray = arr => {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatArray(val)) : acc.concat(val), [])
}

const mostBlogs = blogs => {

    if (blogs.length === 0) {
        return null
    }

    const flattenBlogs = flatArray(blogs)
    let result = {}
    flattenBlogs.map(blog => {
        if (result[blog.author] === undefined) {
            result[blog.author] = 1
        } else {
            result[blog.author] += 1
        }
    })

    let max = 0
    let keyMax = ''
    for (const element in result) {
        if (result[element] > max) {
            max = result[element]
            keyMax = element
        }
    }
    return { author: keyMax, blogs: result[keyMax] }
}

const mostLikes = blogs => {
    if (blogs.length === 0) {
        return null
    }
    let result = {}
    const flattenBlogs = flatArray(blogs)
    flattenBlogs.map(blog => {
        if (result[blog.author] === undefined) {
            result[blog.author] = blog.likes
        } else {
            result[blog.author] += blog.likes
        }
    })

    let max = 0
    let keyMax = ''
    for (const element in result) {
        if (result[element] > max) {
            max = result[element]
            keyMax = element
        }
    }
    return { author: keyMax, likes: result[keyMax] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }