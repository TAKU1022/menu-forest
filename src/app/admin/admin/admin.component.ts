import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from 'src/app/services/food.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RakutenRecipeApiService } from 'src/app/services/rakuten-recipe-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    categoryId: ['', Validators.required],
  });
  categories: any[];
  recipes: any[];

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private snackBar: MatSnackBar,
    private rakutenRecipeApiService: RakutenRecipeApiService
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
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
        this.form.reset();
      });
  }

  private getCategoryList() {
    this.rakutenRecipeApiService
      .getCategoryList()
      .then((data: any) => (this.categories = data.result.medium));
  }

  getCategoryRanking(categoryId: string) {
    this.rakutenRecipeApiService
      .getCategoryRanking(categoryId)
      .then((data: any) => (this.recipes = data.result));
  }
}
