const nodeMailer = require('nodemailer');

const sendMail = () => {
    let transport = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'xxx@gmail.com',
            pass: 'password'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let mailOptions = {
        from: 'EVENTBRITE-SCRAPER',
        to: ['johnsmith@gmail.com', 'anny@ru.ok'],
        subject: 'HELLO ROMAN & FRIENDS avaible',
        html: '<h1>THE HELLO ROMAN & FRIENDS</h1> We found for you, your favourite event !!!</br> Register in moments !!!' // html body
    };
    transport.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.error(err);
        } else {
            console.log(`Message ${info.messageId} sent: ${info.response}`);
        }
    });
};

module.exports = sendMail;
