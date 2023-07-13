import { GlobalService } from 'src/app/Services/global/global.service';
import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export type TFieldError = Record<'label' | 'msg', string>;
type TFormError = Record<string, TFieldError>;
type ErrorServer = Record<string, string>;

export type TFormLoginKey = 'email' | 'password';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private globalService: GlobalService) { }

  fieldChange(field: AbstractControl, rootErr: TFormError, errorKey: string): void {
    const arrayKey = errorKey.split('.');
    const key = arrayKey.pop();
    if (!key) { return };

    let parentKey = arrayKey.join('.');

    const parentErr = this.getDeepObject(rootErr, parentKey)
    const keyErr = this.getDeepObject(rootErr, errorKey);

    if (field.invalid && field.touched) {
      const errorLabel = this.getDeepObject(rootErr, errorKey).label;
      const errorMessage = this.formatErrorMessage(errorLabel, (field.errors as ValidationErrors));

      Object.defineProperty(parentErr, key, { value: { ...keyErr, msg: errorMessage }, writable: true });
    };

    if (field.valid) {
      Object.defineProperty(parentErr, key, { value: { ...keyErr, msg: '' }, writable: true });
    }
  };

  validateForm(form: FormGroup | FormArray, rootErr: TFormError, iteration = 0, parentKey = '') {
    const { controls } = form;
    Object.keys(controls).forEach((key: string) => {
      console.log(key);
      
      if ((controls as any)[key].invalid && !(controls as any)[key].controls) {
        let errorKey = key;
        if (parentKey) { errorKey = parentKey + '.' + key }
        const errorLabel = this.getDeepObject(rootErr, errorKey).label;
        const errorMessage = this.formatErrorMessage(errorLabel, (controls as any)[key].errors);

        const parentErr = this.getDeepObject(rootErr, parentKey)
        const keyErr = this.getDeepObject(rootErr, errorKey);
        Object.defineProperty(parentErr, key, { value: { ...keyErr, msg: errorMessage }, writable: true });
      } else {
        Object.defineProperty(rootErr, key, { value: { ...rootErr[key], msg: '' }, writable: true });
      };

      if ((controls as any)[key].controls) {
        let nextKey = key;
        if (parentKey) { nextKey = parentKey + '.' + key };
        this.validateForm((controls as any)[key], rootErr, iteration + 1, nextKey)
      }
    });
  };

  resetForm(form: FormGroup, errors?: TFormError) {
    form.reset();

    if (!errors) { return; }
    this.resetLabel(errors);
  }
  resetLabel(errors?: TFormError) {
    if (errors) {
      Object.keys(errors).forEach((key) => {
        Object.defineProperty(errors, key, { value: { ...errors[key], msg: '' }, writable: true });
      });
    }
  }
  resetErrors(errors: TFormError) {
    Object.keys(errors).forEach((key) => {
      const isSubError = Object.keys(errors[key]).filter((subKey => ['label', 'msg'].includes(subKey))).length;
      if (isSubError) {
        Object.defineProperty(errors, key, { value: { ...errors[key], msg: '' }, writable: true });
        return;
      };

      if (errors[key]) {
        this.resetErrors(<unknown>errors[key] as TFormError);
      }
    });
  }

  getFirstError(errors: TFormError, prevError = ''): string {
    let errorMsg = '';

    if (prevError) { return prevError }

    Object.keys(errors).forEach((key): string | void => {
      if (errorMsg) {
        return errorMsg;
      }

      if (errors[key]?.msg) {
        errorMsg = errors[key].msg;
        return;
      }

      if ((<unknown>errors[key] as TFormError[]).length) {
        (<unknown>errors[key] as TFormError[]).forEach((_, index) => {
          errorMsg = this.getFirstError(((<unknown>errors[key] as TFormError[])[index]) as TFormError, errorMsg);
        })
      };
    });

    return errorMsg;
  }

  serverErrorValidate(errorServer: ErrorServer, errors: TFormError) {
    Object.keys(errorServer).forEach((key) => {
      const arrayKey = key.split('.');
      const fieldname = arrayKey.pop();
      if (!fieldname) { return }

      let parentKey = arrayKey.join('.');

      const parentErr = this.getDeepObject(errors, parentKey)
      const keyErr = this.getDeepObject(errors, key);

      Object.defineProperty(parentErr, fieldname, { value: { ...keyErr, msg: errorServer[key] }, writable: true });
    });
  }

  private formatErrorMessage(label: string, errors: ValidationErrors): string {
    label = this.globalService.translate(label);
    if (errors['required']) {
      return this.globalService.translate('t_form_error_required', { field_name: label });
    } else if (errors['minlength']) {
      return this.globalService.translate('t_form_error_min_length', { actual_length: errors['minlength'].actualLength, min_length: errors['minlength'].requiredLength });
    } else if (errors['maxlength']) {
      return this.globalService.translate('t_form_error_max_length', { actual_length: errors['maxlength'].actualLength, max_length: errors['maxlength'].requiredLength });
    } else if (errors['email']) {
      return this.globalService.translate('t_form_error_email');
    } else if (errors['min']) {
      return this.globalService.translate('t_form_error_min', { actual_value: errors['min'].actual, min_value: errors['min'].min });
    } else if (errors['max']) {
      return this.globalService.translate('t_form_error_max', { actual_value: errors['max'].actual, max_value: errors['max'].max });
    } else if (errors['pattern']) {
      return this.globalService.translate('t_form_error_pattern', { field_name: label });
    } else if (errors['passwordMismatch']) {
      return this.globalService.translate('t_form_error_password_mismatch', { field_name: label });
    } else if (errors['emailInUse']) {
      return this.globalService.translate('t_form_error_email_used');
    } else if (errors['confirmUnmatch']) {
      return this.globalService.translate('t_form_error_confirm_mismatch');
    } else {
      return '';
    }
  }

  private getDeepObject(obj: Record<any, any>, propString: string) {
    /** handle nested object with formatted key
     *  example: 'country_requirements.ktp.exp'
     *  will resulted in 'exp' key value inside
     *  'country_requirements' object
    */
    if (!propString) { return obj }

    var prop, props = propString.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];

      var candidate = obj[prop];
      if (candidate !== undefined) {
        obj = candidate;
      } else {
        break;
      }
    }
    return obj[props[i]];
  }
}
