import { fetchData } from "./fetchData";
import { ATTENDANCE_API } from "@/constants/endpoints";
import { AttendancePayload, AttendanceSchema } from "@/types/attendanceTypes";

interface AttendanceResponse {
  success: boolean;
  count?: number;
  data: AttendanceSchema[];
}

async function getEmployeeAttendanceSA(empId: string) {
  try {
    return await fetchData<AttendanceResponse>(
      `${ATTENDANCE_API}${empId}`,
      {
        method: "GET",
      }
    );
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Failed to fetch attendance");
  }
}

async function createAttendanceSA(data: AttendancePayload) {
  try {
    const res = await fetchData(ATTENDANCE_API, {
      method: "POST",
      body: data,
    });

    return res
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Something went wrong while creating attendance");
  }
}

export { getEmployeeAttendanceSA, createAttendanceSA };
