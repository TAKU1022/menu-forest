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
  constructor(private db: AngularFirestore, private foodService: FoodService) {}

  createPost(post: Omit<Post, 'postId' | 'createdAt'>): Promise<void> {
    const postId = this.db.createId();
    return this.db.doc<Post>(`posts/${postId}`).set({
      postId,
      createdAt: firestore.Timestamp.now(),
      ...post,
    });
  }

  mergePostWithFood(post: Post): Observable<PostWithFood> {
    const dayMenus: DayMenu[] = [
      post.day.sunday,
      post.day.monday,
      post.day.tuesday,
      post.day.wednesday,
      post.day.thursday,
      post.day.friday,
      post.day.saturday,
    ];
    const dayMenuWithFoods$$: Observable<DayMenuWithFood>[] = dayMenus.map(
      (dayMenu: DayMenu) => {
        return combineLatest([
          this.foodService.getFoodById(dayMenu.breakfastId),
          this.foodService.getFoodById(dayMenu.lunchId),
          this.foodService.getFoodById(dayMenu.dinnerId),
        ]).pipe(
          map(([breakfast, lunch, dinner]) => {
            return {
              breakfast,
              lunch,
              dinner,
              dayOfWeek: '',
            };
          })
        );
      }
    );
    return combineLatest(dayMenuWithFoods$$).pipe(
      map((dayMenuWithFoods: DayMenuWithFood[]) => {
        const dayOfWeeks = ['日', '月', '火', '水', '木', '金', '土'];
        for (let i = 0; i < 7; i++) {
          dayMenuWithFoods[i].dayOfWeek = dayOfWeeks[i];
        }
        return {
          days: dayMenuWithFoods,
          createrId: post.creatorId,
          postId: post.postId,
          createdAt: post.createdAt,
        };
      })
    );
  }

  getPostWithFoodWithUsers(): Observable<PostWithFoodWithUser[]> {
    return this.db
      .collection<Post>(`posts`)
      .valueChanges()
      .pipe(
        switchMap((posts: Post[]) => {
          const postWithFoods$$: Observable<
            PostWithFood
          >[] = posts.map((post: Post) => this.mergePostWithFood(post));
          return combineLatest(postWithFoods$$);
        }),
        switchMap((postWithFoods: PostWithFood[]) => {
          const distinctUserIds: string[] = Array.from(
            new Set(
              postWithFoods.map(
                (postWithFood: PostWithFood) => postWithFood.createrId
              )
            )
          );
          const users$: Observable<User[]> = combineLatest(
            distinctUserIds.map((userId: string) => {
              return this.db.doc<User>(`users/${userId}`).valueChanges();
            })
          );
          return combineLatest([of(postWithFoods), users$]);
        }),
        map(([postWithFoods, users]) => {
          return postWithFoods.map((postWithFood: PostWithFood) => {
            return {
              ...postWithFood,
              creator: users.find(
                (user) => user.uid === postWithFood.createrId
              ),
            };
          });
        })
      );
  }
}
