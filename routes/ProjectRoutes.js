const express = require('express');
const { fetchProjects, createProjects, updateProjects, deleteProjects } = require('../controller/ProjectController');
const router = express.Router();


router.get('/', fetchProjects);
router.post('/', createProjects);
router.put('/:id', updateProjects);
router.delete('/:id', deleteProjects);

module.exports = router;