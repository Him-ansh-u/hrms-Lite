"use client";

import { useState } from "react";
import Button from "../Button";
import { createEmployee } from "@/serverActions/employeeSA";
import InputField from "../InputField";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormData = {
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
};

const initialData = {
  employeeId: "",
  fullName: "",
  email: "",
  department: "",
};

const AddEmployeeForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const toastId = toast.loading("Creating employee...");

    try {
      await createEmployee(formData);

      toast.success("Employee created successfully", { id: toastId });

      setFormData(initialData);
      onClose();

      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      console.error("Create employee failed:", message);

      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md bg-white rounded-xl space-y-4"
    >
      <InputField
        label="Employee ID"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
        placeholder="EMP101"
      />

      <InputField
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="John Doe"
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john@example.com"
      />

      <InputField
        label="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Admin"
      />

      <div className="pt-2 absolute bottom-4 right-4">
        <Button type="submit" loading={loading}>
          Save Employee
        </Button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
