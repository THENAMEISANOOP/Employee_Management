const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    profileImage: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Sets default to current date/time
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Employee = mongoose.model('employees', employeeSchema);

module.exports = Employee;
