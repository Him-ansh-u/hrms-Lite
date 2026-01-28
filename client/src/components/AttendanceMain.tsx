"use client";
import { EmployeeSchema } from "@/types/employeeTypes";
import SearchDropdown from "./SearchDropdown";
import { useEffect, useState } from "react";
import { AttendanceSchema } from "@/types/attendanceTypes";
import { getEmployeeAttendanceSA } from "@/serverActions/attendanceSA";
import Table from "./Table";
import { toast } from "sonner";

type DropdownItem = {
  label: string;
  value: string;
};

const attendanceColumns = [
  {
    header: "EMP ID",
    render: (row: AttendanceSchema) => row.employee.employeeId,
  },
  {
    header: "Name",
    render: (row: AttendanceSchema) => row.employee.fullName,
  },
  {
    header: "Email",
    render: (row: AttendanceSchema) => row.employee.email,
  },
  {
    header: "Department",
    render: (row: AttendanceSchema) => row.employee.department,
  },
  {
    header: "Date",
    render: (row: AttendanceSchema) => row.date,
  },
  {
  header: "Status",
  render: (row: AttendanceSchema) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
        row.status === "Present"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {row.status}
    </span>
  ),
},
];

const AttendanceMain = ({
  employeeList,
}: {
  employeeList: EmployeeSchema[];
}) => {
  const [currentEmployee, setCurrentEmployee] = useState("");
  const [attendance, setAttendance] = useState<AttendanceSchema[]>([]);

  const mapEmployeesToDropdown = (
    employees: EmployeeSchema[],
  ): DropdownItem[] => {
    return employees.map((emp) => ({
      label: `${emp.fullName} (${emp.employeeId})`,
      value: emp.employeeId,
    }));
  };

  const dropdownItems = mapEmployeesToDropdown(employeeList);

  const fetchAttendance = async (employeeId: string) => {
    try {
      const res = await getEmployeeAttendanceSA(employeeId);
      setAttendance(res.data);
      toast.success("Attendance loaded successfully");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message);
    }
  };

  useEffect(() => {
    if (!currentEmployee) return;

    queueMicrotask(() => {
      fetchAttendance(currentEmployee);
    });
  }, [currentEmployee]);

  return (
    <div className="flex flex-col gap-5 justify-center w-full">
      <SearchDropdown
        items={dropdownItems}
        placeholder="Search and select an employee..."
        onSelect={(val) => setCurrentEmployee(val)}
      />
      {!!attendance.length && (
        <Table
          title="Attendance List"
          columns={attendanceColumns}
          data={attendance}
        />
        
      )}
    </div>
  );
};

export default AttendanceMain;
