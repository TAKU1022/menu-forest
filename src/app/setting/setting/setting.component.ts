import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;
  userId: string;
  imageChengedEvent: any = '';
  croppedImage: any = '';

  nameForm = new FormControl('', [
    Validators.required,
    Validators.maxLength(25),
  ]);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = null;
      }
    });
  }

  chengeUserName(): Promise<void> {
    const newUserName = this.nameForm.value;
    return this.userService
      .changeUserName(this.userId, newUserName)
      .then(() => {
        this.snackBar.open('変更されました', null, {
          duration: 3000,
        });
        this.nameForm.reset();
      })
      .catch(() => {
        this.snackBar.open('変更に失敗しました', null, {
          duration: 3000,
        });
      });
  }

  fileChengeEvent(event: any): void {
    this.imageChengedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }
  imageLoaded(): void {
    console.log('画像が読み込まれました');
  }
  cropperReady(sourceImageDimensions: Dimensions): void {
    console.log('操作できるようになりました', sourceImageDimensions);
  }
  loadImageFailed(selectedImage): void {
    alert('画像の読み込みに失敗しました');
    selectedImage.value = '';
    this.imageChengedEvent = '';
  }
  resetImage(selectedImage): void {
    selectedImage.value = '';
    this.imageChengedEvent = '';
    this.croppedImage = '';
  }

  chengeUserAvater(selectedImage): Promise<void> {
    return this.userService
      .changeUserAvater(this.userId, this.croppedImage)
      .then(() => {
        this.snackBar.open('変更されました', null, {
          duration: 3000,
        });
        selectedImage.value = '';
        this.imageChengedEvent = '';
      })
      .catch(() => {
        this.snackBar.open('変更に失敗しました', null, {
          duration: 3000,
        });
      });
  }
}
