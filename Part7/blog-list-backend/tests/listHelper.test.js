const listHelper = require('../utils/list_helper')

describe('Dummy', () => {
    test('returns one', () => {
        const result = listHelper.dummy([])
        expect(result).toBe(1)
    })
})

describe('TotalLikes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 24,
            __v: 0
        }]
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(blogs[0].likes)
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
            }, {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
            }, {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            }, {
                _id: "5a422b891b54a676234d17fa",
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 10,
                __v: 0
            }, {
                _id: "5a422ba71b54a676234d17fb",
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0,
                __v: 0
            }, {
                _id: "5a422bc61b54a676234d17fc",
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
            }]
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('FavoriteBlog', () => {
    test('of empty array is null', () => {
        const blogs = []
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(null)
    })

    test('when list has only one blog', () => {
        const blogs = [{
            title: 'First blog',
            author: 'Sherlock Holmes',
            likes: 24
        }]
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[0])
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [{
            title: 'First blog',
            author: 'Sherlock Holmes',
            likes: 24
        }, {
            title: 'Secong blog',
            author: 'Frank Sinatra',
            likes: 15
        }, {
            title: 'Third blog',
            author: 'Freddy Mercury',
            likes: 2
        }, {
            title: 'Fourth blog',
            author: 'Neil Armstrong',
            likes: 50
        }, {
            title: 'Fifth blog',
            author: 'Edgar Allan Poe',
            likes: 4
        }]
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: 'Fourth blog',
            author: 'Neil Armstrong',
            likes: 50
        })
    })
})

describe('MostBlogs', () => {
    test('of empty matrix is null', () => {
        const blogs = []
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(null)
    })
    test('when matrix has only one blog', () => {
        const blogs = [{
            title: 'First blog',
            author: 'Sherlock Holmes',
            likes: 24
        }]
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: 'Sherlock Holmes',
            blogs: 1
        })
    })
    test('of a bigger list is calculated right', () => {
        const blogs = [[{
            title: 'First blog',
            author: 'Sherlock Holmes',
            likes: 24
        },
        {
            title: 'Secong blog',
            author: 'Sherlock Holmes',
            likes: 15
        }],
        [{
            title: 'Third blog',
            author: 'Freddy Mercury',
            likes: 2
        }, {
            title: 'Fourth blog',
            author: 'Freddy Mercury',
            likes: 50
        }, {
            title: 'Fifth blog',
            author: 'Freddy Mercury',
            likes: 4
        }]]
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: 'Freddy Mercury',
            blogs: 3
        })
    })
})

describe('MostLikes', () => {
    test('of empty matrix is null', () => {
        const blogs = []
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(null)
    })

    test('when matrix has only one blog', () => {
        const blogs = [{
            title: 'First blog',
            author: 'Sherlock Holmes',
            likes: 24
        }]
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({ author: 'Sherlock Holmes', likes: 24 })
    })

    test('of a bigger list of blogs is calculated right', () => {
        const blogs = [[{
            title: 'First blog',
            author: 'Sherlock Holmes',
            likes: 24
        },
        {
            title: 'Secong blog',
            author: 'Sherlock Holmes',
            likes: 47
        }],
        [{
            title: 'Third blog',
            author: 'Freddy Mercury',
            likes: 2
        }, {
            title: 'Fourth blog',
            author: 'Freddy Mercury',
            likes: 50
        }, {
            title: 'Fifth blog',
            author: 'Freddy Mercury',
            likes: 4
        }]]
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({ author: 'Sherlock Holmes', likes: 71 })
    })
})