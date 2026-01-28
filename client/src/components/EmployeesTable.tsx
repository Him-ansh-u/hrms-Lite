"use client";

import { deleteEmployeeSA } from "@/serverActions/employeeSA";
import Table from "./Table";
import { EmployeeSchema } from "@/types/employeeTypes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TableExample({ data }: { data: EmployeeSchema[] }) {
  const router = useRouter();
  const employeeColumns = [
    {
      header: "EMP ID",
      accessor: "employeeId",
    },
    {
      header: "Name",
      accessor: "fullName",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Department",
      accessor: "department",
    },
  ];

  const deleteEmployee = async (row: EmployeeSchema) => {
    try {
      await deleteEmployeeSA(row.employeeId);

      toast.success("Employee deleted successfully");

      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete employee";

      toast.error(message);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Table
        title="Employee List"
        columns={employeeColumns}
        data={data}
        onDelete={deleteEmployee}
      />
    </div>
  );
}
