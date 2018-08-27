import { Directive } from '@angular/core'
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms'
import { Observable } from 'rxjs'
import { UserService } from '../services/user.service'
import { map } from 'rxjs/operators'

@Directive({
  selector: '[appUniqueUsernameValidator]'
})
export class UniqueUsernameValidatorDirective implements AsyncValidator {

  constructor(private userService: UserService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.getUserByUsername(control.value).pipe(
      map(user => {
        return user ? { 'mismatch': true } : null
      })
    )
  }
}
