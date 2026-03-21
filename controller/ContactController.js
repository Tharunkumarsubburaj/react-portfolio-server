const ContactModel = require("../model/ContactModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fetchContacts = async (req, res) => {
  try {
    const contactsData = await ContactModel.find();
    res.json(contactsData);
  } catch (error) {
    console.error("Error on fetch data of contact:", error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

const createContacts = async (req, res) => {
  const { name, emailid, message } = req.body;

  if (!name || !emailid || !message) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }

  try {

    const contactData = await ContactModel.create({
      name,
      emailid,
      message,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error("SMTP verify error:", error);
      } else {
        console.log("SMTP server ready:", success);
      }
    });

    const email = emailid;

    const adminHtml = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; border-radius: 1rem; padding: 24px; background:rgba(26, 26, 26, 0.5); color:rgba(245, 245, 245, 0.9);">
        <h2 style="color:#FF6B35; margin-bottom:16px;">New contact from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p style="margin-top:16px;"><strong>Message:</strong></p>
        <p style="white-space:pre-line; background:rgba(245, 245, 245, 0.5); padding:16px; border-radius:8px;">${message}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New message from ${name}`,
      html: adminHtml,
    });

    // 4) User email
    const userHtml = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; border-radius:1rem; padding:24px; background:rgba(26, 26, 26, 0.95);">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:rgba(245, 245, 245, 0.1);border-radius:16px;overflow:hidden;border:1px solid #1f2937;">
          <tr>
            <td style="padding:20px 24px; background:#FF6B35; color:rgba(245, 245, 245, 0.8);">
              <h1 style="margin:0;font-size:20px;">Thanks for reaching out, ${
                name.split(" ")[0] || "there"
              }!</h1>
              <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">Your message has landed safely in the inbox.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;color:rgba(245, 245, 245, 0.8);font-size:14px;line-height:1.6;">
              <p style="margin:0 0 12px;">Here’s a copy of what you sent:</p>
              <div style="border-radius:12px;padding:16px;border:1px solid #1f2937;">
                <p style="margin:0 0 4px;"><strong style="color:#FF6B35;">Name:</strong> ${name}</p>
                <p style="margin:0 0 12px;"><strong style="color:#FF6B35;">Email:</strong> ${email}</p>
                <p style="margin:0 0 4px;"><strong style="color:#FF6B35;">Message:</strong></p>
                <p style="margin:0;white-space:pre-line;">${message}</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"Tharun Kumar" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for contacting me 👋",
      html: userHtml,
    });

    // 5) Single response back to client
    res.json({ ok: true, contact: contactData });
  } catch (error) {
    console.error("Error on post data of contact or sending mail:", error);
    res.status(500).json({ ok: false, message: "Failed to post or send mail" });
  }
};

const updateContacts = async (req, res) => {
  const { id } = req.params;
  const { name, emailid, message } = req.body;
  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      id,
      {
        name,
        emailid,
        message,
      },
      { new: true }
    );
    res.json({
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    console.error("Error on ediiting the data:", error);
    res.status(500).json({ message: "Failed to edit contact" });
  }
};

const deleteContacts = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await ContactModel.findByIdAndDelete(id);
    res.json({
      message: "Contact deleted successfully",
      contact: deletedContact,
    });
  } catch (error) {
    console.error("Error on deletin the data:", error);
    res.status(500).json({ message: "Failed to delete contact" });
  }
};

module.exports = {
  fetchContacts,
  createContacts,
  updateContacts,
  deleteContacts,
};
