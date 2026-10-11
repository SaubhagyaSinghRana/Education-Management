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

import { Enrollments } from "../../data/enrollments";

import EnrollmentForm, {
  EnrollmentFormData,
} from "@/components/enrollment/EnrollmentFrom";

interface EnrollmentResponse {
  success: boolean;
  data: Enrollments;
}

interface EnrollmentsResponse {
  success: boolean;
  data: Enrollments[];
}

function Enrollments() {
  const [enrollments, setEnrollments] = useState<Enrollments[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEnrollment, setEditingEnrollment] =
    useState<Enrollments | null>(null);

  // GET ENROLLMENTS

  const getEnrollments = async () => {
    try {
      const res = await axios.get<EnrollmentsResponse>(
        "http://localhost:5000/api/enrollment"
      );

      console.log("ENROLLMENTS:", res.data);

      setEnrollments(res.data.data);
    } catch (error) {
      console.error("Get enrollments error:", error);
    }
  };

  // ADD

  const handleAddEnrollment = () => {
    setEditingEnrollment(null);
    setShowForm(true);
  };

  // EDIT

  const handleEditEnrollment = (enrollment: Enrollments) => {
    setEditingEnrollment(enrollment);
    setShowForm(true);
  };

  // CLOSE

  const handleClose = () => {
    setShowForm(false);
    setEditingEnrollment(null);
  };

  // POST / PATCH

  const handleSave = async (enrollment: EnrollmentFormData) => {
    try {
      // UPDATE
      if (editingEnrollment) {
        await axios.patch<EnrollmentResponse>(
          `http://localhost:5000/api/enrollment/${editingEnrollment._id}`,
          enrollment
        );
      }

      // CREATE
      else {
        await axios.post<EnrollmentResponse>(
          "http://localhost:5000/api/enrollment",
          enrollment
        );
      }

      // Backend se fresh populated data lao
      await getEnrollments();

      setShowForm(false);
      setEditingEnrollment(null);
    } catch (error) {
      console.error("Save enrollment error:", error);
    }
  };

  // DELETE

  const handleDeleteEnrollment = async (
    enrollment: Enrollments
  ) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/enrollment/${enrollment._id}`
      );

      await getEnrollments();
    } catch (error) {
      console.error("Delete enrollment error:", error);
    }
  };

  // FIRST LOAD

  useEffect(() => {
    getEnrollments();
  }, []);

  // TABLE COLUMNS

  const columns: ColumnDef<Enrollments>[] = [
    {
      accessorKey: "enrollmentNumber",
      header: "Enrollment Number",
    },

    {
      accessorKey: "studentId",
      header: "Student Name",

      cell: ({ row }) => {
        return row.original.studentId?.name || "-";
      },
    },

    {
      accessorKey: "classId",
      header: "Class",

      cell: ({ row }) => {
        return row.original.classId?.name || "-";
      },
    },

    {
      accessorKey: "classId",
      header: "Section",

      cell: ({ row }) => {
        return row.original.classId?.section || "-";
      },
    },

    {
      accessorKey: "enrollmentDate",
      header: "Enrollment Date",

      cell: ({ row }) => {
        const date = row.original.enrollmentDate;

        return date
          ? new Date(date).toLocaleDateString()
          : "-";
      },
    },

    {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => {
        return row.original.status;
      },
    },

    {
      id: "actions",
      header: "Action",

      cell: ({ row }) => {
        const enrollment = row.original;

        return (
          <div className="flex gap-2">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() =>
                handleEditEnrollment(enrollment)
              }
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() =>
                handleDeleteEnrollment(enrollment)
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
          Enrollments
        </h1>

        <div className="flex gap-2">
          <Button
            onClick={handleAddEnrollment}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Enrollment
          </Button>

          <Button
            onClick={getEnrollments}
            className="bg-green-600 hover:bg-green-700"
          >
            All Enrollment List
          </Button>
        </div>
      </div>

      {/* FORM DIALOG */}

      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);

          if (!open) {
            setEditingEnrollment(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl">

          <DialogHeader>
            <DialogTitle>
              {editingEnrollment
                ? "Edit Enrollment"
                : "Add Enrollment"}
            </DialogTitle>
          </DialogHeader>

          <EnrollmentForm
            onSave={handleSave}
            editingEnrollment={editingEnrollment}
            onClose={handleClose}
          />

        </DialogContent>
      </Dialog>

      {/* TABLE */}

      <DataTable
        columns={columns}
        data={enrollments}
        searchKey="enrollmentNumber"
      />

    </div>
  );
}

export default Enrollments;