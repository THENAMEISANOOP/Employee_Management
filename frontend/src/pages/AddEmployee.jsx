import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../services/api';
import { toast } from 'react-toastify';

function AddEmployee() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', salary: '', department: '', profileImage: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      for (let key in formData) {
        payload.append(key, formData[key]);
      }

      // Log form data
      for (let pair of payload.entries()) {
        console.log(pair[0], pair[1]);
      }

      await createEmployee(payload);

      toast.success('🎉 Employee created successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to create employee');
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {['name', 'email', 'phone', 'salary', 'department'].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.toUpperCase()}</label>
            <input
              type="text"
              name={field}
              className="form-control"
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="mb-3">
          <label className="form-label">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
