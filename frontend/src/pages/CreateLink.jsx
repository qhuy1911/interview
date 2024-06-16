import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { API_URL } from '../constants';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  productName: '',
  link: '',
}

function CreateLink() {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [formValues, setFormValues] = useState(initialValues);

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleSaveLink = async () => {
    const { productName, link } = formValues;
    let res = await fetch(`${API_URL}/api/links`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.accessToken}`
      },
      body: JSON.stringify({
        product_name: productName,
        link
      }),
      method: 'POST'
    })
    res = await res.json();
    if (res.status === 201) {
      alert(res.message)
      navigate('/links')
      return;
    } else {
      alert(res.message)
    }
  }

  return (
    <div>
      <h1 className='text-center'>Create new Link</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicProductName">
          <Form.Label>Product name</Form.Label>
          <Form.Control type="text" placeholder="Enter product name" name={'productName'} onChange={handleOnChange} value={formValues.productName} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLink">
          <Form.Label>Link</Form.Label>
          <Form.Control type="text" placeholder="Enter link" name={'link'} onChange={handleOnChange} value={formValues.link} />
        </Form.Group>

        <Button variant="primary" onClick={handleSaveLink}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default CreateLink