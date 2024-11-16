const { mailtrapClient, sender } = require("./verifyMail.config");
const { PASS_EMAIL_TEMP, PASS_RESET_SUCCESS_TEMP } = require("./emailTemps");

const sendPasswordResetEmail = async (email, reset_url) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Instructions",
            html: PASS_EMAIL_TEMP.replace('{{pass_reset_link}}', reset_url),
            category: "Password Reset",
        });
    } catch (error) {
        throw new Error("Failed to send password reset email: " + error.message);
    }
};

const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASS_RESET_SUCCESS_TEMP,
            category: "Password Reset",
        });
        console.log("Password reset success email sent successfully");
    } catch (error) {
        throw new Error("Failed to send password reset success email: " + error.message);
    }
}

module.exports = { sendPasswordResetEmail, sendResetSuccessEmail };
