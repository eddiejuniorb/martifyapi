const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.martifyagency.com",
  port: 465,
  auth: {
    user: "contact@martifyagency.com",
    pass: "#wQ4Y{}{q=RV",
  },
});

// Define the email options
const mailOptions = {
  from: "contact@martifyagency.com",
  to: "boatengjunior244@gmail.com",
  subject: "Hello from Nodemailer",
  text: "This is a test email sent using Nodemailer.",
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});

class mail {
  static sendMail(from, to, subject, html) {}
}
