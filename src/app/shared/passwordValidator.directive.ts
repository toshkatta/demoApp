import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms"

export class PasswordValidator {

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
}
