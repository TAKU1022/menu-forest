import { Component, OnInit } from '@angular/core';
import { RakutenRecipeApiService } from 'src/app/services/rakuten-recipe-api.service';
import { TitleService } from 'src/app/services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateFoodDialogComponent } from '../create-food-dialog/create-food-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  categories: any[];

  constructor(
    private rakutenRecipeApiService: RakutenRecipeApiService,
    private titleService: TitleService,
    private dialog: MatDialog
  ) {
    this.titleService.setTitle('管理者画面');
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  private getCategoryList() {
    this.rakutenRecipeApiService
      .getCategoryList()
      .then((data: any) => (this.categories = data.result.medium));
  }

  openCreateFoodDialog(
    parentCategoryId: string,
    categoryId: string,
    categoryName: string
  ): void {
    this.dialog.open(CreateFoodDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: {
        parentCategoryId,
        categoryId,
        categoryName,
      },
    });
  }
}
