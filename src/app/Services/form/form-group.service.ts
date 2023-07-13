import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Injectable({
    providedIn: 'root'
  })
export class FormGroupTemplate {
    public loginForm: FormGroup = new FormBuilder().group({
        email: [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: [null, [Validators.required, Validators.minLength(8)]],
    })
    // public loginForm: FormGroup | undefined;

    constructor(private formBuilder: FormBuilder) {
    }

}