import { EmployeeSchema } from "./employeeTypes";

export interface AttendancePayload {
  employeeId: string;
  date: string;
  status: "Present" | "Absent";
}

export type AttendanceStatus = "Present" | "Absent";

export interface AttendanceSchema {
  _id: string;
  date: string;
  status: AttendanceStatus;
  createdAt: string;
  updatedAt: string;
  employee: EmployeeSchema;
}
