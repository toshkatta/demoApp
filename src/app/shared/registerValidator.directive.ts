import { ValidatorFn, FormGroup, ValidationErrors, FormControl } from "@angular/forms"

export class RegisterValidator {

    static matchPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        let password = control.get('password')
        let repeatPassword = control.get('repeatPassword')

        return password && repeatPassword && password.value !== repeatPassword.value ? { 'matchPassword': true } : null
    }

    static strongPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        let password = control.get('password')
        if (password) {
            let hasNumber = /\d/.test(password.value)
            let hasUpper = /[A-Z]/.test(password.value)
            let hasLower = /[a-z]/.test(password.value)

            let valid = hasNumber && hasUpper && hasLower

            return !valid ? { 'hasNumber': !hasNumber, 'hasUpper': !hasUpper, 'hasLower': !hasLower } : null
        }

        return null
    }

    static usernameIsLetters: ValidatorFn = (control: FormControl): ValidationErrors | null => {
        let username = control.get('name')
        if (username) {
            let valid = /^[a-zA-Z]+$/.test(username.value)
            return !valid ? { 'isLetters': true } : null
        }

        return null
    }
}
