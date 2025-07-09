import mongoose from "mongoose";
const workSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  date: {
    type: Date,
    default: new Date.now(),
  },
  duration: {
    type: Number,
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
});

const Work = mongoose.models.Work || mongoose.model("Work", workSchema);
export default Work;
