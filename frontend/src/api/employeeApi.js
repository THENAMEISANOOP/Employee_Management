import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getEmployees = (search = '', page = 1, limit = 5) =>
  axios.get(`${BASE_URL}/?search=${search}&page=${page}&limit=${limit}`);

export const getEmployeeById = (id) => axios.get(`${BASE_URL}/${id}`);

export const createEmployee = (data) =>
  axios.post(`${BASE_URL}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateEmployee = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`);