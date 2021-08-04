import React, { useState } from 'react'

const LoginForm = ({ loginUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    const newCredentials = { username, password }
    loginUser(newCredentials)

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' >login</button>
    </form>
  )
}

export default LoginForm