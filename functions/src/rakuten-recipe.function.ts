import * as functions from 'firebase-functions';

const fetch = require('node-fetch');
const rakutenRecipeId: string = functions.config().rakuten.id;

export const getCategoryList = functions
  .region('asia-northeast1')
  .https.onCall(async () => {
    const body = { applicationId: rakutenRecipeId };
    const res = await fetch(
      'https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426',
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const json = await res.json();
    return json;
  });

export const getCategoryRanking = functions
  .region('asia-northeast1')
  .https.onCall(async (categoryId: string) => {
    const body = {
      applicationId: rakutenRecipeId,
      categoryId,
    };
    const res = await fetch(
      'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426',
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const json = await res.json();
    return json;
  });
