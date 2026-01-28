import TableExample from "@/components/EmployeesTable";
import Header from "@/components/Header";
import { getAllEmployeesSA } from "@/serverActions/employeeSA";

const Page = async () => {
  const data = await getAllEmployeesSA();

  return (
    <div className="w-full flex flex-col gap-2">
      <Header count={data?.count} title="Employees" />
      <TableExample data={data?.data ?? []} />
    </div>
  );
};

export default Page;
