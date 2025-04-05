import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEmployeeById } from '../services/api';
import { toast } from 'react-toastify';

function EmployeeDetails() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEmployeeById(id);
        setEmp(data);
      } catch (error) {
        console.error(error);
        toast.error('❌ Failed to load employee details');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading employee details...</p>
      </div>
    );
  }

  if (!emp) return <p className="text-danger">Employee not found</p>;

  return (
    <div>
      <h2>Employee Details</h2>
      <div className="card mt-4 p-3">
        <img
          src={emp.profileImage}
          alt={emp.name}
          style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '10px' }}
        />
        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item"><strong>Name:</strong> {emp.name}</li>
          <li className="list-group-item"><strong>Email:</strong> {emp.email}</li>
          <li className="list-group-item"><strong>Phone:</strong> {emp.phone}</li>
          <li className="list-group-item"><strong>Salary:</strong> {emp.salary}</li>
          <li className="list-group-item"><strong>Department:</strong> {emp.department}</li>
        </ul>
        <Link to="/" className="btn btn-secondary mt-3">Back</Link>
      </div>
    </div>
  );
}

export default EmployeeDetails;
