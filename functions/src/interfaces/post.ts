import { DayMenu, DayMenuWithFood } from './my-menu';
import { firestore } from 'firebase-admin';
import { User } from './user';

export interface Post {
  day: {
    sunday: DayMenu;
    monday: DayMenu;
    tuesday: DayMenu;
    wednesday: DayMenu;
    thursday: DayMenu;
    friday: DayMenu;
    saturday: DayMenu;
  };
  creatorId: string;
  myMenuId: string;
  postId: string;
  createdAt: firestore.Timestamp;
}

export interface PostWithFood {
  days: DayMenuWithFood[];
  creatorId: string;
  postId: string;
  createdAt: firestore.Timestamp;
}

export interface PostWithFoodWithUser extends PostWithFood {
  creator: User;
}
