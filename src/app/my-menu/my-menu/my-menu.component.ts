import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['./my-menu.component.scss'],
})
export class MyMenuComponent implements OnInit {
  form = this.fb.array([]);
  days = ['日', '月', '火', '水', '木', '金', '土'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    new Array(7).fill(null).forEach(() => {
      this.form.push(
        this.fb.group({
          breakfast: ['', Validators.required],
          lunch: ['', Validators.required],
          dinner: ['', Validators.required],
        })
      );
    });
  }

  formContorol(menu: string) {
    return this.form.get(`${menu}`) as FormControl;
  }

  submit() {
    console.log(this.form.value);
  }
}
