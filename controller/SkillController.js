const SkillModel = require("../model/SkillModel");

const fetchSkills = async (req, res) => {
  try {
    const skillsData = await SkillModel.find();
    res.json(skillsData);
  } catch (error) {
    console.error("Error on fetch data of skill:", error);
    res.status(500).json({ message: "Failed to fetch skills" });
  }
};

const createSkills = async (req, res) => {
  const { name, description, icon, category } = req.body;
  try {
    const skillsData = await SkillModel.create({
        name,
        description,
        icon,
        category
    });
    res.json(skillsData);
  } catch (error) {
    console.error("Error on post data of skill:", error);
    res.status(500).json({ message: "Failed to post skills" });
  }
};

const updateSkills = async (req, res) => {
  const { id } = req.params;
  const { name, description, icon, category } = req.body;
  try {
    const updatedSkill = await SkillModel.findByIdAndUpdate(id, {
        name,
        description,
        icon,
        category
    }, { new: true });
    res.json({ message: "Skill updated successfully", skill: updatedSkill
    });
  } catch (error) {
    console.error("Error on ediiting the data:", error);
    res.status(500).json({ message: "Failed to edit skill" });
  }
};

const deleteSkills = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSkill = await SkillModel.findByIdAndDelete(id);
    res.json({ message: "Skill deleted successfully", skill: deletedSkill });
  } catch (error) {
    console.error("Error on deleting the data:", error);
    res.status(500).json({ message: "Failed to delete skill" });
  }
};

module.exports = { fetchSkills, createSkills, updateSkills, deleteSkills };