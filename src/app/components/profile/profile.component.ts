import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { UserService } from '../../services/user.service'
import { AuthService, API_URL } from '../../services/auth.service'
import { RegisterValidator } from '../../shared/registerValidator.directive'

import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { FileUploader, FileSelectDirective } from 'ng2-file-upload'

export interface UserData {
  id: number | null,
  name: string | null,
  email: string | null,
  avatar: string | null
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService) {
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

  private user: UserData
  private apiErrors = {
    username: null,
    email: null,
    password: null
  }

  private editMode: boolean = false
  private editPasswordMode: boolean = false

  private editForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email])
  }, {
      validators: [
        RegisterValidator.usernameIsLetters
      ]
    })

  private passwordForm = new FormGroup({
    password: new FormControl('', [Validators.minLength(8)]),
    repeatPassword: new FormControl('', [])
  }, {
      validators: [
        RegisterValidator.strongPassword,
        RegisterValidator.matchPassword
      ]
    })

  private edit() {
    this.editPasswordMode = false
    this.editForm.reset()
    this.editForm.controls['name'].setValue(this.user.name)
    this.editForm.controls['email'].setValue(this.user.email)
    this.editMode = !this.editMode
  }

  private editPassword() {
    this.passwordForm.reset()
    this.editPasswordMode = !this.editPasswordMode
  }

  private checkEmail() {
    let email = this.email.value.trim()
    if (email !== this.user.email) {
      this.authService.checkEmailTaken(email).subscribe(
        resp => {
          this.apiErrors.email = resp ? 'Email already taken' : null
        }
      )
    }
  }

  private checkUsername() {
    let username = this.name.value.trim()
    if (username !== this.user.name) {
      this.authService.checkUsernameTaken(username).subscribe(
        resp => {
          this.apiErrors.username = resp ? 'Username already taken' : null
        }
      )
    }
  }

  private submitPassword() {
    let password = ''
    let repeatPassword = ''

    if (this.password.value && this.repeatPassword.value) {
      password = this.password.value.trim()
      repeatPassword = this.repeatPassword.value.trim()
      if (password !== repeatPassword) return
    }

    if (!password || !repeatPassword) return

    let input = { 'password': password }
    this.authService.updatePassword(input)
      .subscribe(data => {
        this.loadProfile()
        this.editPassword()
      })
  }

  private loadProfile() {
    this.userService.getUserProfile()
      .subscribe((data) => {
        this.user = data
        this.user.avatar = API_URL + '/' + data.avatar
      })
  }

  public uploader: FileUploader = new FileUploader({ url: API_URL + '/uploadAvatar', itemAlias: 'avatar' })

  onSubmit() {
    let name: string = this.name.value.trim()
    let email: string = this.email.value.trim()

    if (!name || !email) return

    if (name === this.user.name && email === this.user.email) {
      this.edit()
      return
    }

    if (!this.editForm.valid || this.apiErrors.username || this.apiErrors.email) {
      return
    }

    let user = {
      name: name,
      email: email
    }

    this.userService.updateUser(user)
      .subscribe(val => {
        this.loadProfile()
        this.edit()
      })
  }

  ngOnInit() {
    this.user = {
      id: null,
      name: null,
      email: null,
      avatar: null
    }

    this.loadProfile()

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = true }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('ImageUpload:uploaded:', item, status, response)
        this.loadProfile()
    }
  }

  get name() { return this.editForm.get('name') }
  get email() { return this.editForm.get('email') }
  get password() { return this.passwordForm.get('password') }
  get repeatPassword() { return this.passwordForm.get('repeatPassword') }
}
