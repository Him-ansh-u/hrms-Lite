import { EmployeePayload, EmployeeSchema } from "@/types/employeeTypes";
import { fetchData } from "./fetchData";
import { EMPLOYEE_API } from "@/constants/endpoints";

interface EmployeesResponse {
  sucess: boolean;
  count: number;
  data: EmployeeSchema[];
}

async function getAllEmployeesSA() {
  return fetchData<EmployeesResponse>(EMPLOYEE_API, {
    method: "GET",
  });
}

async function createEmployee(data: EmployeePayload) {
  try {
    const res = await fetchData(EMPLOYEE_API, {
      method: "POST",
      body: data,
    });

    return { success: true, data: res };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Something went wrong while creating employee");
  }
}

async function deleteEmployeeSA(employeeId: string) {
  try {
    await fetchData(`${EMPLOYEE_API}/${employeeId}`, {
      method: "DELETE",
    });

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, message };
  }
}

export { getAllEmployeesSA, createEmployee, deleteEmployeeSA };
