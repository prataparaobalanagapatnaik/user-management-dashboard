import React, { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { fetchUsers, addUser, updateUser, deleteUser } from './services/UserService';
import { Puff } from 'react-loader-spinner'; // Change 'Spinner' to 'Puff'
import { Pagination } from 'react-bootstrap';

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [usersPerPage] = useState(5); // Number of users per page




  // Fetch users from API when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);




  // Handle saving a user (add or edit)
  const handleSaveUser = async (user) => {
    try {
      if (user.id) {
        const updatedUser = await updateUser(user.id, user);
        setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
      } else {
        const newUser = await addUser(user);
        setUsers([...users, newUser]);
      }
      setSelectedUser(null);
    } catch (err) {
      setError(err.message);
    }
  };




  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };



  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);



  // Change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);




  return (
    <div className="container mt-4">
      
      <div className="d-flex flex-row justify-content-center">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-circle m-3 mt-4" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
          </svg>
        </div>
          <h1 className="text-center mb-4 Main-heading mt-3">User Management Dashboard</h1>
      </div>
        
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {loading ? (
        <div className="d-flex justify-content-center">
          <Puff color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <>
          <UserList 
            users={currentUsers} 
            onEdit={setSelectedUser} 
            onDelete={handleDeleteUser} 
          />
          <UserForm 
            selectedUser={selectedUser} 
            onSave={handleSaveUser} 
            onCancel={() => setSelectedUser(null)} 
          />


          {/* Pagination Component */}
          
          <Pagination className="justify-content-center mt-3">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
              <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </div>
  );
};

export default App;
