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

import { Teacher } from "../../data/teachers";

import TeacherForm, {
  TeacherFormData,
} from "@/components/teacher/TeacherForm";

interface TeacherResponse {
  success: boolean;
  data: Teacher;
}

interface TeachersResponse {
  success: boolean;
  data: Teacher[];
}

function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] =
    useState<Teacher | null>(null);

  // GET TEACHERS
  const getTeachers = async () => {
    try {
      const res = await axios.get<TeachersResponse>(
        "http://localhost:5000/api/teachers"
      );

      setTeachers(res.data.data);
    } catch (error) {
      console.error("Get teachers error:", error);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  // ADD / UPDATE
  const handleSave = async (formData: TeacherFormData) => {
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        joiningDate: formData.joiningDate,
        status: formData.status,

        subjectIds: [formData.subjectId],
        classIds: [formData.classId],
      };

      if (editingTeacher) {
        // UPDATE
        await axios.patch<TeacherResponse>(
          `http://localhost:5000/api/teachers/${editingTeacher._id}`,
          data
        );
      } else {
        // CREATE
        await axios.post<TeacherResponse>(
          "http://localhost:5000/api/teachers",
          data
        );
      }

      await getTeachers();

      setShowForm(false);
      setEditingTeacher(null);

    } catch (error) {
      console.error("Save teacher error:", error);

      if (axios.isAxiosError(error)) {
        console.log(
          "Backend response:",
          error.response?.data
        );
      }
    }
  };

  // DELETE
  const handleDeleteTeacher = async (teacher: Teacher) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/teachers/${teacher._id}`
      );

      setTeachers((prev) =>
        prev.filter(
          (item) => item._id !== teacher._id
        )
      );

    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // EDIT
  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setShowForm(true);
  };

  // ADD
  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setShowForm(true);
  };

  // CLOSE
  
  const handleClose = () => {
    setShowForm(false);
    setEditingTeacher(null);
  };

  // TABLE
  const columns: ColumnDef<Teacher>[] = [
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
      accessorKey: "subjectIds",
      header: "Subject",
      cell: ({ row }) => {
        return (
          row.original.subjectIds
            ?.map((subject) => subject.name)
            .join(", ") || "-"
        );
      },
    },

    {
      accessorKey: "classIds",
      header: "Class",
      cell: ({ row }) => {
        return (
          row.original.classIds
            ?.map(
              (item) =>
                `${item.name} - ${item.section}`
            )
            .join(", ") || "-"
        );
      },
    },

    {
      accessorKey: "joiningDate",
      header: "Joining Date",
      cell: ({ row }) => {
        return row.original.joiningDate
          ? new Date(
            row.original.joiningDate
          ).toLocaleDateString("en-IN")
          : "-";
      },
    },

    {
      accessorKey: "status",
      header: "Status",
    },

    {
      id: "actions",
      header: "Action",

      cell: ({ row }) => {
        const teacher = row.original;

        return (
          <div className="flex gap-2">

            <Button
              onClick={() =>
                handleEditTeacher(teacher)
              }
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() =>
                handleDeleteTeacher(teacher)
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
    <div className="w-full p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl font-bold">
          Teachers
        </h1>

        <div className="flex gap-2">

          <Button
            onClick={handleAddTeacher}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Teacher
          </Button>

          <Button
            onClick={getTeachers}
            className="bg-green-600 hover:bg-green-700"
          >
            All Teacher List
          </Button>

        </div>
      </div>

      {/* FORM */}
      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);

          if (!open) {
            setEditingTeacher(null);
          }
        }}
      >
        <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">

          <DialogHeader>
            <DialogTitle>
              {editingTeacher
                ? "Edit Teacher"
                : "Add Teacher"}
            </DialogTitle>
          </DialogHeader>

          <TeacherForm
            onSave={handleSave}
            editingTeacher={editingTeacher}
            onClose={handleClose}
          />

        </DialogContent>
      </Dialog>

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={teachers}
        searchKey="name"
      />

    </div>
  );
}

export default Teachers;