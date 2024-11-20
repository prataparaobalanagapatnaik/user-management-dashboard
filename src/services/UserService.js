import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Fetch all users from the API.
 * @returns {Array} List of user objects.
 */

export const fetchUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};


/**
 * Add a new user to the API.
 * @param {Object} user - User details to add.
 * @returns {Object} Newly added user.
 */

export const addUser = async (user) => {
  try {
    const response = await axios.post(BASE_URL, user);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add user');
  }
};


/**
 * Update user details on the API.
 * @param {number} id - User ID to update.
 * @param {Object} updatedUser - Updated user details.
 * @returns {Object} Updated user object.
 */


export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};



/**
 * Delete a user from the API.
 * @param {number} id - User ID to delete.
 * @returns {Object} Deleted user object.
 */


export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};
