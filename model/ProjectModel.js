const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  liveLink: { type: String, required: true },

  imageUrl: { type: String, required: true },
  imageAlt: { type: String, required: true },

  gifUrl: { type: String, required: true },
  gifAlt: { type: String, required: true },

  breifExplanation: { type: String, required: true },
  duration: { type: String, required: true },

  technologies: { type: [String], required: true },
  newKnowledge: { type: [String], required: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema);
