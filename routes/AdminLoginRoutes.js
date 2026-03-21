// routes/adminRoutes.js
const express = require("express");
const protect = require("../middleware/authMiddleWare");
const { registerAdmin, loginAdmin, fetchAdminLogin, updateAdminLogin, deleteAdminLogin } = require("../controller/AdminLoginController");
const router = express.Router();


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/", fetchAdminLogin);
router.put("/:id", protect, updateAdminLogin);
router.delete("/:id", protect, deleteAdminLogin);

module.exports = router;
