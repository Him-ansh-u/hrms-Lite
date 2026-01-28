import { Employee } from "../models/Employee.mo.js";

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error("Create employee error:", error);
    res.status(500).json({
      success: false,
      message: `Failed to fetch employees: ${error.message}`,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      department,
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Create employee error:", error);

    return res.status(500).json({
      success: false,
      message: `Failed to fetch employees: ${error.message}`,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findOneAndDelete({ employeeId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to fetch employees: ${error.message}`,
    });
  }
};

export { getAllEmployees, createEmployee, deleteEmployee };
