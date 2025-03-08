import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Birthday from "../models/Birthday.js";

dotenv.config();


export const shareBirthday = async (req, res) => {
    try {
        const { birthdayId, emails } = req.body;
        if (!birthdayId || !emails || emails.length === 0) {
            return res.status(400).json({ error: "Missing birthdayId or emails" });
        }

        // 1) Find the Birthday
        const birthday = await Birthday.findById(birthdayId);
        if (!birthday) {
            return res.status(404).json({ error: "Birthday not found" });
        }

        // 2) Load environment variables for Gmail
        const { EMAIL_USER, EMAIL_PASS, BIRTHDAY_APP_URL } = process.env;

        // 3) Create the Nodemailer transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        // 4) Build the link from env variable
        const birthdayLink = `${BIRTHDAY_APP_URL}/birthday/${birthdayId}`;

        // 5) Prepare mail
        const mailOptions = {
            from: `"Birthday Wishes" <${EMAIL_USER}>`,
            to: Array.isArray(emails) ? emails.join(",") : emails,
            subject: `Help Celebrate ${birthday.name}'s Birthday!`,
            text: `Please join us in celebrating ${birthday.name}. Link: ${birthdayLink}`,
            html: `
        <h2>Celebrate ${birthday.name}'s Birthday!</h2>
        <p>
          We're collecting heartfelt messages. 
          <a href="${birthdayLink}">Click here</a> to view the page and post your wish.
        </p>
      `,
        };

        // 6) Send
        await transporter.sendMail(mailOptions);

        return res.json({ message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Share email error:", error);
        return res.status(500).json({ error: "Failed to send emails" });
    }
};
