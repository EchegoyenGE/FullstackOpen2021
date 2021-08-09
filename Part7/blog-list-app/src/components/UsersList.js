import React from 'react'
import { Link } from 'react-router-dom'

const UsersList = ({ users }) => {

    return (
        <div>
            <h3>Users</h3>
            <p>Blogs created</p>
            {
                (users)
                    ? users.map(user => {
                        return (
                            <Link key={user.username} to={`/users/${user.id}`}>
                                {user.username} {user.blogs.length}
                            </Link>
                        )
                    })
                    : null
            }
        </div>
    )
}

export default UsersList