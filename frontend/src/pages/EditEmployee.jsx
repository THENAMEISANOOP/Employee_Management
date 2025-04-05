import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../services/api';
import { toast } from 'react-toastify';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', salary: '', department: '', profileImage: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const emp = await getEmployeeById(id);
        setFormData({ ...emp, profileImage: null }); // Reset file input
      } catch (error) {
        toast.error('❌ Failed to load employee data');
      }
    }
    fetchData();
  }, [id]);

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
        if (formData[key]) {
          payload.append(key, formData[key]);
        }
      }

      await updateEmployee(id, payload);
      toast.success('✅ Employee updated successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to update employee');
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
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
        <button className="btn btn-primary">Update</button>
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

export default EditEmployee;
