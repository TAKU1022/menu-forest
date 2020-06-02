import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FoodService } from 'src/app/services/food.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    image: ['https://dummyimage.com/300x300/F0F8FF.png', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submit() {
    const formData = this.form.value;
    this.foodService
      .createFood({
        name: formData.name,
        image: formData.image,
        recipe: 'a',
      })
      .then(() => {
        this.form.controls.name.reset();
      })
      .then(() => {
        this.snackBar.open('firestoreに追加しました！', null, {
          duration: 3000,
        });
      });
  }
}
