const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const { items, total, customerEmail } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty ☕" });
    }
    ;
    const order = new Order({ items, total });
    await order.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jspavithra20@gmail.com",
        pass: "zvsbotbyseotqcvr"
      }
    });
    if (!customerEmail) {
  return res.status(400).json({ message: "Customer email required 📧" });
}

    await transporter.sendMail({
      from: "Sip Serenity ☕ <jspavithra20@gmail.com>",
      to: customerEmail,
      subject: "Sip Serenity Order Confirmed 🍃",
      text: `
Thank you for your order!

Items:
${items.map(i => `${i.name} x ${i.qty}`).join("\n")}

Total: ₹${total}

Your tea is being prepared ☕
      `
    });

    res.status(201).json({
      message: "Order placed & email sent successfully 📩",
      order
    });

  } catch (err) {
  console.log("MAIL ERROR:", err);   // 🔥 important
  res.status(500).json({ error: err.message });
}
});

module.exports = router;