import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private _date: DatePipe) {}

  ngOnInit(): void {
    this.createAddForm();
    this.createUpdateForm();
  }

  addForm: FormGroup = new FormGroup({});
  updateForm: FormGroup = new FormGroup({});
  isUpdateFormActive: boolean = false;
  updateIndex: number = 0;
  employee: Employee[] = [];

  createAddForm() {
    this.addForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      startDate: new FormControl(this._date.transform(new Date(), "yyyy-MM-dd")),
      proffesion: new FormControl("", [Validators.required, Validators.minLength(3)])
    });
  }

  save() {
    if (this.addForm.valid) {
      this.employee.push(this.addForm.value);
      this.addForm.reset();
    }
  }

  createUpdateForm() {
    this.updateForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      proffesion: new FormControl("", [Validators.required, Validators.minLength(3)])
    });
  }

  get(item: any, index: number) {
    this.addForm.patchValue({
      name: item.name,
      proffesion: item.proffesion,
      startDate: item.startDate
    });
    this.isUpdateFormActive = true;
    this.updateIndex = index;
  }

  cancel() {
    this.isUpdateFormActive = false;
  }

  update() {
    if (this.updateForm.valid) {
      this.employee[this.updateIndex] = this.updateForm.value;
      this.cancel();
    }
  }
}

class Employee {
  name: string = "";
  startDate: string = "";
  proffesion: string = "";
}
