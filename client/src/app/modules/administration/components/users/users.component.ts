import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public userService: UserService) { }
  public userList: any = [];
  public pageSize: number = 10;
  public totalItem: number;
  public page : any = 1 ; 
  public title :any ="liste des utilisateurs"
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.pageSize, this.page).subscribe((data:any) => {
       this.totalItem = data.totalItem ;
       this.userList = data.users ; 
    }, error => {
      console.log("===error===", error);
    })
  }

}
