import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { API_URL } from '../constants';

const initialValues = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
}

function Signup() {
  const { isAuthenticated } = useAuth();
  const [formValues, setFormValues] = useState(initialValues);

  const handleSignup = async () => {
    const {email, name, password, confirmPassword} = formValues
    if (password !== confirmPassword) {
      alert('The two passwords must match')
      return
    }
    let res = await fetch(`${API_URL}/api/auth/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name, 
        password,
      }),
      method: 'POST'
    })
    res = await res.json();
    if (res.status === 201) {
      setFormValues(initialValues)
    }
    alert(res.message);
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
    <div>
      <h1>Signup Form</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name={'name'} onChange={handleOnChange} value={formValues.name} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name={'email'} onChange={handleOnChange} value={formValues.email} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' onChange={handleOnChange} value={formValues.password} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" name='confirmPassword' onChange={handleOnChange} value={formValues.confirmPassword} />
        </Form.Group>

        <div>
          You have an account?  <Link to={"/login"}>Login</Link>
        </div>

        <Button variant="primary" onClick={handleSignup}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Signup