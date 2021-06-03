
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const sendEmail = (email, site, token) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'bizsolutions841@gmail.com', // Change to your verified sender
        subject: 'Welcome to Biz Solutions',
        text: 'Welcome to Biz Solutions',
        html: '<div class="container" style="height:200px; text-align: center;"><strong>Welcome to Biz Solutions<strong><br><br>' +
            'Thank you for the verification, please click the button below!<br><br>' +
            '<a href="' + site + '/registration?token=' + token.token + '"><button type="button">Click To Redirect To Registration Page!</button></a></div>',
    };
    return sgMail
        .send(msg)
        .then((response) => console.log('Email: ', response))
        .catch((error) => console.log('Error sending email: ', error));
};

module.exports = sendEmail;
