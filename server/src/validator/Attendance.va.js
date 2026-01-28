import { z } from "zod";

const markAttendanceSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["Present", "Absent"], {
    errorMap: () => ({ message: "Status must be Present or Absent" }),
  }),
});

export { markAttendanceSchema };
