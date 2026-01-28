import React, { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { createAttendanceSA } from "@/serverActions/attendanceSA";
import { toast } from "sonner";
import { AttendancePayload } from "@/types/attendanceTypes";
import { useRouter } from "next/navigation";

const AttendanceForm = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AttendancePayload>({
    employeeId: "",
    date: "",
    status: "Present",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.employeeId || !formData.date) {
      toast.error("Employee ID and Date are required");
      return;
    }

    try {
      setLoading(true);

      await createAttendanceSA(formData);

      toast.success("Attendance marked successfully");
      router.refresh();
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white ">
      <InputField
        label="Employee ID"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
        placeholder="EMP101"
      />

      <InputField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
      />

      {/* Status Dropdown */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-fit absolute bottom-4 right-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Attendance
      </Button>
    </form>
  );
};

export default AttendanceForm;
