import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import * as uuidv4 from 'uuid/v4';

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
    .firestore.document('TutorSearchRequests/{tutorSearchRequestID}').onCreate(async (snap) => {
        console.log('emailOnSubmit');
        const createdTutorSearchRequest: any = snap.data();
        console.log(createdTutorSearchRequest);

        const linkRef = uuidv4();

        await snap.ref.update({linkRef: linkRef});

        const mailOptions: Mail.Options = {
            from: `StaySmart ${functions.config().env.code} <noreply-dev@staysmart.com>`,
            to: createdTutorSearchRequest.mail,
            subject: createdTutorSearchRequest.subject,
            html: `<p style="font-size: 16px;">TEST https://staysmart-dev.web.app/search-request/${linkRef}</p>
                <br />
                ${createdTutorSearchRequest.problem}`
        };

        return transporter.sendMail(mailOptions).then(() => {
            console.log(`Sended to ${createdTutorSearchRequest.mail}`);
        }).catch(error => {
            console.error(error);
        });

    });
