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
          breakfastId: '06hTLHibydomuKggmCzB',
          lunchId: '0Mf78jXWWqrEUMdexNp8',
          dinnerId: '11LZesjqIzHYTQAO1ngZ',
        },
        monday: {
          breakfastId: '1Vn4hGcnbpWmtprtQrFa',
          lunchId: '2A7mhRONmZlXgeqcJusG',
          dinnerId: '2cYUhyiRVlObgEO6UUQv',
        },
        tuesday: {
          breakfastId: '30Cf56r7USQMdgXu5i96',
          lunchId: '59iSx68XE2cVibSJNqzo',
          dinnerId: '5DkoBGU2VYpWpudccdyT',
        },
        wednesday: {
          breakfastId: '5f7vQd6b9TriRcubUO5R',
          lunchId: '6DFPn1qpP2V7NoZOw5qR',
          dinnerId: '6E09xOrRuig14rM9bdnW',
        },
        thursday: {
          breakfastId: '6sGOXtkAsg5ZmTlllDGV',
          lunchId: '76ZB0MGg83gKxlBHTFTs',
          dinnerId: '84NtUMX2G0bdFcbyUfrS',
        },
        friday: {
          breakfastId: '8DU6xqisCPRVELAVdmeZ',
          lunchId: '7zNVuEU005trxmTlp0Ok',
          dinnerId: '8RpxMnRhehbR6mKDVVvv',
        },
        saturday: {
          breakfastId: '9vHoo8RGFF77TO7A6JJb',
          lunchId: 'BYm5wRiljkPm0upfXAvy',
          dinnerId: 'xm0fcyyZge7MjZe0ccHi',
        },
      },
      creatorId: user.uid,
      myMenuId: myMenuId,
    };
    return db.doc(`myMenus/${myMenuId}`).set(myMenu);
  });
