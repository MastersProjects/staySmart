import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import {v4 as uuidv4} from 'uuid';
import * as https from 'https';
import * as handlebars from 'handlebars';
import {requestReceivedTemplate} from './email-templates/request-received';
import {newOfferTemplate} from './email-templates/new-offer';
import {offerAcceptedTemplate} from './email-templates/offer-accepted';
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

/**
 * Notify Searcher by E-Mail on receiving their SearchTutorRequest
 */
export const notifySearcherOnRequestReceived = functions.region('europe-west1')
    .firestore.document('TutorSearchRequests/{tutorSearchRequestID}/TutorSearchRequestContactData/{contactDataID}')
    .onCreate(async (snap, context) => {

        const tutorSearchRequestSnap = await admin.firestore().collection('TutorSearchRequests')
            .doc(context.params['tutorSearchRequestID']).get();

        const createdTutorSearchRequest: any = tutorSearchRequestSnap.data();
        const createdTutorSearchRequestContactData: any = snap.data();

        const linkRef = uuidv4();

        await snap.ref.update({linkRef: linkRef});

        const templatedEmail = handlebars.compile(requestReceivedTemplate)({
            searcherName: `${createdTutorSearchRequest.firstName} ${createdTutorSearchRequest.lastName}`,
            requestLink: `${functions.config().emailtemplate.requestlink}/${linkRef}`
        });

        const mailOptions: Mail.Options = {
            from: `StaySmart ${functions.config().env.code} ${functions.config().smtp.user}`,
            to: createdTutorSearchRequestContactData.email,
            subject: 'Wir haben Ihre Nachhilfeanfrage erhalten.',
            html: templatedEmail
        };

        return transporter.sendMail(mailOptions).then(() => {
            console.log(`Sent to ${createdTutorSearchRequestContactData.email}`);
        }).catch(error => {
            console.error(error);
        });

    });

/**
 * Notify Searcher by E-Mail on new SearchTutorRequestOffer for their SearchTutorRequest
 */
export const notifySearcherOnNewOffer = functions.region('europe-west1')
    .firestore.document('TutorSearchRequests/{tutorSearchRequestID}/TutorSearchRequestOffers/{TutorSearchRequestOfferID}')
    .onCreate(async snapshot => {
        const createdTutorSearchRequestOffer: any = snapshot.data();
        const parentRef = snapshot.ref.parent.parent;
        if (parentRef) {
            const searchRequestSnap = await admin.firestore().doc(parentRef.path).get();
            const contactDataSnap = await admin.firestore().doc(parentRef.path)
                .collection('TutorSearchRequestContactData').get();

            const searchRequestData: any = searchRequestSnap.data();
            const contactData: any = contactDataSnap.docs[0].data();

            const templatedEmail = handlebars.compile(newOfferTemplate)({
                searcherName: `${searchRequestData.firstName} ${searchRequestData.lastName}`,
                requestLink: `${functions.config().emailtemplate.requestlink}/${contactData.linkRef}`,
                tutorName: `${createdTutorSearchRequestOffer.firstName} ${createdTutorSearchRequestOffer.lastName}`
            });

            const mailOptions: Mail.Options = {
                from: `StaySmart ${functions.config().env.code} ${functions.config().smtp.user}`,
                to: contactData.email,
                subject: 'Sie haben eine neue Offerte erhalten.',
                html: templatedEmail
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

/**
 * Notify Tutor by E-Mail on Searcher accepting their SearchTutorRequestOffer
 */
export const notifyTutorOnAcceptedOffer = functions.region('europe-west1')
    .firestore.document('TutorSearchRequests/{tutorSearchRequestID}/TutorSearchRequestOffers/{TutorSearchRequestOfferID}')
    .onUpdate(async snapshot => {
        const updatedTutorSearchRequestOffer: any = snapshot.after.data();

        if (updatedTutorSearchRequestOffer.status === 'accepted') {
            const tutorSnap = await admin.firestore()
                .collection('Tutors').doc(updatedTutorSearchRequestOffer.uid).get();

            const tutor: any = tutorSnap.data();

            const templatedEmail = handlebars.compile(offerAcceptedTemplate)({
                tutorName: tutor.firstName,
                searcherEmail: updatedTutorSearchRequestOffer.tutorSearchRequest.tutorSearchRequestContactData.email,
                searcherMobileNumber: updatedTutorSearchRequestOffer.tutorSearchRequest.tutorSearchRequestContactData.phoneNumber
            });

            const mailOptions: Mail.Options = {
                from: `StaySmart ${functions.config().env.code} ${functions.config().smtp.user}`,
                to: tutor.email,
                subject: 'Deine Offerte wurde angenommen.',
                html: templatedEmail
            };

            return transporter.sendMail(mailOptions).then(() => {
                console.log(`Sent to ${tutor.email}`);
            }).catch(error => {
                console.error(error);
            });

        } else {
            console.log('ignoring because it got declined');
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
                from: `StaySmart ${functions.config().env.code} ${functions.config().smtp.user}`,
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
