import { Router } from "express";
import { createEmployee, deleteEmployee, getAllEmployees } from "../controllers/employee.ct.js";
import { createEmployeeSchema } from "../validator/Employee.va.js";
import validate from "../middlewares/validator.mw.js";

const router = Router();

router.get("/", getAllEmployees);

router.post("/", validate(createEmployeeSchema), createEmployee);

router.delete("/:employeeId", deleteEmployee);

export default router;
