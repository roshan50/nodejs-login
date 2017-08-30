const Sendgrid = require('sendgrid')(
    process.env.SENDGRID_API_KEY || '<my-api-key-placed-here>'
);
/////////////////////////////////////////////////////////////////
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//////////////////////////////////////////////////////////////////
app.post('/send-mail', function (req, res) {
    // PUT your send mail logic here, req.body should have your fsubmitted form's values
    sendMail(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.send('SEND MAIL');
})



function sendMail(formData) {
    let request = Sendgrid.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            personalizations: [{
                to: [{ email: 'my.email@gmail.com' }],
                subject: 'Sendgrid test email from Node.js'
            }],
            from: { email: 'noreply@email-app.firebaseapp.com' },
            content: [{
                type: 'text/plain',
                value: `Hello ${formData.userFirstName} ${formData.userLastName}! Can you hear me ${formData.userFirstName}?.`
            }]
        }
    });

    Sendgrid.API(request, function (error, response) {
        if (error) {
            console.log('Mail not sent; see error message below.');
        } else {
            console.log('Mail sent successfully!');
        }
        console.log(response);
    });
}