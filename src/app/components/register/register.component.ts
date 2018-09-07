import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { User } from '../../user'
import { RegisterValidator } from '../../shared/registerValidator.directive'
import { UserService } from '../../services/user.service'
import { AuthService } from '../../services/auth.service'

import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.name.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(val => {
      this.checkUsername()
    })

    this.email.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(val => {
      this.checkEmail()
    })
  }

  private apiErrors = {
    username: null,
    email: null,
    password: null
  }

  private registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required])
  }, {
      validators: [
        RegisterValidator.strongPassword,
        RegisterValidator.matchPassword,
        RegisterValidator.usernameIsLetters
      ]
    })

  private checkEmail() {
    let email = this.email.value.trim()
    this.authService.checkEmailTaken(email).subscribe(
      resp => {
        this.apiErrors.email = resp ? 'Email already taken' : null
      }
    )
  }

  private checkUsername() {
    let username = this.name.value.trim()
    this.authService.checkUsernameTaken(username).subscribe(
      resp => {
        this.apiErrors.username = resp ? 'Username already taken' : null
      }
    )
  }

  onSubmit() {
    let name = this.name.value.trim()
    let email = this.email.value.trim()
    let password = this.password.value.trim()
    let repeatPassword = this.repeatPassword.value.trim()

    if (!name || !email || !password || !repeatPassword) return

    if (password !== repeatPassword) return

    let user = new User(name, email, password)
    this.authService.register(user)
      .subscribe(
        resp => {
          this.router.navigate([resp.redirect])
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
