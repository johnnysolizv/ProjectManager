const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      required: [true, "El nombre es requerido"],
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    },
    duedate: {
      type: Date,
      required: [true, "La fecha es requerida"],
    },
    status: {
      type: String,
      required: [true, "El estado es requerido"],
    },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'El usuario es requerido']
    }
  },
  { timestamps: true }
);
ProjectSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id'
});

ProjectSchema.set('toObject', { virtuals: true });
ProjectSchema.set('toJSON', { virtuals: true });

const Project = mongoose.model("Project", ProjectSchema, "Project");

module.exports = Project;
