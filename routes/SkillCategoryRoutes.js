const express = require('express');
const { fetchSkillCategories, createSkillCategories, updateSkillCategories, deleteSkillCategories } = require('../controller/SkillCategoryController');
const router = express.Router();


router.get('/', fetchSkillCategories);
router.post('/', createSkillCategories);
router.put('/:id', updateSkillCategories);
router.delete('/:id', deleteSkillCategories);

module.exports = router;