import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  user

  ngOnInit() {
    this.user = {
      id: null,
      name: null,
      email: null
    }
    this.userService.getUserProfile()
      .subscribe((data) => {
        this.user = data
      })
  }

}
