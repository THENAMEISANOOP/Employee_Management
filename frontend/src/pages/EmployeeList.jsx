import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteEmployee, fetchEmployees } from '../services/api';
import SearchBar from '../components/SearchBar';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees(searchTerm);
      setEmployees(data);
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [searchTerm]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This employee will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteEmployee(id);
        toast.success('✅ Employee deleted');
        loadEmployees();
      } catch (error) {
        console.error(error);
        toast.error('❌ Failed to delete employee');
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employee Management</h2>
        <Link to="/add" className="btn btn-success">Add Employee</Link>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading employees...</p>
        </div>
      ) : (
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map(emp => (
                <tr key={emp._id}>
                  <td>
                    <img
                      src={emp.profileImage}
                      alt={emp.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </td>
                  <td>
                    <Link to={`/details/${emp._id}`}>{emp.name}</Link>
                  </td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.department}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => navigate(`/edit/${emp._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeList;
