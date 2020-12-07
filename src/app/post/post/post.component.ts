import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostWithFoodWithUser } from '@interfaces/post';
import { take, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { firestore } from 'firebase';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  private lastPostDocument: firestore.QueryDocumentSnapshot<
    firestore.DocumentData
  >;
  private isInitial = true;

  posts: PostWithFoodWithUser[] = [];
  isGotPosts = false;
  isLoading: boolean;

  constructor(
    private postService: PostService,
    private loadingService: LoadingService,
    private titleService: TitleService
  ) {
    this.loadingService.toggleLoading(true);
    this.titleService.setTitle('みんなの献立');
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService
      .getPostsWithFoodWithUser(this.lastPostDocument)
      .pipe(
        take(1),
        tap(() =>
          this.isInitial ? (this.isLoading = false) : (this.isLoading = true)
        )
      )
      .toPromise()
      .then(({ postsWithFoodWithUser, lastPostDocument }) => {
        if (this.isInitial) {
          this.loadingService.toggleLoading(false);
          this.isGotPosts = true;
        }
        setTimeout(
          () => {
            this.posts.push(...postsWithFoodWithUser);
            this.lastPostDocument = lastPostDocument;
            this.isInitial = false;
            this.isLoading = false;
          },
          this.isInitial ? 0 : 1500
        );
      })
      .catch(() => (this.isLoading = false));
  }
}
