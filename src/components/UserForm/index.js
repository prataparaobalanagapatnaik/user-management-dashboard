import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './index.css';

const UserForm = ({ selectedUser, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form className="user-form mt-4" onSubmit={handleSubmit}>
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control 
          type="text" 
          name="firstName" 
          placeholder="Enter First Name" 
          value={formData.firstName} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control 
          type="text" 
          name="lastName" 
          placeholder="Enter Last Name" 
          value={formData.lastName} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          name="email" 
          placeholder="Enter Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formDepartment">
        <Form.Label>Department</Form.Label>
        <Form.Control 
          type="text" 
          name="department" 
          placeholder="Enter Department" 
          value={formData.department} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <div className="d-flex justify-content-between mt-3">
        <Button variant="success" type="submit">
          Save
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
