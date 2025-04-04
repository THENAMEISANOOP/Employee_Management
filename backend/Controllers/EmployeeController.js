const EmployeeModel = require('../Models/EmployeeModel');

const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        const profileImage = req.file ? req.file.path : null;
        console.log(body)

        // Assign profileImage to body before creating the EmployeeModel instance
        const emp = new EmployeeModel({ ...body, profileImage });

        await emp.save();

        return res.status(201).json({
            message: "Employee created",
            success: true,
            employee: emp, // Return the created employee for confirmation
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message, // Send only the error message
        });
    }
};

const getAllEmployees = async (req, res) => {
    try {
        let { page, limit, search } = req.query;
        
        // Convert query params to numbers, default values: page = 1, limit = 5
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;
        const skip = (page - 1) * limit;

        // Search criteria
        let searchCriteria = {};
        if (search) {
            searchCriteria = {
                name: { 
                    $regex: search, 
                    $options: 'i' // Case-insensitive search
                }
            };
        }

        // Get total employees matching criteria
        const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

        // Get employees with pagination, search, and sorting
        const emps = await EmployeeModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 });

        // Calculate total pages
        const totalPages = Math.ceil(totalEmployees / limit);

        return res.status(200).json({
            message: "All Employees",
            success: true,
            employees: emps,
            pagination: {
                totalEmployees,
                currentPage: page,
                totalPages,
                pageSize: limit
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};


const getEmployeeById = async (req, res) => {
    try {
        const {id}=req.params
        const emp = await EmployeeModel.findOne({_id:id});
        return res.status(200).json({
            message: "Get Employees Details",
            success: true,
            employees: emp, // Use 'employees' instead of 'employee' for clarity
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

const deleteEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await EmployeeModel.findOneAndDelete({ _id: id });

        if (!emp) {
            return res.status(404).json({
                message: "Employee not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Employee Deleted",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

const updateEmployeeById = async (req, res) => {
    try {
        const { name, phone, email, salary, department } = req.body;
        const { id } = req.params;

        // Check if request body is empty
        if (!Object.keys(req.body).length && !req.file) {
            return res.status(400).json({
                message: "No update data provided",
                success: false,
            });
        }

        let updateData = {
            name, phone, email, salary, department, updatedAt: new Date(),
        };

        if (req.file) {
            updateData.profileImage = req.file.path;
        }

        const updateEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // Ensures updated document is returned and validation is run
        );

        if (!updateEmployee) {
            return res.status(404).json({
                message: "Employee not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Employee updated",
            success: true,
            employee: updateEmployee,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};



module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployeeById,
    updateEmployeeById
};
