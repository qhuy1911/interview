import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/authContext';
import { Navigate, Link } from 'react-router-dom';
import { API_URL } from '../constants';

const initialValues = {
  email: '',
  password: '',
}

function Login() {
  const { isAuthenticated, login } = useAuth();
  const [formValues, setFormValues] = useState(initialValues)

  
  const handleLogin = async () => {
    let res = await fetch(`${API_URL}/api/auth/signin`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
      method: 'POST'
    })
    res = await res.json();
    if (res && res.accessToken) {
      localStorage.setItem('user', JSON.stringify(res))
      login(res);
    } else {
      alert(res.message)
    }
  }

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }

  return (
    <div className='container'>
      <h1>Login Form</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name={'email'} onChange={handleOnChange} value={formValues.email} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' onChange={handleOnChange} value={formValues.password} />
        </Form.Group>

        <div>
          Don't have an account yet?  <Link to={"/signup"}>Sign Up</Link>
        </div>

        <Button variant="primary" onClick={handleLogin}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Login