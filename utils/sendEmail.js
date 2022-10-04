const nodemailer = require("nodemailer");

//using nodemailer
const sendEmail = async (email, otp, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "gmail",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "chirukosanam123@gmail.com",
        pass: "xxhrvvaakgwryfzi",
      },
    });
    // var otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    await transporter.sendMail({
      from: "chirukosanam123@gmail.com",
      to: email,
      subject: "Hi....",
      text: "Hello...........",
      html: `<h1>Welcome</h1><p>Your verification code is ${otp}.Please Reset Your Password.</p>`,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
