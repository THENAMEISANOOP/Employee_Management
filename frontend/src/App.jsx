import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeDetails from './pages/EmployeeDetails';
import EmployeeList from './pages/EmployeeList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
          <Route path="/details/:id" element={<EmployeeDetails />} />
        </Routes>

        {/* 🧪 Toast notifications will appear here */}
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;
