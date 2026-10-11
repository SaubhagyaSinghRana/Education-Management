import { useEffect, useState } from "react";
import axios from "axios";

import { Subject } from "../../data/subjects";
import SubjectForm from "../../components/subject/SubjectForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface SubjectResponse {
  success: boolean;
  data: Subject;
}

interface SubjectsResponse {
  success: boolean;
  data: Subject[];
}

function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [editingSubject, setEditingSubject] =
    useState<Subject | null>(null);

  // =========================
  // GET SUBJECTS
  // =========================

  const getSubjects = async () => {
    try {
      const res = await axios.get<SubjectsResponse>(
        "http://localhost:5000/api/subject"
      );

      setSubjects(res.data.data);
    } catch (error) {
      console.error("Get subjects error:", error);
    }
  };

  // =========================
  // ADD SUBJECT
  // =========================

  const handleAddSubject = () => {
    setEditingSubject(null);
    setShowForm(true);
  };

  // =========================
  // EDIT SUBJECT
  // =========================

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setShowForm(true);
  };

  // =========================
  // CLOSE FORM
  // =========================

  const handleClose = () => {
    setShowForm(false);
    setEditingSubject(null);
  };

  // =========================
  // SAVE / UPDATE
  // =========================

  const handleSave = async (subjectData: Subject) => {
    try {
      // MongoDB _id API ko nahi bhejna
      const { _id, ...data } = subjectData;

      console.log("SUBJECT DATA:", data);

      // UPDATE
      if (editingSubject) {
        const res = await axios.patch<SubjectResponse>(
          `http://localhost:5000/api/subject/${editingSubject._id}`,
          data
        );console.log("UPDATE RESPONSE:", res.data);

        setSubjects((prev) =>
          prev.map((item) =>
            item._id === editingSubject._id
              ? res.data.data
              : item
          )
        );
      }

      // CREATE
      else {
        const res = await axios.post<SubjectResponse>(
          "http://localhost:5000/api/subject",
          data
        );

        setSubjects((prev) => [
          ...prev,
          res.data.data,
        ]);
      }

      setShowForm(false);
      setEditingSubject(null);

    } catch (error) {
        if (axios.isAxiosError(error)) {
    console.log("STATUS:", error.response?.status);
    console.log("BACKEND ERROR:", error.response?.data);
  } else {
    console.log(error);
      }
    }
  };

  // =========================
  // DELETE SUBJECT
  // =========================

  const handleDeleteSubject = async (
    subject: Subject
  ) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/subject/${subject._id}`
      );

      getSubjects();

    } catch (error) {
      console.error(
        "Delete subject error:",
        error
      );
    }
  };

  // =========================
  // LOAD SUBJECTS
  // =========================

  useEffect(() => {
    getSubjects();
  }, []);

  // =========================
  // TABLE COLUMNS
  // =========================

  const columns: ColumnDef<Subject>[] = [
    {
      accessorKey: "name",
      header: "Subjects Name",
    },

    {
      accessorKey: "code",
      header: "Code",
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
        const subject = row.original;

        return (
          <div className="flex gap-2">

            {/* EDIT */}

            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() =>
                handleEditSubject(subject)
              }
            >
              Edit
            </Button>

            {/* DELETE */}

            <Button
              variant="destructive"
              onClick={() =>
                handleDeleteSubject(subject)
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

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-center justify-between mb-4">

        <h1 className="text-2xl font-bold">
          Subjects
        </h1>

        <div className="flex gap-2">

          {/* ADD */}

          <Button
            onClick={handleAddSubject}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Subject
          </Button>

          {/* ALL LIST */}

          <Button
            onClick={getSubjects}
            className="bg-green-600 hover:bg-green-700"
          >
            All Subject List
          </Button>

        </div>

      </div>

      {/* =========================
          FORM DIALOG
      ========================= */}

      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);

          if (!open) {
            setEditingSubject(null);
          }
        }}
      >

        <DialogContent className="max-w-3xl">

          <DialogHeader>

            <DialogTitle>
              {editingSubject
                ? "Edit Subject"
                : "Add Subject"}
            </DialogTitle>

          </DialogHeader>

          <SubjectForm
            onSave={handleSave}
            editingSubject={editingSubject}
            onClose={handleClose}
          />

        </DialogContent>

      </Dialog>

      {/* =========================
          DATA TABLE
      ========================= */}

      <DataTable
        columns={columns}
        data={subjects}
        searchKey="name"
      />

    </div>
  );
}

export default Subjects;