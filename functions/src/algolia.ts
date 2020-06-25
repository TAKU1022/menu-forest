import * as functions from 'firebase-functions';
import algoliasearch, { SearchIndex } from 'algoliasearch';

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const foodIndex: SearchIndex = client.initIndex('foods');

const addFoodRecords = (food: any) => {
  const records = food.recipe
    .match(/[\s\S]{1,500}/gm)
    .map((recipe: any, i: number) => {
      return {
        ...food,
        objectID: food.foodId + '-' + i,
        recipe,
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
    objectID: data.foodId,
    recipe: data.recipe,
  };
  if (food.recipe && food.recipe.length > 500) {
    return addFoodRecords(food);
  } else {
    return foodIndex.saveObject(food);
  }
};
