const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./Models/db');

const EmployeeRouter = require('./Routes/EmployeRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Employee management server is running");
});

app.use('/api/employees', EmployeeRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
