const AdminLoginModel = require("../model/AdminLoginModel");
const bcrypt = require("bcryptjs");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerAdmin = async (req, res) => {
  try {
    const { name, emailid, password } = req.body;

    const existingAdmin = await AdminLoginModel.findOne({ emailid });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await AdminLoginModel.create({
      name,
      emailid,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { emailid, password } = req.body;

    const admin = await AdminLoginModel.findOne({ emailid });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        emailid: admin.emailid,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAdminLogin = async (req, res) => {
  try {
    const admins = await AdminLoginModel.find().select("-password");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAdminLogin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, emailid } = req.body;

    const updatedAdmin = await AdminLoginModel.findByIdAndUpdate(
      id,
      { name, emailid },
      { new: true }
    ).select("-password");

    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAdminLogin = async (req, res) => {
  try {
    const { id } = req.params;
    await AdminLoginModel.findByIdAndDelete(id);
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchAdminLogin, registerAdmin, loginAdmin, updateAdminLogin, deleteAdminLogin };
