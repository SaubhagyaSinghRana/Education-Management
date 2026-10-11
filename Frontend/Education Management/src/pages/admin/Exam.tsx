import { useEffect, useState } from "react";
import axios from "axios";

import { Exam } from "../../data/exam";
import ExamForm, {
  ExamFormData,
} from "../../components/exam/ExamForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface ExamResponse {
  success: boolean;
  data: Exam;
}

interface ExamsResponse {
  success: boolean;
  data: Exam[];
}

function Exams() {
  const [exams, setExams] = useState<Exam[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [editingExam, setEditingExam] =
    useState<Exam | null>(null);

  // GET EXAMS

  const getExams = async () => {
    try {
      const res = await axios.get<ExamsResponse>(
        "http://localhost:5000/api/exam"
      );

      setExams(res.data.data);
    } catch (error) {
      console.error("Get exams error:", error);
    }
  };

  // =========================
  // ADD EXAM
  // =========================

  const handleAddExam = () => {
    setEditingExam(null);
    setShowForm(true);
  };

  // EDIT EXAM

  const handleEditExam = (exam: Exam) => {
    setEditingExam(exam);
    setShowForm(true);
  };

  // CLOSE

  const handleClose = () => {
    setShowForm(false);
    setEditingExam(null);
  };

  // SAVE / UPDATE

  const handleSave = async (
    examData: ExamFormData
  ) => {
    try {
      console.log("EXAM DATA:", examData);

      if (editingExam) {
        // UPDATE

        const res = await axios.patch<ExamResponse>(
          `http://localhost:5000/api/exam/${editingExam._id}`,
          examData
        );

        setExams((prev) =>
          prev.map((item) =>
            item._id === editingExam._id
              ? res.data.data
              : item
          )
        );
      } else {
        // CREATE

        const res = await axios.post<ExamResponse>(
          "http://localhost:5000/api/exam",
          examData
        );

        setExams((prev) => [
          ...prev,
          res.data.data,
        ]);
      }

      setShowForm(false);
      setEditingExam(null);

    } catch (error: any) {
      console.error(
        "Save exam error:",
        error
      );

      console.error(
        "Backend error:",
        error.response?.data
      );
    }
  };

  // DELETE

  const handleDeleteExam = async (
    exam: Exam
  ) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/exam/${exam._id}`
      );

      getExams();

    } catch (error: any) {
      console.error(
        "Delete exam error:",
        error.response?.data || error
      );
    }
  };

  // LOAD DATA

  useEffect(() => {
    getExams();
  }, []);

  // TABLE COLUMNS

  const columns: ColumnDef<Exam>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },

    {
      accessorKey: "examType",
      header: "Exam Type",
    },

    {
      accessorKey: "classId",
      header: "Class",

      cell: ({ row }) => {
        return row.original.classId?.name || "-";
      },
    },

    {
      accessorKey: "subjectId",
      header: "Subject",

      cell: ({ row }) => {
        return row.original.subjectId?.name || "-";
      },
    },

    {
      accessorKey: "examDate",
      header: "Exam Date",

      cell: ({ row }) => {
        return row.original.examDate
          ? new Date(
              row.original.examDate
            ).toLocaleDateString()
          : "-";
      },
    },

    {
      accessorKey: "startTime",
      header: "Start Time",
    },

    {
      accessorKey: "endTime",
      header: "End Time",
    },

    {
      accessorKey: "totalMarks",
      header: "Total Marks",
    },

    {
      accessorKey: "passingMarks",
      header: "Passing Marks",
    },

    {
      accessorKey: "roomNumber",
      header: "Room No.",

      cell: ({ row }) => {
        return (
          row.original.roomNumber || "-"
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => {
        return row.original.status;
      },
    },

    // ACTIONS

    {
      id: "actions",
      header: "Action",

      cell: ({ row }) => {
        const exam = row.original;

        return (
          <div className="flex gap-2">

            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() =>
                handleEditExam(exam)
              }
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() =>
                handleDeleteExam(exam)
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


      <div className="mb-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          Exams
        </h1>

        <div className="flex gap-2">

          <Button
            onClick={handleAddExam}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Exam
          </Button>

          <Button
            onClick={getExams}
            className="bg-green-600 hover:bg-green-700"
          >
            All Exam List
          </Button>

        </div>

      </div>

          {/* FORM DIALOG */}

      <Dialog
        open={showForm}
        onOpenChange={(open) => {

          setShowForm(open);

          if (!open) {
            setEditingExam(null);
          }

        }}
      >

        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">

          <DialogHeader>

            <DialogTitle>
              {editingExam
                ? "Edit Exam"
                : "Add Exam"}
            </DialogTitle>

          </DialogHeader>

          <ExamForm
            onSave={handleSave}
            editingExam={editingExam}
            onClose={handleClose}
          />

        </DialogContent>

      </Dialog>

      {/* =========================
          DATA TABLE
      ========================= */}

      <DataTable
        columns={columns}
        data={exams}
        searchKey="title"
      />

    </div>
  );
}

export default Exams;