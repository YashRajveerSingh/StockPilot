import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: true,
    },

    contactPerson: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Supplier",
  supplierSchema
);