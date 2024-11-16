const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv");
dotenv.config();

const mailtrapClient = new MailtrapClient({
    token: process.env.MAIL_TOKEN,
});

const sender = {
    email: "hello@demomailtrap.com",
    name: "Mailtrap Test",
};

module.exports = { mailtrapClient, sender };
