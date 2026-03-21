const ProjectModel = require("../model/ProjectModel");
const SkillCategoryModel = require("../model/SkillCategoryModel");

const fetchSkillCategories = async (req, res) => {
  try {
    const skillCategoriesData = await SkillCategoryModel.find();
    res.json(skillCategoriesData);
  } catch (error) {
    console.error("Error on fetch data of skill category:", error);
    res.status(500).json({ message: "Failed to fetch skill categories" });
  }
};

const createSkillCategories = async (req, res) => {
  const { name, description } = req.body;
  try {
    const skillCategoriesData = await SkillCategoryModel.create({
      name,
      description,
    });
    res.json(skillCategoriesData);
  } catch (error) {
    console.error("Error on post data of skill category:", error);
    res.status(500).json({ message: "Failed to post skill categories" });
  }
};

const updateSkillCategories = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedSkillCategory = await SkillCategoryModel.findByIdAndUpdate(id, {
      name,
      description,
    }, { new: true });
    res.json({ message: "Skill category updated successfully", skillCategory: updatedSkillCategory
    });
  } catch (error) {
    console.error("Error on ediiting the data:", error);
    res.status(500).json({ message: "Failed to edit skill category" });
  }
};

const deleteSkillCategories = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSkillCategory = await SkillCategoryModel.findByIdAndDelete(id);
    res.json({ message: "Skill category deleted successfully", skillCategory: deletedSkillCategory });
  } catch (error) {
    console.error("Error on deletin the data:", error);
    res.status(500).json({ message: "Failed to delete skill category" });
  }
};

module.exports = { fetchSkillCategories, createSkillCategories, updateSkillCategories, deleteSkillCategories };