import { useEffect, useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

import { Student } from "../../data/students";

import StudentForm, {
  StudentFormData,
} from "@/components/student/StudentForm";

interface StudentResponse {
  success: boolean;
  data: Student;
}

interface StudentsResponse {
  success: boolean;
  data: Student[];
}

function Students() {
  const [students, setStudents] = useState<Student[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [editingStudent, setEditingStudent] =
    useState<Student | null>(null);

  // GET STUDENTS

  const getStudents = async () => {
    try {
      const res = await axios.get<StudentsResponse>(
        "http://localhost:5000/api/student"
      );

      console.log("GET STUDENTS:", res.data);

      setStudents(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("GET ERROR:", error.response?.data);
        console.log("GET STATUS:", error.response?.status);
      } else {
        console.error(error);
      }
    }
  };

  // ADD

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
  };


  // EDIT

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  // =========================
  // CLOSE
  // =========================  

  const handleClose = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  // =========================
  // POST / PATCH
  // =========================

  const handleSave = async (
    student: StudentFormData
  ) => {
    try {
      // UPDATE
      if (editingStudent) {
        console.log(
          "UPDATE ID:",
          editingStudent._id
        );

        const res =
          await axios.patch<StudentResponse>(
            `http://localhost:5000/api/student/${editingStudent._id}`,
            student
          );

        console.log("UPDATE RESPONSE:", res.data);

        // GET again so populated classId is also correct
        await getStudents();

        setShowForm(false);
        setEditingStudent(null);

        return;
      }

      // CREATE
      console.log("CREATE DATA:", student);

      const res =
        await axios.post<StudentResponse>(
          "http://localhost:5000/api/student",
          student
        );

      console.log("CREATE RESPONSE:", res.data);

      // GET again after create
      await getStudents();

      setShowForm(false);
      setEditingStudent(null);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          "SAVE ERROR STATUS:",
          error.response?.status
        );

        console.log(
          "SAVE ERROR DATA:",
          error.response?.data
        );
      } else {
        console.error("Save student error:", error);
      }
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDeleteStudent = async (
    student: Student
  ) => {
    try {
      console.log(
        "DELETE ID:",
        student._id
      );

      const res = await axios.delete(
        `http://localhost:5000/api/student/${student._id}`
      );

      console.log(
        "DELETE RESPONSE:",
        res.data
      );

      await getStudents();

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          "DELETE ERROR STATUS:",
          error.response?.status
        );

        console.log(
          "DELETE ERROR DATA:",
          error.response?.data
        );
      } else {
        console.error(
          "Delete student error:",
          error
        );
      }
    }
  };

  // =========================
  // FIRST LOAD
  // =========================

  useEffect(() => {
    getStudents();
  }, []);

  // =========================
  // TABLE
  // =========================

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "email",
      header: "Email",
    },

    {
      accessorKey: "phone",
      header: "Phone",
    },

    {
      accessorKey: "fatherName",
      header: "Father Name",
    },

    {
      accessorKey: "motherName",
      header: "Mother Name",
    },

    {
      accessorKey: "rollNo",
      header: "Roll No",
    },

    {
      accessorKey: "classId",
      header: "Class",

      cell: ({ row }) => {
        return (
          row.original.classId?.name || "-"
        );
      },
    },

    {
      accessorKey: "address",
      header: "Address",
    },

    {
      accessorKey: "status",
      header: "Status",
    },

    {
      id: "actions",
      header: "Action",

      cell: ({ row }) => {
        const student = row.original;

        return (
          <div className="flex gap-2">

            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() =>
                handleEditStudent(student)
              }
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() =>
                handleDeleteStudent(student)
              }
            >
              Delete
            </Button>

          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-4">

        <h1 className="text-2xl font-bold">
          Students
        </h1>

        <div className="flex gap-2">

          <Button
            onClick={handleAddStudent}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Student
          </Button>

          <Button
            onClick={getStudents}
            className="bg-green-600 hover:bg-green-700"
          >
            All Student List
          </Button>

        </div>

      </div>

      {/* FORM */}

      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);

          if (!open) {
            setEditingStudent(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl">

          <DialogHeader>
            <DialogTitle>
              {editingStudent
                ? "Edit Student"
                : "Add Student"}
            </DialogTitle>
          </DialogHeader>

          <StudentForm
            onSave={handleSave}
            editingStudent={editingStudent}
            onClose={handleClose}
          />

        </DialogContent>
      </Dialog>

      {/* TABLE */}

      <DataTable
        columns={columns}
        data={students}
        searchKey="name"
      />

    </div>
  );
}

export default Students;