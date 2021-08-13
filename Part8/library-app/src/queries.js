import { gql } from '@apollo/client'

export const BOOK_DETAILS = gql`
    fragment BookDetails on Book{
        title
        author{
            name
        }
        published
        genres
    }
`

export const ALL_AUTHORS = gql`
    query{
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query search($genre: String){
        allBooks( genre: $genre ){
            title
            author{
                name
            }
            published
            genres
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ){
            ${BOOK_DETAILS}
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editBornYear($name: String!, $born: Int!){
        editAuthor(name: $name, setBornTo: $born){
            name
            born
            bookCount
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            value
        }
    }
`

export const USER_INFO = gql`
    query userInfo{
        me{
            username
            favoriteGenre
        }
    }
`