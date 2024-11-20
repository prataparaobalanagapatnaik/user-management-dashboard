import React from 'react';
import { Table, Button } from 'react-bootstrap';
import './index.css';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="user-list-container">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => onEdit(user)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => onDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
