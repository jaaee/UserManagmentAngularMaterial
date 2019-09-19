import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

import { AddUserComponent } from "./../add-user/add-user.component";

import { UserService } from "./../user.service";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['firstName', 'lastName', 'userName', 'city', 'department'];
  userDataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private _userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList(){
    if(JSON.parse(localStorage.getItem('userList')) && JSON.parse(localStorage.getItem('userList')).length > 0)
    {
      let userList = JSON.parse(localStorage.getItem('userList'));
      this.userDataSource = new MatTableDataSource(userList);
        this.userDataSource.sort = this.sort;
        this.userDataSource.paginator = this.paginator;
    }
    else
    {
      this._userService.getUserList().subscribe(res => {
        this.userDataSource = new MatTableDataSource(res);
        this.userDataSource.sort = this.sort;
        this.userDataSource.paginator = this.paginator;
        let userList = JSON.stringify(res);
        localStorage.setItem('userList', userList);
      });
    }
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getUserList();
    });
  }

}
