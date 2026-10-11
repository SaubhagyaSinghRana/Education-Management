import { useState, useEffect } from "react";
import axios from "axios";

import { Class } from "../../data/classes";
import ClassForm from "../../components/class/ClassForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface ClassResponse {
  success: boolean;
  data: Class;
}

interface ClassesResponse {
  success: boolean;
  data: Class[];
}

function Classes() {
  const [classes, setClasses] = useState<Class[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [editingClass, setEditingClass] =
    useState<Class | null>(null);

  // GET CLASSES
  
  const getClasses = async () => {
    try {
      const res = await axios.get<ClassesResponse>(
        "http://localhost:5000/api/class"
      );

      setClasses(res.data.data);
    } catch (error) {
      console.error("Get classes error:", error);
    }
  };

  // ADD CLASS
  const handleAddClass = () => {
    setEditingClass(null);
    setShowForm(true);
  };

  // EDIT CLASS
  const handleEditClass = (classItem: Class) => {
    setEditingClass(classItem);
    setShowForm(true);
  };

  // CLOSE
  const handleClose = () => {
    setShowForm(false);
    setEditingClass(null);
  };

  // SAVE / UPDATE
  const handleSave = async (classData: Class) => {
    try {
          const { _id, ...data } = classData;

      if (editingClass) {
        // UPDATE
        const res = await axios.patch<ClassResponse>(
          `http://localhost:5000/api/class/${editingClass._id}`,
          data
        );

        setClasses((prev) =>
          prev.map((item) =>
            item._id === editingClass._id
              ? res.data.data
              : item
          )
        );
      } else {
        // CREATE
        const res = await axios.post<ClassResponse>(
          "http://localhost:5000/api/class",
          data
        );

        setClasses((prev) => [
          ...prev,
          res.data.data,
        ]);
      }

      setShowForm(false);
      setEditingClass(null);

    } catch (error) {
      console.error("Save class error:", error);
    }
  };

  // DELETE

  const handleDeleteClass = async (classItem: Class) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/class/${classItem._id}`
      );

      getClasses();

    } catch (error) {
      console.error("Delete class error:", error);
    }
  };

  // LOAD DATA
  useEffect(() => {
    getClasses();
  }, []);

  // TABLE COLUMNS
  const columns: ColumnDef<Class>[] = [
    {
      accessorKey: "name",
      header: "Class Name",
    },

    {
      accessorKey: "section",
      header: "Section",
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
        const classItem = row.original;

        return (
          <div className="flex gap-2">

            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() =>
                handleEditClass(classItem)
              }
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() =>
                handleDeleteClass(classItem)
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


      <div className="flex items-center justify-between mb-4">

        <h1 className="text-2xl font-bold">
          Classes
        </h1>

        <div className="flex gap-2">

          <Button
            onClick={handleAddClass}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Class
          </Button>

          <Button
            onClick={getClasses}
            className="bg-green-600 hover:bg-green-700"
          >
            All Class List
          </Button>

        </div>

      </div>


      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);

          if (!open) {
            setEditingClass(null);
          }
        }}
      >

        <DialogContent className="max-w-3xl">

          <DialogHeader>

            <DialogTitle>
              {editingClass
                ? "Edit Class"
                : "Add Class"}
            </DialogTitle>

          </DialogHeader>

          <ClassForm
            onSave={handleSave}
            editingClass={editingClass}
            onClose={handleClose}
          />

        </DialogContent>

      </Dialog>


      <DataTable
        columns={columns}
        data={classes}
        searchKey="name"
      />

    </div>
  );
}

export default Classes;