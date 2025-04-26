import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  reported_at: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return {
        id: ret.id,
        title: ret.title,
        description: ret.description,
        severity: ret.severity,
        reported_at: ret.reported_at,
      };
    }
  }
});

// Auto-increment logic without a Counter model
incidentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastIncident = await mongoose.model("Incident").findOne().sort({ id: -1 });
    this.id = lastIncident ? lastIncident.id + 1 : 1;
  }
  next();
});

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;
