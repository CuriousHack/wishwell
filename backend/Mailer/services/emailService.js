const transporter = require("../../config/transporter");
const renderTemplate = require("./templateService");

const sendEmail = async (emailData) => {
    try {
        const htmlContent = await renderTemplate({ username: emailData.username });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailData.email,
            subject: `Happy Birthday ${emailData.username}`,
            html: htmlContent,
        });

        console.log("✅ Email sent to:", emailData.email);
    } catch (error) {
        console.error("❌ Email sending failed:", error);
        throw error; // Ensure proper error handling
    }
};

module.exports = sendEmail;
