const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// CORS
app.use(
  cors({
    origin: [
      "https://www.hrslifecharitabletrust.com",
      "https://hrslifecharitabletrust.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body parser
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password required
  },
});

// Verify email config
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email configuration error:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "NGO Email Backend Server is running",
    timestamp: new Date().toISOString(),
    services: {
      email: !!process.env.EMAIL_USER,
    },
  });
});

// Ping test
app.get("/api/ping", (req, res) => {
  res.json({ success: true, message: "Backend is alive 🚀" });
});

/* -------------------- CONTACT ROUTE -------------------- */
app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Email to user (confirmation)
    const userMailOptions = {
      from: {
        name: "Help Rescue Secure Life Charitable Trust",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: "Thank You for Contacting Us - Help Rescue Secure Life",
      html: `<p>Dear ${firstName} ${lastName},</p>
             <p>Thank you for contacting us. We have received your message:</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p><strong>Message:</strong> ${message}</p>
             <p>We will get back to you within 24 hours.</p>`,
    };

    // Email to NGO
    const ngoMailOptions = {
      from: {
        name: "NGO Website Contact Form",
        address: process.env.EMAIL_USER,
      },
      to: process.env.NGO_OWNER_EMAIL || process.env.EMAIL_USER,
      subject: `🔔 New Contact Form Submission - ${subject || "No Subject"}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(ngoMailOptions),
    ]);

    console.log(`✅ Contact form processed for ${firstName} ${lastName}`);
    res.json({
      success: true,
      message: "Thank you for your message. We will respond within 24 hours.",
    });
  } catch (err) {
    console.error("❌ Contact route error:", err.message);
    res.status(500).json({ error: "Failed to process contact form" });
  }
});

/* -------------------- DONATION ROUTE -------------------- */
app.post("/api/donation-confirmation", async (req, res) => {
  try {
    const { name, email, phone, amount, message, pan, donationType } = req.body;
    if (!name || !email || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const donorName = name;
    const donorEmail = email;
    const receiptNumber = `RCPT-${Date.now()}`;

    // Donor confirmation email
    const donorMailOptions = {
      from: {
        name: "Help Rescue Secure Life Charitable Trust",
        address: process.env.EMAIL_USER,
      },
      to: donorEmail,
      subject: `🙏 Thank You for Your Donation - Receipt #${receiptNumber}`,
      html: `<p>Dear ${donorName},</p>
             <p>Thank you for your generous donation of ₹${amount}.</p>
             <p><strong>Receipt Number:</strong> ${receiptNumber}</p>
             <p><strong>Donation Type:</strong> ${donationType || "General"}</p>
             <p>This donation is eligible for tax deduction under Section 80G.</p>`,
    };

    // NGO notification email
    const ngoMailOptions = {
      from: {
        name: "NGO Donation System",
        address: process.env.EMAIL_USER,
      },
      to: process.env.NGO_OWNER_EMAIL || process.env.EMAIL_USER,
      subject: `💰 New Donation Received - ₹${amount}`,
      text: `
        Name: ${donorName}
        Email: ${donorEmail}
        Phone: ${phone || "N/A"}
        PAN: ${pan || "N/A"}
        Amount: ₹${amount}
        Type: ${donationType || "General"}
        Receipt: ${receiptNumber}
        Message: ${message || "N/A"}
      `,
    };

    await Promise.all([
      transporter.sendMail(donorMailOptions),
      transporter.sendMail(ngoMailOptions),
    ]);

    console.log(`✅ Donation confirmation sent for ${donorName}`);
    res.json({
      success: true,
      message: "Donation confirmation sent successfully",
      receiptNumber,
    });
  } catch (err) {
    console.error("❌ Donation route error:", err.message);
    res.status(500).json({ error: "Failed to process donation" });
  }
});

/* -------------------- VOLUNTEER ROUTE -------------------- */
app.post("/api/volunteer", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      age,
      message,
      occupation,
      experience,
      availability,
      skills,
      motivation,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const applicationId = `VOL-${Date.now()}`;

    // Volunteer confirmation
    const volunteerMailOptions = {
      from: {
        name: "Help Rescue Secure Life Charitable Trust",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: `🤝 Volunteer Application Received - ${applicationId}`,
      text: `Dear ${firstName} ${lastName},\n\nThank you for your interest in volunteering with us.\nApplication ID: ${applicationId}\nWe will review and respond within 3-5 business days.`,
    };

    // NGO notification
    const ngoMailOptions = {
      from: {
        name: "NGO Volunteer System",
        address: process.env.EMAIL_USER,
      },
      to: process.env.NGO_OWNER_EMAIL || process.env.EMAIL_USER,
      subject: `🤝 New Volunteer Application - ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Age: ${age || "N/A"}
        Occupation: ${occupation || "N/A"}
        Experience: ${experience || "N/A"}
        Skills: ${skills || "N/A"}
        Availability: ${availability}
        Motivation: ${motivation}
        Application ID: ${applicationId}
      `,
    };

    await Promise.all([
      transporter.sendMail(volunteerMailOptions),
      transporter.sendMail(ngoMailOptions),
    ]);

    console.log(`✅ Volunteer application processed for ${firstName} ${lastName}`);
    res.json({
      success: true,
      message:
        "Thank you for your volunteer application. We will review it and get back to you.",
      applicationId,
    });
  } catch (err) {
    console.error("❌ Volunteer route error:", err.message);
    res.status(500).json({ error: "Failed to process volunteer application" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `📧 Email service: ${process.env.EMAIL_USER ? "Configured" : "Not configured"}`
  );
});
