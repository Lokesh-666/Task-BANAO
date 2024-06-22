const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");

module.exports.sendEmail = async (event) => {
  const { receiver_email, subject, body_text } = JSON.parse(event.body);

  if (!receiver_email || !subject || !body_text) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "receiver_email, subject, and body_text are required.",
      }),
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or any other email service you prefer
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: receiver_email,
      subject: subject,
      text: body_text,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully." }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
