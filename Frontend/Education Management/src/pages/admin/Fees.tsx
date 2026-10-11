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

import { Fees } from "../../data/fees";

import FeesForm, {
  FeesFormData,
} from "@/components/fees/FeesForm";

interface FeesResponse {
  success: boolean;
  data: Fees[];
}

function Fees() {
  const [fees, setFees] = useState<Fees[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFees, setEditingFees] =
    useState<Fees | null>(null);

  // =========================
  // GET FEES
  // =========================

  const getFees = async () => {
    try {
      const res = await axios.get<FeesResponse>(
        "http://localhost:5000/api/fees"
      );

      console.log("FEES API RESPONSE:", res.data.data);

      setFees(res.data.data);
    } catch (error) {
      console.error("Get fees error:", error);
    }
  };

  // =========================
  // FIRST LOAD
  // =========================

  useEffect(() => {
    getFees();
  }, []);

  // =========================
  // ADD
  // =========================

  const handleAddFee = () => {
    setEditingFees(null);
    setShowForm(true);
  };

  // =========================
  // EDIT
  // =========================

  const handleEditFee = (fee: Fees) => {
    console.log("EDIT FEE:", fee);

    setEditingFees(fee);
    setShowForm(true);
  };

  // =========================
  // CLOSE
  // =========================

  const handleClose = () => {
    setShowForm(false);
    setEditingFees(null);
  };

  // =========================
  // SAVE
  // =========================

  const handleSave = async (
    fee: FeesFormData
  ) => {
    try {
      console.log("SENDING FEE:", fee);

      if (editingFees) {
        // UPDATE

        await axios.patch(
          `http://localhost:5000/api/fees/${editingFees._id}`,
          fee
        );
      } else {
        // CREATE

        await axios.post(
          "http://localhost:5000/api/fees",
          fee
        );
      }

      // GET fresh data
      // Isse populate ke baad student name milega

      await getFees();

      setShowForm(false);
      setEditingFees(null);

    } catch (error) {
      console.error("Save fee error:", error);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDeleteFee = async (
    fee: Fees
  ) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/fees/${fee._id}`
      );

      await getFees();

    } catch (error) {
      console.error(
        "Delete fee error:",
        error
      );
    }
  };

  // =========================
  // TABLE COLUMNS
  // =========================

  const columns: ColumnDef<Fees>[] = [
    {
      accessorKey: "studentId",
      header: "Student Name",

      cell: ({ row }) => {
        const student = row.original.studentId;

        return student?.name || "-";
      },
    },

    {
      accessorKey: "amount",
      header: "Amount",
    },

    {
      accessorKey: "dueDate",
      header: "Due Date",

      cell: ({ row }) => {
        const date = row.original.dueDate;

        return date
          ? new Date(date).toLocaleDateString("en-IN")
          : "-";
      },
    },

    {
      accessorKey: "paidDate",
      header: "Paid Date",

      cell: ({ row }) => {
        const date = row.original.paidDate;

        return date
          ? new Date(date).toLocaleDateString("en-IN")
          : "-";
      },
    },

    {
      accessorKey: "paymentMode",
      header: "Payment Mode",
    },

    {
      accessorKey: "status",
      header: "Status",
    },

    // =========================
    // ACTION
    // =========================

    {
      id: "actions",
      header: "Action",

      cell: ({ row }) => {
        const fee = row.original;

        return (
          <div className="flex gap-2">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() =>
                handleEditFee(fee)
              }
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() =>
                handleDeleteFee(fee)
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
          Fees
        </h1>

        <div className="flex gap-2">

          <Button
            onClick={handleAddFee}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Fee
          </Button>

          <Button
            onClick={getFees}
            className="bg-green-600 hover:bg-green-700"
          >
            All Fees List
          </Button>

        </div>
      </div>

      {/* DIALOG */}

      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);

          if (!open) {
            setEditingFees(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl">

          <DialogHeader>
            <DialogTitle>
              {editingFees
                ? "Edit Fee"
                : "Add Fee"}
            </DialogTitle>
          </DialogHeader>

          <FeesForm
            onSave={handleSave}
            editingFees={editingFees}
            onClose={handleClose}
          />

        </DialogContent>
      </Dialog>

      {/* TABLE */}

      <DataTable
        columns={columns}
        data={fees}
        searchKey="amount"
      />

    </div>
  );
}

export default Fees;