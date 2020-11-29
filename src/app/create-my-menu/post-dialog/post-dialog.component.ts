import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DayMenuWithFood, MyMenu } from '@interfaces/my-menu';
import { User } from '@interfaces/user';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent implements OnInit {
  private userId: string = this.authService.userId;

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(25)]],
    dayOfWeeks: this.fb.array([]),
  });
  postData$: Observable<{
    title: string;
    thumbnailURLs: string[];
  }> = this.form.valueChanges.pipe(
    map((postData: { title: string; dayOfWeeks: string[] }) => {
      const thumbnailURLs: string[] = postData.dayOfWeeks.map(
        (dayOfWeek: string, index: number) => {
          switch (dayOfWeek) {
            case 'breakfast':
              return this.data.weekMenu[index].breakfast.image;
            case 'lunch':
              return this.data.weekMenu[index].lunch.image;
            case 'dinner':
              return this.data.weekMenu[index].dinner.image;
          }
        }
      );
      return {
        title: postData.title,
        thumbnailURLs,
      };
    })
  );
  user$: Observable<User> = this.authService.user$;
  today: Date = new Date();

  get titleControl(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get dayOfWeeksFormArray(): FormArray {
    return this.form.get('dayOfWeeks') as FormArray;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      weekMenu: DayMenuWithFood[];
      myMenu: MyMenu;
    },
    private fb: FormBuilder,
    private postService: PostService,
    private snackBar: MatSnackBar,
    private myMenuService: MyMenuService,
    private userService: UserService,
    private dialogRef: MatDialogRef<PostDialogComponent>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setFormArrayControls();
    this.setDayOfWeeksFormArrayValue();
  }

  private setFormArrayControls(): void {
    new Array(7).fill(null).forEach(() => {
      this.dayOfWeeksFormArray.push(
        this.fb.control([
          '',
          [Validators.required, Validators.pattern(/breakfast|lunch|dinner/)],
        ])
      );
    });
  }

  private setDayOfWeeksFormArrayValue(): void {
    const initialValue: string[] = new Array(7).fill('lunch');
    this.dayOfWeeksFormArray.setValue(initialValue);
  }

  private increasedUserPostCount(): void {
    this.user$
      .pipe(take(1))
      .toPromise()
      .then((user: User) => {
        const increasedPostCount: number = ++user.postCount;
        this.userService.changeUserPostCount(this.userId, increasedPostCount);
      });
  }

  createPost(): void {
    const formData: { title: string; dayOfWeeks: string[] } = this.form.value;
    const thumbnailURLs: string[] = formData.dayOfWeeks.map(
      (dayOfWeek: string, index: number) => {
        switch (dayOfWeek) {
          case 'breakfast':
            return this.data.weekMenu[index].breakfast.image;
          case 'lunch':
            return this.data.weekMenu[index].lunch.image;
          case 'dinner':
            return this.data.weekMenu[index].dinner.image;
        }
      }
    );
    this.postService
      .createPost({
        day: this.data.myMenu.day,
        creatorId: this.userId,
        myMenuId: this.data.myMenu.myMenuId,
        title: formData.title,
        thumbnailURLs,
      })
      .then(() => {
        this.snackBar.open('投稿に成功しました！', null);
        this.dialogRef.close();
        this.increasedUserPostCount();
        if (!this.data.myMenu.isPosted) {
          this.myMenuService.changeMyMenuIsPosted(
            this.data.myMenu.myMenuId,
            true
          );
        }
      });
  }
}
