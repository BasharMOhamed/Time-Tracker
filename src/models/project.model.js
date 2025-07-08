import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  interval: {
    type: String,
    enum: ["Weekly", "Daily"],
    required: true,
  },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;
