import AttendanceMain from "@/components/AttendanceMain";
import Header from "@/components/Header";
import { getAllEmployeesSA } from "@/serverActions/employeeSA";
const Page = async () => {
  const employeeData = await getAllEmployeesSA();
  return (
    <div className="w-full flex flex-col gap-2">
      <Header title="Attendance" />
      <div className="p-6 space-y-6">
        <AttendanceMain employeeList={employeeData?.data} />
      </div>
    </div>
  );
};
export default Page;
