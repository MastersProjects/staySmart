import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

admin.initializeApp();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'phongtsm@gmail.com',
        clientId: functions.config().gmail.client_id,
        clientSecret: functions.config().gmail.secret,
        refreshToken: functions.config().gmail.refresh_token,
        accessToken: functions.config().gmail.access_token,
    },
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

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error(error);
            }
            console.log('Sended');
        });

        return '';

    });
