import * as functions from 'firebase-functions';
import algoliasearch, { SearchIndex } from 'algoliasearch';

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const indexName = functions.config().algolia.index_name;
const foodIndex: SearchIndex = client.initIndex(indexName);

const addFoodRecords = (food: any) => {
  const records = food.image
    .match(/[\s\S]{1,500}/gm)
    .map((image: any, i: number) => {
      return {
        ...food,
        objectID: food.foodId + '-' + i,
        image,
      };
    });
  return Promise.all(
    records.map((record: any) => foodIndex.saveObject(record))
  );
};

export const addFoodIndex = (data: any) => {
  const food = {
    name: data.name,
    image: data.image,
    foodId: data.foodId,
    categoryId: data.categoryId,
    objectID: data.foodId,
  };
  if (food.image && food.image.length > 500) {
    return addFoodRecords(food);
  } else {
    return foodIndex.saveObject(food);
  }
};
