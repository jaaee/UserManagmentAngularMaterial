import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddUserComponent>) { }

  addUserForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    userName: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    department: new FormControl(null, [Validators.required]),

  });
  ngOnInit() {
  }

  addUser() {

    if (this.addUserForm.invalid) {
      return true;
    }

    let requestData = {
      "firstName": this.addUserForm.value.firstName,
      "lastName": this.addUserForm.value.lastName,
      "userName": this.addUserForm.value.userName,
      "city": this.addUserForm.value.city,
      "department": this.addUserForm.value.department
    }

  let userList = JSON.parse(localStorage.getItem('userList'));
    userList.push(requestData);

    localStorage.setItem('userList', JSON.stringify(userList));

    this.dialogRef.close();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
