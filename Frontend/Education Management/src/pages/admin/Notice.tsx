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

import NoticeForm, {
  NoticeFormData,
} from "@/components/notice/NoticeForm";

export interface Notice {
  _id: string;
  title: string;
  message: string;
  audience: string;
  createdBy: string;
  createdAt: string;
}

interface NoticeResponse {
  success: boolean;
  data: Notice[];
}

function Notice() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] =
    useState<Notice | null>(null);

  // GET NOTICES

  const getNotices = async () => {
    try {
      const res = await axios.get<NoticeResponse>(
        "http://localhost:5000/api/notice"
      );

      console.log("NOTICE RESPONSE:", res.data.data);

      setNotices(res.data.data);
    } catch (error) {
      console.error("Get notices error:", error);
    }
  };

  useEffect(() => {
    getNotices();
  }, []);

  // ADD

  const handleAddNotice = () => {
    setEditingNotice(null);
    setShowForm(true);
  };

  // EDIT

  const handleEditNotice = (notice: Notice) => {
    setEditingNotice(notice);
    setShowForm(true);
  };

  // CLOSE

  const handleClose = () => {
    setShowForm(false);
    setEditingNotice(null);
  };

  // SAVE

  const handleSave = async (
    notice: NoticeFormData
  ) => {
    try {
      console.log("NOTICE DATA:", notice);

      if (editingNotice) {
        await axios.patch(
          `http://localhost:5000/api/notice/${editingNotice._id}`,
          notice
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/notice",
          notice
        );
      }

      await getNotices();

      setShowForm(false);
      setEditingNotice(null);
    } catch (error) {
      console.error("Save notice error:", error);
    }
  };

  // DELETE

  const handleDeleteNotice = async (
    notice: Notice
  ) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/notice/${notice._id}`
      );

      await getNotices();
    } catch (error) {
      console.error("Delete notice error:", error);
    }
  };

  // COLUMNS

  const columns: ColumnDef<Notice>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },

    {
      accessorKey: "message",
      header: "Message",
    },

    {
      accessorKey: "audience",
      header: "Audience",
    },

    {
      accessorKey: "createdBy",
      header: "Created By",
    },

    {
      accessorKey: "createdAt",
      header: "Created At",

      cell: ({ row }) => {
        const date = row.original.createdAt;

        return date
          ? new Date(date).toLocaleDateString("en-IN")
          : "-";
      },
    },

    {
      id: "actions",
      header: "Action",

      cell: ({ row }) => {
        const notice = row.original;

        return (
          <div className="flex gap-2">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() =>
                handleEditNotice(notice)
              }
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() =>
                handleDeleteNotice(notice)
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
          Notice
        </h1>

        <Button
          onClick={handleAddNotice}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add Notice
        </Button>

      </div>

      {/* DIALOG */}

      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);

          if (!open) {
            setEditingNotice(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl">

          <DialogHeader>
            <DialogTitle>
              {editingNotice
                ? "Edit Notice"
                : "Add Notice"}
            </DialogTitle>
          </DialogHeader>

          <NoticeForm
            onSave={handleSave}
            editingNotice={editingNotice}
            onClose={handleClose}
          />

        </DialogContent>
      </Dialog>

      {/* TABLE */}

      <DataTable
        columns={columns}
        data={notices}
        searchKey="title"
      />

    </div>
  );
}

export default Notice;