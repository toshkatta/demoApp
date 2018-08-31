import { Component } from '@angular/core'

import { User } from '../../user'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../../shared/passwordValidator.directive';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserService, private router: Router) { }

  apiErrors = {
    username: null,
    email: null,
    password: null
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required])
  }, {
      validators: [
        PasswordValidator.strongPassword,
        PasswordValidator.matchPassword
      ]
    })

  onSubmit() {
    let name = this.name.value.trim();
    let email = this.email.value.trim();
    let password = this.password.value.trim();
    let repeatPassword = this.repeatPassword.value.trim();

    if (!name || !email || !password || !repeatPassword) return

    if (password !== repeatPassword) return

    let user = new User(name, email, password)
    this.userService.createUser(user)
      .subscribe(
        (user) => {
          console.log('Created user: ', user)
          this.router.navigate(['/home'])
        },
        error => {
          if (error.error) {
            this.apiErrors = error.error
          } else {
            console.error('Error creating user: ', error)
          }
        }
      )
  }

  get name() { return this.registerForm.get('name') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get repeatPassword() { return this.registerForm.get('repeatPassword') }
  get form() { return JSON.stringify(this.registerForm.errors) }
}
