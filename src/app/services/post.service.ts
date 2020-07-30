import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post, PostWithFood, PostWithFoodWithUser } from '@interfaces/post';
import { firestore } from 'firebase';
import { DayMenuWithFood, DayMenu } from '@interfaces/my-menu';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { FoodService } from './food.service';
import { User } from '@interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  dayOfWeeks: string[] = ['日', '月', '火', '水', '木', '金', '土'];

  constructor(private db: AngularFirestore, private foodService: FoodService) {}

  createPost(post: Omit<Post, 'postId' | 'createdAt'>): Promise<void> {
    const postId = this.db.createId();
    return this.db.doc<Post>(`posts/${postId}`).set({
      postId,
      createdAt: firestore.Timestamp.now(),
      ...post,
    });
  }
}
