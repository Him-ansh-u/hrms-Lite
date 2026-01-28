export interface EmployeeSchema {
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeePayload {
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
}
