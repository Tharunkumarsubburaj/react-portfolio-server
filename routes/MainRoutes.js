const express = require('express');
const router = express.Router();
const ProjectRoutes = require('./ProjectRoutes');
const SkillRoutes = require('./SkillRoutes');
const SkillCategoryRoutes = require('./SkillCategoryRoutes');
const ContactRoutes = require('./ContactRoutes');
const AdminLoginRoutes = require('./AdminLoginRoutes');

router.use('/project', ProjectRoutes);
router.use('/skill', SkillRoutes);
router.use('/skillCategory', SkillCategoryRoutes);
router.use('/contact', ContactRoutes);
router.use('/admin', AdminLoginRoutes);

module.exports = router;