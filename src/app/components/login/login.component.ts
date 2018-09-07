import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms'

import { UserService } from '../../services/user.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  private apiError

  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit() {
    const name = this.name.value.trim()
    const password = this.password.value.trim()

    if (!name || !password) return

    this.authService.login(name, password)
      .subscribe(
        resp => {
          if (resp.msg) {
            this.apiError = resp.msg
          } else {
            this.router.navigate([resp.redirect])
          }
        },
        error => {
          if (error.error) {
            this.apiError = error.error
          } else {
            console.error('Error logging in: ', error)
          }
        }
      )
  }

  get name() { return this.loginForm.get('name') }
  get password() { return this.loginForm.get('password') }
}
