import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appNoteTitleValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoteTitleValidatorDirective,
      multi: true,
    },
  ],
})
export class NoteTitleValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    if (!value || value.trim().length === 0) {
      return { emptyTitle: true };
    }

    if (value.length == 20) {
      return { maxLength: true };
    }

    if (/[^a-zA-Z0-9\s]/.test(value)) {
      return { invalidCharacters: true };
    }

    return null;
  }
}
