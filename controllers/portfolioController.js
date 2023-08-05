const nodemailer = require("nodemailer");
const mailgunTransport = require("nodemailer-mailgun-transport");

// Create a Mailgun transporter
const transporter = nodemailer.createTransport(
  mailgunTransport({
    auth: {
      api_key: process.env.MAILGUN_APY_KEY, // Set your Mailgun API key
      domain: process.env.MAILGUN_DOMAIN, // Set your Mailgun domain
    },
  })
);

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Email content
    const mailOptions = {
      from: "2019002296.manish@ug.sharda.ac.in",
      to: "2019002296.manish@ug.sharda.ac.in",
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name: ${name}</p></li>
          <li><p>Email: ${email}</p></li>
          <li><p>Message: ${msg}</p></li>
        </ul>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Your message was sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};

module.exports = { sendEmailController };
