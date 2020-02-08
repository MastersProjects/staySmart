import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import * as uuidv4 from 'uuid/v4';
import * as https from 'https';
import FieldPath = admin.firestore.FieldPath;

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

export const helloWorld = functions.region('europe-west1').https.onRequest((_request, response) => {
    response.send("Hello from Firebase!");
});

export const emailOnSubmit = functions.region('europe-west1')
    .firestore.document('TutorSearchRequests/{tutorSearchRequestID}/TutorSearchRequestContactData/{contactDataID}')
    .onCreate(async (snap, context) => {
        console.log('emailOnSubmit');

        const tutorSearchRequestSnap = await admin.firestore().collection('TutorSearchRequests')
            .doc(context.params['tutorSearchRequestID']).get();

        const createdTutorSearchRequest: any = tutorSearchRequestSnap.data();
        const createdTutorSearchRequestContactData: any = snap.data();

        console.log('createdTutorSearchRequest', createdTutorSearchRequest);
        console.log('createdTutorSearchRequestContactData', createdTutorSearchRequestContactData);

        const linkRef = uuidv4();

        await snap.ref.update({linkRef: linkRef});

        const mailOptions: Mail.Options = {
            from: `StaySmart ${functions.config().env.code} <noreply-dev@staysmart.com>`,
            to: createdTutorSearchRequestContactData.email,
            subject: createdTutorSearchRequest.subject,
            html: `<p style="font-size: 16px;">TEST https://staysmart-dev.web.app/anfragen/${linkRef}</p>
                <br />
                ${createdTutorSearchRequest.problem}`
        };

        return transporter.sendMail(mailOptions).then(() => {
            console.log(`Sent to ${createdTutorSearchRequestContactData.email}`);
        }).catch(error => {
            console.error(error);
        });

    });

export const notifySearcherOnNewOffer = functions.region('europe-west1')
    .firestore.document('TutorSearchRequests/{tutorSearchRequestID}/TutorSearchRequestOffers/{TutorSearchRequestOfferID}')
    .onCreate(async snapshot => {
        const createdTutorSearchRequestOffer: any = snapshot.data();
        const parentRef = snapshot.ref.parent.parent;
        if (parentRef) {
            const contactDataSnap = await admin.firestore()
                .doc(parentRef.path).collection('TutorSearchRequestContactData').get();

            const contactData = contactDataSnap.docs[0].data();

            // TODO mail message
            const mailOptions: Mail.Options = {
                from: `StaySmart ${functions.config().env.code} <noreply-dev@staysmart.com>`,
                to: contactData.email,
                subject: `new offer from ${createdTutorSearchRequestOffer.firstName} ${createdTutorSearchRequestOffer.lastName}`,
                html: `<p style="font-size: 16px;">TEST https://staysmart-dev.web.app/anfragen/${contactData.linkRef}</p>
                <br />`
            };

            return transporter.sendMail(mailOptions).then(() => {
                console.log(`Sent to ${contactData.email}`);
            }).catch(error => {
                console.error(error);
            });
        } else {
            console.warn('parentRef is null');
            return null;
        }

    });

// Notify Tutor on a new matching TutorSearchRequest
export const notifyTutorOnNewSearchRequest = functions.region('europe-west1')
    .firestore.document('TutorSearchRequests/{tutorSearchRequestID}')
    .onCreate(async (snap, context) => {
        const createdTutorSearchRequest: any = snap.data();
        const tutorSearchRequestID = context.params['tutorSearchRequestID'];

        console.log('createdTutorSearchRequest', createdTutorSearchRequest);

        const requestDaysAvailableList: string[] = [];

        Object.keys(createdTutorSearchRequest.daysAvailable).forEach(key => {
            if (createdTutorSearchRequest.daysAvailable[key]) {
                requestDaysAvailableList.push(key);
            }
        });

        console.log('requestDaysAvailableList', requestDaysAvailableList);

        // TODO where condition with location / city & status active
        const matchingQuery = admin.firestore().collection('Tutors')
            .where('price', '<=', createdTutorSearchRequest.budget)
            .where(`tags.subjects.${createdTutorSearchRequest.subject}`, '==', true)
            // using FieldPath because gradeLevel can contain period (.) and strings are escaped by periods
            .where(new FieldPath('tags', 'gradeLevels', createdTutorSearchRequest.gradeLevel), '==', true)
            .where('tags.daysAvailable', 'array-contains-any', requestDaysAvailableList)
        ;

        const matchingQuerySnapshot = await matchingQuery.get();

        console.log('matchingQuerySnapshot.docs', matchingQuerySnapshot.docs);

        const promises: Promise<any>[] = [];

        matchingQuerySnapshot.docs.forEach(matchingTutorDoc => {
            const matchingTutor = matchingTutorDoc.data();

            console.log('matchingTutor', matchingTutor);

            if (matchingTutor.matchingTutorSearchRequests) {
                promises.push(matchingTutorDoc.ref.update({
                    matchingTutorSearchRequests: [...matchingTutor.matchingTutorSearchRequests, tutorSearchRequestID]
                }));
            } else {
                promises.push(matchingTutorDoc.ref.update({matchingTutorSearchRequests: [tutorSearchRequestID]}));
            }

            // TODO mail message
            const mailOptions: Mail.Options = {
                from: `StaySmart ${functions.config().env.code} <noreply-dev@staysmart.com>`,
                to: matchingTutor.email,
                subject: tutorSearchRequestID,
                html: `${createdTutorSearchRequest.toString()}`
            };

            promises.push(transporter.sendMail(mailOptions)
                .then(() => {
                    console.log(`Sent to ${matchingTutor.email}`);
                }).catch(error => {
                    console.error(error);
                })
            );

        });

        return Promise.all(promises); // TODO if one of the promises fails, then all the rest of the promises fail.

    });


export const sendWhatsApp = functions.region('europe-west1').https.onRequest((_request, response) => {
    const options = {
        host: 'api.websms.com',
        path: '/rest/converged/whatsapp',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${functions.config().websms.token}`
        }
    };

    const data = JSON.stringify(
        {
            "recipientAddressList": [functions.config().websms.testmobilenumber],
            "contentCategory": "informational",
            "messageContent": "StaySmart WhatsApp Test"
        }
    );

    const req = https.request(options, res => {
        res.setEncoding('utf8');
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', chunk => {
            console.log(chunk);
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.write(data);
    req.end(() => {
        response.send('Sent');
    })

});
