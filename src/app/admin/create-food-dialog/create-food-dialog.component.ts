import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoodService } from 'src/app/services/food.service';
import { RakutenRecipeApiService } from 'src/app/services/rakuten-recipe-api.service';

@Component({
  selector: 'app-create-food-dialog',
  templateUrl: './create-food-dialog.component.html',
  styleUrls: ['./create-food-dialog.component.scss'],
})
export class CreateFoodDialogComponent implements OnInit {
  private categoryId: string;

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    categoryId: ['', Validators.required],
  });
  recipes: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      parentCategoryId: string;
      categoryId: string;
      categoryName: string;
    },
    private fb: FormBuilder,
    private rakutenRecipeApiService: RakutenRecipeApiService,
    private foodService: FoodService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateFoodDialogComponent>
  ) {}

  ngOnInit(): void {
    this.setInitialFormValue();
    this.getCategoryRanking();
  }

  private setInitialFormValue(): void {
    this.categoryId = this.data.parentCategoryId + '-' + this.data.categoryId;
    this.form.setValue({
      name: this.data.categoryName,
      image: '',
      categoryId: this.categoryId,
    });
  }

  private getCategoryRanking(): void {
    this.rakutenRecipeApiService
      .getCategoryRanking(this.categoryId)
      .then((data: any) => (this.recipes = data.result));
  }

  setFormImageValue(foodImageURL: string): void {
    this.form.patchValue({ image: foodImageURL });
  }

  submit(): void {
    const formData = this.form.value;
    this.foodService
      .createFood({
        name: formData.name,
        image: formData.image,
        categoryId: formData.categoryId,
      })
      .then(() => {
        this.snackBar.open('firestoreに追加しました！', null);
        this.dialogRef.close();
      });
  }
}
