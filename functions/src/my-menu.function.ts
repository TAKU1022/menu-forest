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
    const myMenuConfig = functions.config().mymenu;
    const myMenu: MyMenu = {
      day: {
        sunday: {
          breakfastId: myMenuConfig.sunday.breakfast,
          lunchId: myMenuConfig.sunday.lunch,
          dinnerId: myMenuConfig.sunday.dinner,
        },
        monday: {
          breakfastId: myMenuConfig.monday.breakfast,
          lunchId: myMenuConfig.monday.lunch,
          dinnerId: myMenuConfig.monday.dinner,
        },
        tuesday: {
          breakfastId: myMenuConfig.tuesday.breakfast,
          lunchId: myMenuConfig.tuesday.lunch,
          dinnerId: myMenuConfig.tuesday.dinner,
        },
        wednesday: {
          breakfastId: myMenuConfig.wednesday.breakfast,
          lunchId: myMenuConfig.wednesday.lunch,
          dinnerId: myMenuConfig.wednesday.dinner,
        },
        thursday: {
          breakfastId: myMenuConfig.thursday.breakfast,
          lunchId: myMenuConfig.thursday.lunch,
          dinnerId: myMenuConfig.thursday.dinner,
        },
        friday: {
          breakfastId: myMenuConfig.friday.breakfast,
          lunchId: myMenuConfig.friday.lunch,
          dinnerId: myMenuConfig.friday.dinner,
        },
        saturday: {
          breakfastId: myMenuConfig.saturday.breakfast,
          lunchId: myMenuConfig.saturday.lunch,
          dinnerId: myMenuConfig.saturday.dinner,
        },
      },
      creatorId: user.uid,
      myMenuId: myMenuId,
    };
    return db.doc(`myMenus/${myMenuId}`).set(myMenu);
  });
