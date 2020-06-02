import * as functions from 'firebase-functions';
import { addFoodIndex } from './algolia';

export const createFood = functions
  .region('asia-northeast1')
  .firestore.document(`foods/{foodId}`)
  .onCreate(async (snap, context) => {
    return addFoodIndex(snap.data());
  });
