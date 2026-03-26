const nodemailer = require('nodemailer');
const sendMail = async (email, title, body) => {

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })


    let info = await transporter.sendMail({
        from: 'codexpertise99@gmail.com',
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`,
    })
    return info;
}

module.exports = sendMail;