import { z } from "zod";

const createEmployeeSchema = z.object({
  employeeId: z.string().trim().min(1, "Employee ID is required"),

  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),

  email: z.string().trim().email("Invalid email address"),

  department: z.string().trim().min(1, "Department is required"),
});

export { createEmployeeSchema };
