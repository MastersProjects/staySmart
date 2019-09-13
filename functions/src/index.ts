import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

admin.initializeApp();

const transporter = nodemailer.createTransport({
    host: 'mail.nachhilfestaysmart.ch',
    port: 465,
    auth: {
        user: functions.config().smtp.user,
        pass: functions.config().smtp.password
    },
    tls: {
        rejectUnauthorized: false
    },
    debug: true
});


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.region('europe-west1').https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const emailOnSubmit = functions.region('europe-west1')
    .firestore.document('TutorSearchRequests/{tutorSearchRequestID}').onCreate((snap) => {
        console.log('emailOnSubmit');
        const createdTutorSearchRequest: any = snap.data();
        console.log(createdTutorSearchRequest);

        const mailOptions: Mail.Options = {
            from: `StaySmart ${functions.config().env.code} <noreply-dev@staysmart.com>`,
            to: createdTutorSearchRequest.mail,
            subject: createdTutorSearchRequest.subject,
            html: `<p style="font-size: 16px;">TEST ${snap.id}</p>
                <br />
                ${createdTutorSearchRequest.problem}`
        };

        return transporter.sendMail(mailOptions).then(() => {
            console.log(`Sended to ${createdTutorSearchRequest.mail}`);
        }).catch(error => {
            console.error(error);
        });

    });
