import express from "express";
import { markAttendanceSchema } from "../validator/Attendance.va.js";
import { getAttendanceByEmployee, markAttendance } from "../controllers/attendance.ct.js";
import validate from "../middlewares/validator.mw.js";

const router = express.Router();

router.post("/", validate(markAttendanceSchema), markAttendance);
router.get("/:employeeId", getAttendanceByEmployee);

export default router;
