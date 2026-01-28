import { Attendance } from "../models/Attendance.mo.js";
import { Employee } from "../models/Employee.mo.js";


const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const attendance = await Attendance.create({
      employee: employee._id,
      date,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Mark attendance error:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to mark attendance: ${error.message}`,
    });
  }
};

const getAttendanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const records = await Attendance.find({ employee: employee._id })
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error("Fetch attendance error:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to fetch attendance: ${error.message}`,
    });
  }
};

export { markAttendance, getAttendanceByEmployee };
