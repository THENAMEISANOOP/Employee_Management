import axios from 'axios';

const API = 'http://localhost:5000';

const api = axios.create({
  baseURL: API,
});

// 🔄 Fetch all employees
export const fetchEmployees = async (searchTerm = '') => {
  const response = await api.get('/api/employees', {
    params: {
      search: searchTerm,
    },
  });
  return response.data.employee; // return the actual employee array
};

  
  // 🆕 Create employee (uses FormData and file upload)
  export const createEmployee = async (data) => {
    const response = await api.post('/api/employees', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };
  
  // 🔍 Get single employee
  export const getEmployeeById = async (id) => {
    const response = await api.get(`/api/employees/${id}`);
    return response.data.employee; // return only the employee object
  };
  
  
  // ✏️ Update employee (with optional image)
  export const updateEmployee = async (id, data) => {
    const response = await api.put(`/api/employees/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };
  
  // ❌ Delete employee
  export const deleteEmployee = async (id) => {
    const response = await api.delete(`/api/employees/${id}`);
    return response.data;
  };
  

export default api;
