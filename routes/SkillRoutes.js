const express = require('express');
const { fetchSkills, createSkills, updateSkills, deleteSkills } = require('../controller/SkillController');
const router = express.Router();


router.get('/', fetchSkills);
router.post('/', createSkills);
router.put('/:id', updateSkills);
router.delete('/:id', deleteSkills);

module.exports = router;