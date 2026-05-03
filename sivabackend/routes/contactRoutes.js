const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jspavithra20@gmail.com",
        pass: "zvsbotbyseotqcvr"
      }
    });

    await transporter.sendMail({
      from:"jspavithra20@gmail.com" ,
      to: "jspavithra20@gmail.com",
      subject: "New Contact Message ☕",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `
    });

    res.json({ message: "Message sent successfully 📩" });
  } catch (err) {
    console.log("MAIL ERROR:", err);  // ✅ debug
    res.status(500).json({ message: "Mail failed" });
  }
});

module.exports = router;