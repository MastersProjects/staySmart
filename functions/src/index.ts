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
import {newMatchingRequestTemplate} from './email-templates/new-matching-request';
import {tutorActivatedTemplate} from './email-templates/tutor-activated';
import {tutorVerifiedTemplate} from './email-templates/tutor-verified';
import {getDistanceFromLatLonInKm} from './location-helper';

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

export const helloWorld = functions.region('europe-west6').https.onRequest((_request, response) => {
    response.send("Hello from Firebase!");
});

/**
 * Notify Searcher by E-Mail on receiving their SearchTutorRequest
 */
export const notifySearcherOnRequestReceived = functions.region('europe-west6')
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
export const notifySearcherOnNewOffer = functions.region('europe-west6')
    .firestore.document('TutorSearchRequests/{tutorSearchRequestID}/TutorSearchRequestOffers/{TutorSearchRequestOfferID}')
    .onCreate(async snapshot => {
        const createdTutorSearchRequestOffer: any = snapshot.data();
        const parentRef = snapshot.ref.parent.parent;
        if (parentRef) {
            const contactDataSnap = await admin.firestore().doc(parentRef.path)
                .collection('TutorSearchRequestContactData').get();

            const contactData: any = contactDataSnap.docs[0].data();

            const {firstName, lastName} = createdTutorSearchRequestOffer.tutorSearchRequest.tutorSearchRequestData;

            const templatedEmail = handlebars.compile(newOfferTemplate)({
                searcherName: `${firstName} ${lastName}`,
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
export const notifyTutorOnAcceptedOffer = functions.region('europe-west6')
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
                searcherMobileNumber: `+41${updatedTutorSearchRequestOffer.tutorSearchRequest.tutorSearchRequestContactData.phoneNumber}`
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

/**
 * Notify Tutor by E-Mail on new matching TutorSearchRequest
 */
export const notifyTutorOnNewMatchingRequest = functions.region('europe-west6')
    .firestore.document('TutorSearchRequests/{tutorSearchRequestID}')
    .onCreate(async (snap, context) => {
        const createdTutorSearchRequest: any = snap.data();
        const tutorSearchRequestID = context.params['tutorSearchRequestID'];

        const requestDaysAvailableList: string[] = Object.keys(createdTutorSearchRequest.daysAvailable)
            .filter(key => createdTutorSearchRequest.daysAvailable[key]);

        const matchingQuery = admin.firestore().collection('Tutors')
            .where('price', '<=', createdTutorSearchRequest.budget)
            .where('status', '==', 'activated')
            .where('tags.daysAvailable', 'array-contains-any', requestDaysAvailableList)
        ;

        const matchingQuerySnapshot = await matchingQuery.get();

        const promises: Promise<any>[] = [];

        matchingQuerySnapshot.docs
            .filter(matchingTutorDoc => {
                const matchingTutor = matchingTutorDoc.data();
                const distance = getDistanceFromLatLonInKm(
                    matchingTutor.location.lat,
                    matchingTutor.location.lon,
                    createdTutorSearchRequest.location.lat,
                    createdTutorSearchRequest.location.lon,
                );
                return distance <= 10
                    && matchingTutor.gradeLevels.includes(createdTutorSearchRequest.gradeLevel)
                    && matchingTutor.subjects.includes(createdTutorSearchRequest.subject);
            })
            .forEach(matchingTutorDoc => {
                const matchingTutor = matchingTutorDoc.data();

                if (matchingTutor.matchingTutorSearchRequests) {
                    promises.push(matchingTutorDoc.ref.update({
                        matchingTutorSearchRequests: [...matchingTutor.matchingTutorSearchRequests, tutorSearchRequestID]
                    }));
                } else {
                    promises.push(matchingTutorDoc.ref.update({matchingTutorSearchRequests: [tutorSearchRequestID]}));
                }

                const templatedEmail = handlebars.compile(newMatchingRequestTemplate)({
                    tutorName: matchingTutor.firstName
                });

                const mailOptions: Mail.Options = {
                    from: `StaySmart ${functions.config().env.code} ${functions.config().smtp.user}`,
                    to: matchingTutor.email,
                    subject: 'Neue Nachhilfeanfrage!',
                    html: templatedEmail
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

/**
 * Send Tutor Activated E-Mail
 */
export const sendTutorActivatedEmail = functions.region('europe-west6').https.onCall((data, _context) => {
    const {tutorName, tutorEmail} = data;

    const templatedEmail = handlebars.compile(tutorActivatedTemplate)({tutorName});

    const mailOptions: Mail.Options = {
        from: `StaySmart ${functions.config().env.code} ${functions.config().smtp.user}`,
        to: tutorEmail,
        subject: 'Dein Konto wurde aktiviert.',
        html: templatedEmail
    };

    return transporter.sendMail(mailOptions).then(() => {
        console.log(`Sent to ${tutorEmail}`);
    }).catch(error => {
        console.error(error);
    });
});

/**
 * Send Tutor Verified E-Mail
 */
export const sendTutorVerifiedEmail = functions.region('europe-west6').https.onCall((data, _context) => {
    const {tutorName, tutorEmail} = data;

    const templatedEmail = handlebars.compile(tutorVerifiedTemplate)({tutorName});

    const mailOptions: Mail.Options = {
        from: `StaySmart ${functions.config().env.code} ${functions.config().smtp.user}`,
        to: tutorEmail,
        subject: 'Dein Konto wurde verifiziert.',
        html: templatedEmail
    };

    return transporter.sendMail(mailOptions).then(() => {
        console.log(`Sent to ${tutorEmail}`);
    }).catch(error => {
        console.error(error);
    });
});

/**
 * Grant Admin Role on create Admins Collection
 */
export const grantAdminRoleOnCreateAdmin = functions.region('europe-west6')
    .firestore.document('Admins/{uid}')
    .onCreate(async (_snap, context) => {
        const user = await admin.auth().getUser(context.params['uid']);
        if (!(user?.customClaims as any)?.isAdmin) {
            console.log('grant admin to', user.email);
            return admin.auth().setCustomUserClaims(user.uid, {isAdmin: true});
        } else {
            return null;
        }
    });


export const sendWhatsApp = functions.region('europe-west6').https.onRequest((_request, response) => {
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
