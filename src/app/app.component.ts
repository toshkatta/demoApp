import { Component, OnInit } from '@angular/core'
import { AuthService } from './services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  public title = 'demoapp'
  public loggedIn: boolean

  public logout() {
    this.authService.logout()
    .subscribe(resp => {
      this.router.navigate([resp.redirect])
    })
  }

  public checkIfLoggedIn() {
    this.authService.isLoggedIn().subscribe(value => {
      this.loggedIn = value
    })
  }

  ngOnInit() {
    this.checkIfLoggedIn()
  }
}
