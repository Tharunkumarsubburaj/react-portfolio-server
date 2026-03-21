const ProjectModel = require("../model/ProjectModel");

const fetchProjects = async (req, res) => {
  try {
    const projectsData = await ProjectModel.find();
    res.json(projectsData);
  } catch (error) {
    console.error("Error on fetch data of project:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

const createProjects = async (req, res) => {
  const { name, description, link, liveLink, imageUrl, imageAlt, gifUrl, gifAlt, breifExplanation, duration, technologies, newKnowledge } = req.body;
  try {
    const projectsData = await ProjectModel.create({
      name,
      description,
      link,
      liveLink,
      imageUrl,
      imageAlt,
      gifUrl,
      gifAlt,
      breifExplanation,
      duration,
      technologies,
      newKnowledge,
    });
    res.json(projectsData);
  } catch (error) {
    console.error("Error on post data of project:", error);
    res.status(500).json({ message: "Failed to post projects" });
  }
};

const updateProjects = async (req, res) => {
  const { id } = req.params;
  const { name, description, link, liveLink, imageUrl, imageAlt, gifUrl, gifAlt, breifExplanation, duration, technologies, newKnowledge } = req.body;
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(id, {
      name,
      description,
      link,
      liveLink,
      imageUrl,
      imageAlt,
      gifUrl,
      gifAlt,
      breifExplanation,
      duration,
      newKnowledge,
      technologies,
    }, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project updated successfully", project: updatedProject
    });
  } catch (error) {
    console.error("Error on ediiting the data:", error);
    res.status(500).json({ message: "Failed to edit project" });
  }
};

const deleteProjects = async (req, res) => {
  const { id } = req.params;
  try {
    if(!id){
      return res.status(400).json({ message: "Project ID is required" });
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully", project: deletedProject });
  } catch (error) {
    console.error("Error on deletin the data:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};

module.exports = { fetchProjects, createProjects, updateProjects, deleteProjects };
