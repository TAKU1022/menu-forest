import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post, PostWithFood, PostWithFoodWithUser } from '@interfaces/post';
import { firestore } from 'firebase';
import { DayMenuWithFood, DayMenu } from '@interfaces/my-menu';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { FoodService } from './food.service';
import { User } from '@interfaces/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private db: AngularFirestore,
    private foodService: FoodService,
    private userService: UserService
  ) {}

  createPost(post: Omit<Post, 'postId' | 'createdAt'>): Promise<void> {
    const postId = this.db.createId();
    return this.db.doc<Post>(`posts/${postId}`).set({
      postId,
      createdAt: firestore.Timestamp.now(),
      ...post,
    });
  }

  getPostById(postId: string): Observable<Post> {
    return this.db.doc<Post>(`posts/${postId}`).valueChanges();
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
          creatorId: post.creatorId,
          postId: post.postId,
          createdAt: post.createdAt,
        };
      })
    );
  }

  getPostWithFoodById(postId: string): Observable<PostWithFood | null> {
    return this.db
      .doc<Post>(`posts/${postId}`)
      .valueChanges()
      .pipe(
        switchMap((post: Post) => {
          if (post) {
            return this.mergePostWithFood(post);
          } else {
            return of(null);
          }
        })
      );
  }

  getPostsWithFoodWithUser(): Observable<PostWithFoodWithUser[]> {
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
                (postWithFood: PostWithFood) => postWithFood.creatorId
              )
            )
          );
          const users$: Observable<User[]> = combineLatest(
            distinctUserIds.map((userId: string) => {
              return this.userService.getUserbyId(userId);
            })
          );
          return combineLatest([of(postWithFoods), users$]);
        }),
        map(([postWithFoods, users]) => {
          return postWithFoods.map((postWithFood: PostWithFood) => {
            return {
              ...postWithFood,
              creator: users.find(
                (user: User) => user.uid === postWithFood.creatorId
              ),
            };
          });
        })
      );
  }

  getPostsByUserId(userId: string): Observable<Post[]> {
    return this.db
      .collection<Post>('posts', (ref) => {
        return ref.where('creatorId', '==', userId);
      })
      .valueChanges();
  }

  getUserPosts(userId: string): Observable<PostWithFoodWithUser[]> {
    return this.getPostsByUserId(userId).pipe(
      switchMap((posts: Post[]) => {
        const postWithFood$$: Observable<
          PostWithFood
        >[] = posts.map((post: Post) => this.mergePostWithFood(post));
        return combineLatest(postWithFood$$);
      }),
      switchMap((postWithFoods: PostWithFood[]) => {
        const users$: Observable<User[]> = combineLatest(
          postWithFoods.map((postWithFood: PostWithFood) => {
            return this.userService.getUserbyId(postWithFood.creatorId);
          })
        );
        return combineLatest([of(postWithFoods), users$]);
      }),
      map(([postWithFoods, users]) => {
        return postWithFoods.map((postWithFood: PostWithFood) => {
          return {
            ...postWithFood,
            creator: users.find(
              (user: User) => user.uid === postWithFood.creatorId
            ),
          };
        });
      })
    );
  }

  deletePost(postId: string): Promise<void> {
    return this.db.doc<Post>(`posts/${postId}`).delete();
  }
}
