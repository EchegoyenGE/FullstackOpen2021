const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'ALPHABETAGAMMA'

const MONGODB_URI = 'mongodb+srv://user:j0Zc0PXUc2SzjkB0@cluster0.wu347.mongodb.net/library-database?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`

    type Author{
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token{
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        addAuthor(
            name: String!
            born: Int
        ): Author
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String! 
        ): Token
    }

    type Subscription{
        bookAdded: Book!
    }
`

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            let returnedBooks = Book.find({}).populate('author')

            if (args.genre) {
                returnedBooks = Book.find({ genres: args.genre }).populate('author')
            }

            return returnedBooks
        },
        allAuthors: () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async (root) => {
            const books = (await Book.find({ author: root._id })).length
            if (!books) return 0
            return books
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const author = await Author.findOne({ name: args.author })
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            if (author === null) {
                const newAuthor = new Author({ name: args.author, born: null })
                try {
                    await newAuthor.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }
                const book = new Book({ ...args, author: newAuthor })
                try {
                    await book.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }

                pubsub.publish('BOOK_ADDED', { bookAdded: book })

                return book
            }

            const book = new Book({ ...args, author })
            return book.save()
        },
        addAuthor: async (root, args, context) => {
            const author = new Author({ ...args })

            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            return author.save()
        },
        editAuthor: async (root, args) => {
            const authorToEdit = await Author.findOne({ name: args.name })
            if (!authorToEdit) {
                return null
            }
            authorToEdit.born = args.setBornTo
            return authorToEdit.save()
        },
        createUser: (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre
            })
            return user
                .save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secred') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionUrl}`)
})