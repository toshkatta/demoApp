import { Component } from '@angular/core'
import { UserService } from '../../services/user.service'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService) { }

  apiErrors = {
    username: null,
    password: null
  }

  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit() {
    const name = this.name.value.trim();
    const password = this.password.value.trim();

    if (!name || !password) return

    this.userService.login(name, password)
      .subscribe(
        (user) => {
          console.log('Logged in: ', user)
        },
        error => {
          if (error.error) {
            this.apiErrors = error.error
          } else {
            console.error('Error logging in: ', error)
          }
        }
      )
  }

  get name() { return this.loginForm.get('name') }
  get password() { return this.loginForm.get('password') }
}