const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: ['https://www.hrslifecharitabletrust.com', 'https://hrslifecharitabletrust.com'],
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));


// Body parser middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password for Gmail
  },
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'NGO Email Backend Server is running',
    timestamp: new Date().toISOString(),
    services: {
      email: !!process.env.EMAIL_USER
    }
  });
});

// ✅ Test route
app.get("/api/ping", (req, res) => {
  console.log("✅ /api/ping hit");
  res.json({ success: true, message: "Backend is alive 🚀" });
});


// Contact form submission
// ✅ CONTACT ROUTE
app.post("/api/contact", async (req, res) => {
  try {
    console.log("📩 Contact form data:", req.body);

    const { firstName, lastName, email, phone, subject, message } = req.body;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `📩 New Contact Form Submission: ${subject || "No Subject"}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Contact email sent successfully");
    res.json({ success: true, message: "Contact form submitted successfully" });

  } catch (err) {
    console.error("❌ Contact email failed:", err.message);
    res.status(500).json({ success: false, message: "Failed to send contact email" });
  }
});


// ✅ DONATION ROUTE
app.post("/api/donate", async (req, res) => {
  try {
    console.log("💰 Donation form data:", req.body);

    const { name, email, phone, amount, message } = req.body;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "💰 New Donation Request",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Amount: ₹${amount}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Donation email sent successfully");
    res.json({ success: true, message: "Donation email sent successfully" });

  } catch (err) {
    console.error("❌ Donation email failed:", err.message);
    res.status(500).json({ success: false, message: "Failed to send donation email" });
  }
});



    // Email to user (confirmation)
    const userMailOptions = {
      from: {
        name: 'Help Rescue Secure Life Charitable Trust',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: 'Thank You for Contacting Us - Help Rescue Secure Life',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10B981, #F59E0B); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>🙏 Thank You for Reaching Out!</h1>
            <p>Help Rescue Secure Life Charitable Trust</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Dear ${firstName} ${lastName},</h2>
            <p>Thank you for contacting Help Rescue Secure Life Charitable Trust. We have received your message and will get back to you within 24 hours.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Your Message Details:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong> ${message}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN')}</p>
            </div>

            <div style="background: #e6f7ff; padding: 15px; border-left: 4px solid #10B981; margin: 20px 0;">
              <p><strong>For urgent matters:</strong></p>
              <p>📞 Emergency Helpline: +91-98191916886 (Available 24/7)</p>
              <p>📧 Email: ${process.env.EMAIL_USER}</p>
            </div>

            <p>Thank you for your interest in supporting our cause to help elderly individuals in Greater Mumbai.</p>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f1f1; border-radius: 8px;">
              <p><strong>Help Rescue Secure Life Charitable Trust</strong></p>
              <p>Founded by Seema Vishwakarma | Serving Greater Mumbai Region</p>
            </div>
          </div>
        </div>
      `
    };

    // Email to NGO owner (notification)
    const ngoMailOptions = {
      from: {
        name: 'NGO Website Contact Form',
        address: process.env.EMAIL_USER
      },
      to: process.env.NGO_OWNER_EMAIL || process.env.EMAIL_USER,
      subject: `🔔 New Contact Form Submission - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2>📧 New Contact Form Submission</h2>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3>Contact Details:</h3>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>Subject:</strong> ${subject}</p>
              
              <h3>Message:</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #10B981;">
                ${message}
              </div>
              
              <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN')}</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #666;">Please respond to this inquiry within 24 hours.</p>
            </div>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(ngoMailOptions)
    ]);

    console.log(`✅ Contact form processed for ${firstName} ${lastName} (${email})`);

    res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to process contact form. Please try again.' });
  }
});

// Donation confirmation
app.post("/api/donate", async (req, res) => {
  try {
    console.log("💰 Donation form data:", req.body);

    const { name, email, phone, amount, message } = req.body;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Donation Request",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Amount: ₹${amount}
        Message: ${message}
      `,
    };

    // Try sending email
    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Donation email sent");
      res.json({ success: true, message: "Donation email sent successfully" });
    } catch (err) {
      console.error("❌ Donation email failed:", err.message);
      // Important: still send a response
      res.status(500).json({ success: false, message: "Failed to send donation email" });
    }
  } catch (err) {
    console.error("❌ Donation route error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

    // Email to donor (confirmation)
    const donorMailOptions = {
      from: {
        name: 'Help Rescue Secure Life Charitable Trust',
        address: process.env.EMAIL_USER
      },
      to: donorEmail,
      subject: `🙏 Thank You for Your Generous Donation - Receipt #${receiptNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10B981, #F59E0B); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>🙏 Thank You for Your Generous Donation!</h1>
            <p>Help Rescue Secure Life Charitable Trust</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Donation Confirmation</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Donation Details</h3>
              <p><strong>Receipt Number:</strong> ${receiptNumber}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
              <p><strong>Amount:</strong> <span style="font-size: 24px; font-weight: bold; color: #10B981;">₹${amount.toLocaleString('en-IN')}</span></p>
              <p><strong>Donation Type:</strong> ${donationType}</p>
              <p><strong>Status:</strong> ✅ Confirmed</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Donor Information</h3>
              <p><strong>Name:</strong> ${donorName}</p>
              <p><strong>Email:</strong> ${donorEmail}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              ${pan ? `<p><strong>PAN Number:</strong> ${pan}</p>` : ''}
            </div>

            <div style="background: #e6f7ff; padding: 15px; border-left: 4px solid #10B981; margin: 20px 0;">
              <h3>📋 Tax Deduction Information</h3>
              <p><strong>80G Registration:</strong> Available</p>
              <p>This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961. Please save this receipt for your tax filing.</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>💝 Your Impact</h3>
              <p>Your generous donation of ₹${amount.toLocaleString('en-IN')} will help us:</p>
              <ul style="color: #666;">
                <li>Provide nutritious meals to elderly individuals</li>
                <li>Offer healthcare support and medical assistance</li>
                <li>Create safe shelter and accommodation</li>
                <li>Support community outreach programs</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f1f1; border-radius: 8px;">
              <p><strong>Help Rescue Secure Life Charitable Trust</strong></p>
              <p>Founded by Seema Vishwakarma | Serving Greater Mumbai Region</p>
              <p>📞 +91-98191916886 | 📧 ${process.env.EMAIL_USER}</p>
            </div>
          </div>
        </div>
      `
    };

    // Email to NGO owner (notification)
    const ngoMailOptions = {
      from: {
        name: 'NGO Donation System',
        address: process.env.EMAIL_USER
      },
      to: process.env.NGO_OWNER_EMAIL || process.env.EMAIL_USER,
      subject: `💰 New Donation Received - ₹${amount.toLocaleString('en-IN')}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2>💰 New Donation Received!</h2>
            <h1 style="margin: 10px 0;">₹${amount.toLocaleString('en-IN')}</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3>Donor Information:</h3>
              <p><strong>Name:</strong> ${donorName}</p>
              <p><strong>Email:</strong> <a href="mailto:${donorEmail}">${donorEmail}</a></p>
              ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
              ${pan ? `<p><strong>PAN Number:</strong> ${pan}</p>` : ''}
              
              <h3>Donation Details:</h3>
              <p><strong>Amount:</strong> ₹${amount.toLocaleString('en-IN')}</p>
              <p><strong>Type:</strong> ${donationType}</p>
              <p><strong>Receipt Number:</strong> ${receiptNumber}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString('en-IN')}</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #666;">Confirmation email has been sent to the donor.</p>
            </div>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(donorMailOptions),
      transporter.sendMail(ngoMailOptions)
    ]);

    console.log(`✅ Donation confirmation sent for ${donorName} (₹${amount})`);

    res.json({
      success: true,
      message: 'Donation confirmation sent successfully',
      receiptNumber
    });

  } catch (error) {
    console.error('❌ Error processing donation confirmation:', error);
    res.status(500).json({ error: 'Failed to send donation confirmation. Please try again.' });
  }
});

// Volunteer application
app.post('/api/volunteer', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      age, 
      occupation, 
      experience, 
      availability, 
      skills, 
      motivation 
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !availability || !motivation) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const applicationId = `VOL-${Date.now()}`;

    // Email to volunteer (confirmation)
    const volunteerMailOptions = {
      from: {
        name: 'Help Rescue Secure Life Charitable Trust',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: `🤝 Thank You for Your Volunteer Application - Application #${applicationId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10B981, #F59E0B); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>🤝 Thank You for Volunteering!</h1>
            <p>Help Rescue Secure Life Charitable Trust</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Dear ${firstName} ${lastName},</h2>
            <p>Thank you for your interest in volunteering with Help Rescue Secure Life Charitable Trust. Your application has been received and is being reviewed.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Application Details</h3>
              <p><strong>Application ID:</strong> ${applicationId}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
              <p><strong>Status:</strong> Under Review</p>
            </div>

            <div style="background: #e6f7ff; padding: 15px; border-left: 4px solid #10B981; margin: 20px 0;">
              <h3>📋 Next Steps</h3>
              <ul>
                <li>Our team will review your application within 3-5 business days</li>
                <li>We may contact you for a brief interview or orientation</li>
                <li>Background verification may be required for certain roles</li>
                <li>You'll receive training materials and guidelines upon acceptance</li>
              </ul>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>🌟 Why Your Help Matters</h3>
              <p>As a volunteer with us, you'll be making a direct impact on the lives of elderly individuals in Greater Mumbai by:</p>
              <ul style="color: #666;">
                <li>Providing companionship and emotional support</li>
                <li>Assisting with daily activities and healthcare needs</li>
                <li>Organizing community events and activities</li>
                <li>Helping with administrative and operational tasks</li>
              </ul>
            </div>

            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #F59E0B; margin: 20px 0;">
              <p><strong>Questions or concerns?</strong></p>
              <p>📞 Contact us: +91-98191916886</p>
              <p>📧 Email: ${process.env.EMAIL_USER}</p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f1f1; border-radius: 8px;">
              <p><strong>Help Rescue Secure Life Charitable Trust</strong></p>
              <p>Founded by Seema Vishwakarma | Serving Greater Mumbai Region</p>
            </div>
          </div>
        </div>
      `
    };

    // Email to NGO owner (notification)
    const ngoMailOptions = {
      from: {
        name: 'NGO Volunteer System',
        address: process.env.EMAIL_USER
      },
      to: process.env.NGO_OWNER_EMAIL || process.env.EMAIL_USER,
      subject: `🤝 New Volunteer Application - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2>🤝 New Volunteer Application</h2>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3>Applicant Information:</h3>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
              ${age ? `<p><strong>Age:</strong> ${age}</p>` : ''}
              ${occupation ? `<p><strong>Occupation:</strong> ${occupation}</p>` : ''}
              
              <h3>Volunteer Details:</h3>
              <p><strong>Availability:</strong> ${availability}</p>
              ${experience ? `<p><strong>Experience:</strong> ${experience}</p>` : ''}
              ${skills ? `<p><strong>Skills:</strong> ${skills}</p>` : ''}
              
              <h3>Motivation:</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #10B981;">
                ${motivation}
              </div>
              
              <p><strong>Application ID:</strong> ${applicationId}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN')}</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #666;">Please review and respond to this application within 3-5 business days.</p>
            </div>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(volunteerMailOptions),
      transporter.sendMail(ngoMailOptions)
    ]);

    console.log(`✅ Volunteer application processed for ${firstName} ${lastName} (${email})`);

    res.json({
      success: true,
      message: 'Thank you for your volunteer application. We will review it and get back to you within 3-5 business days.',
      applicationId
    });

  } catch (error) {
    console.error('❌ Error processing volunteer application:', error);
    res.status(500).json({ error: 'Failed to process volunteer application. Please try again.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NGO Email Backend Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});