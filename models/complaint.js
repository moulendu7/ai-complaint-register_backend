const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Bathroom & Hygiene",
        "Anti-Ragging & Safety",
        "Mess & Food Quality",
        "Academic Issues",
        "Infrastructure/Maintenance",
        "Other",
      ],
      default: "Other",
    },

    status: {
      type: String,
      enum: ["Submitted", "In Progress", "Resolved"],
      default: "Submitted",
    },

    department: {
      type: String,
      default: "Unassigned",
    },

    aiConfidence: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Complaint", complaintSchema);
