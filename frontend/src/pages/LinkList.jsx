import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../constants';
import { useAuth } from '../context/authContext';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

function LinkList() {
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteLinkId, setDeletedLinkId] = useState(null);

  const handleClose = () => {
    setShowModal(false);
  }

  const handleShow = (id) => {
    setShowModal(true);
    setDeletedLinkId(id)
  }

  const handleConfirm = async () => {
    if (!deleteLinkId) return;
    let res = await fetch(`${API_URL}/api/links/${deleteLinkId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.accessToken}`
      },
      method: 'PUT'
    })
    res = await res.json();
    if (res.status === 200) {
      const newLinks = links.filter(item => item._id !== deleteLinkId);
      setLinks(newLinks);
    }
    alert(res.message)
    handleClose();
  }

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`${API_URL}/api/links/me`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.accessToken}`
        },
        method: 'GET'
      })
      res = await res.json();
      setLinks(res.data)
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className='mt-4 text-center'>Link List</h1>
      <div className='my-2'>
        <Button variant="success" onClick={() => navigate("/create-link")}>Create new Link</Button>{' '}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Link</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {links.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.product_name}</td>
              <td>{item.link}</td>
              <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleShow(item._id)}>Delete</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmModal handleClose={handleClose} handleConfirm={handleConfirm} show={showModal} />
    </div>
  )
}

export default LinkList