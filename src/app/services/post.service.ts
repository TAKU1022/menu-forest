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
        dayMenuWithFoods.forEach(
          (dayMenuWithFood: DayMenuWithFood, i: number) => {
            dayMenuWithFood.dayOfWeek = dayOfWeeks[i];
          }
        );
        return {
          days: dayMenuWithFoods,
          creatorId: post.creatorId,
          postId: post.postId,
          createdAt: post.createdAt,
          title: post.title,
          thumbnailURLs: post.thumbnailURLs,
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

  getPostFoodsWithUser(
    lastPost: firestore.QueryDocumentSnapshot<firestore.DocumentData>
  ): Observable<{
    postsWithFoodWithUser: PostWithFoodWithUser[];
    lastPostDocument: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
  }> {
    let lastPostDocument: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
    return this.db
      .collection<Post>(`posts`, (ref) => {
        if (lastPost) {
          return ref.startAfter(lastPost).limit(6);
        } else {
          return ref.limit(6);
        }
      })
      .get({ source: 'server' })
      .pipe(
        switchMap((snap: firestore.QuerySnapshot<firestore.DocumentData>) => {
          if (snap) {
            lastPostDocument = snap.docs[snap.docs?.length - 1];
            const postWithFoods$$: Observable<PostWithFood>[] = snap.docs.map(
              (
                doc: firestore.QueryDocumentSnapshot<firestore.DocumentData>
              ) => {
                const post: Post = doc.data() as Post;
                return this.mergePostWithFood(post);
              }
            );
            return combineLatest(postWithFoods$$);
          } else {
            return of(null);
          }
        }),
        switchMap((postWithFoods: PostWithFood[] | null) => {
          if (postWithFoods) {
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
          } else {
            return null;
          }
        }),
        map(([postWithFoods, users]) => {
          const postsWithFoodWithUser: PostWithFoodWithUser[] = postWithFoods?.map(
            (postWithFood: PostWithFood) => {
              return {
                ...postWithFood,
                creator: users.find(
                  (user: User) => user.uid === postWithFood.creatorId
                ),
              };
            }
          );
          return {
            postsWithFoodWithUser,
            lastPostDocument,
          };
        })
      );
  }

  getUserPosts(
    userId: string,
    lastPost: firestore.QueryDocumentSnapshot<firestore.DocumentData>
  ): Observable<{
    postsWithFoodWithUser: PostWithFoodWithUser[];
    lastPostDocument: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
  } | null> {
    let lastPostDocument: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
    return this.db
      .collection<Post>('posts', (ref) => {
        const posts = ref.where('creatorId', '==', userId);
        if (lastPost) {
          return posts.startAfter(lastPost).limit(6);
        } else {
          return posts.limit(6);
        }
      })
      .get({ source: 'server' })
      .pipe(
        switchMap((snap: firestore.QuerySnapshot<firestore.DocumentData>) => {
          if (snap) {
            lastPostDocument = snap.docs[snap.docs?.length - 1];
            const postWithFoods$$: Observable<PostWithFood>[] = snap.docs.map(
              (
                doc: firestore.QueryDocumentSnapshot<firestore.DocumentData>
              ) => {
                const post: Post = doc.data() as Post;
                return this.mergePostWithFood(post);
              }
            );
            return combineLatest(postWithFoods$$);
          } else {
            return of(null);
          }
        }),
        switchMap((postWithFoods: PostWithFood[] | null) => {
          if (postWithFoods) {
            const users$: Observable<User[]> = combineLatest(
              postWithFoods.map((postWithFood: PostWithFood) => {
                return this.userService.getUserbyId(postWithFood.creatorId);
              })
            );
            return combineLatest([of(postWithFoods), users$]);
          } else {
            return of(null);
          }
        }),
        map(([postWithFoods, users]) => {
          const postsWithFoodWithUser: PostWithFoodWithUser[] = postWithFoods.map(
            (postWithFood: PostWithFood) => {
              return {
                ...postWithFood,
                creator: users.find(
                  (user: User) => user.uid === postWithFood.creatorId
                ),
              };
            }
          );
          return {
            postsWithFoodWithUser,
            lastPostDocument,
          };
        })
      );
  }

  getPostFoodWithUserByPostId(
    postId: string
  ): Observable<PostWithFoodWithUser> {
    return this.getPostWithFoodById(postId).pipe(
      switchMap((postWithFood: PostWithFood) => {
        const user$: Observable<User> = this.userService.getUserbyId(
          postWithFood.creatorId
        );
        return combineLatest([of(postWithFood), user$]);
      }),
      map(([postWithFood, user]) => {
        return {
          ...postWithFood,
          creator: user,
        };
      })
    );
  }

  deletePost(postId: string): Promise<void> {
    return this.db.doc<Post>(`posts/${postId}`).delete();
  }
}
