import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { MyMenu } from './interfaces/my-menu';

const db = admin.firestore();

export const createMyMenu = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}')
  .onCreate((snap) => {
    const myMenuId = db.collection('_').doc().id;
    const user = snap.data();
    const myMenu: MyMenu = {
      day: {
        sunday: {
          breakfastId: 'x9NG4W2UszkR9OTyIQVA',
          lunchId: 'vbqOYT4xZ3ayvVUOlZNY',
          dinnerId: 'xbgklx44jyJkf4Mq1EAt',
        },
        monday: {
          breakfastId: 'v6EUHFaeGUK6pzCCBaNk',
          lunchId: 'lljtLGyTn3SoGcbBnPNV',
          dinnerId: 'kCiUG4BZyOz965NKnZoJ',
        },
        tuesday: {
          breakfastId: 'gy8PbDOFzrlIq5dUJ0Np',
          lunchId: 'cheWhVhqONyM6AzxlPtj',
          dinnerId: 'bIs8knD7shTA7elQ63Ek',
        },
        wednesday: {
          breakfastId: 'Xny0HZJQlnGUtUm1iSfU',
          lunchId: 'VOfYApNqr181tKaLX6Xf',
          dinnerId: 'UvUETlhRkbZQYBKHlDAh',
        },
        thursday: {
          breakfastId: 'PpIAaTyu3Q4lUAaZxMNV',
          lunchId: 'OTdo6AF05nn5JF3Wjl5W',
          dinnerId: 'MeEdKrl74JOPZAvsMl9N',
        },
        friday: {
          breakfastId: 'LylTGN76B3U8Q0iCG1M9',
          lunchId: 'LD1B5MgYr3rAxtHPVt4b',
          dinnerId: 'JIh31DrbPidiMIsMRfms',
        },
        saturday: {
          breakfastId: 'H3YfcGHXcFBVNmuzycAE',
          lunchId: '8iijz9TIAD5OVJcyYCuk',
          dinnerId: '6s6NlUxvrNkuREb2gy13',
        },
      },
      creatorId: user.uid,
      myMenuId: myMenuId,
      isPosted: false,
    };
    return db.doc(`myMenus/${myMenuId}`).set(myMenu);
  });
