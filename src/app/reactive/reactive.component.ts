import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-reactive',
    templateUrl: './reactive.component.html',
    styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
    constructor(private builder: FormBuilder) {}

    get formStatus() {
        return this.loginForm.status === 'VALID' ? true : false;
    }
    get passwordInvalid() {
        return this.loginForm.controls.password.errors?.required
            ? true
            : false ?? false;
    }
    get emailInvalid() {
        return this.loginForm.controls.mail.errors?.required
            ? true
            : false ?? false;
    }
    get emailPatternInvalid() {
        return this.loginForm.controls.mail.errors?.email
            ? true
            : false ?? false;
    }

    // controls form
    public meta = {
        submitted: false as boolean,
    };

    // Using FormBuilder to link and initialize form values
    public loginForm = this.builder.group({
        mail: ['', Validators.email], // validates whether email format or not
        password: ['', Validators.required], // validates form filled or not
    });

    /**
     * This also possible though it could be troublesome (using instance..)
     */
    // public loginForm = new FormGroup({
    //     mail: new FormControl(''),
    //     password: new FormControl(''),
    // });

    /**
     * Submit form values
     */
    submit() {
        this.meta.submitted = true;
        if (this.formStatus) {
            window.alert(JSON.stringify(this.loginForm.value));
        }
    }

    /**
     * Fill emailAddress with specific email
     *  L shows example for filling email type
     *  L Overwrites existing value
     */
    fillMail() {
        // when using FormBuilder, you can set values from method, patchValue()
        this.loginForm.patchValue({
            mail: 'sample@example.com',
        });
        window.alert(JSON.stringify(this.loginForm.value));
    }

    /**
     * Fill password with specific password
     *  L Shows example for filling password type
     *  L Overwrites existing value
     */
    fillPassword() {
        // when using FormBuilder, you can set values from method, patchValue()
        this.loginForm.patchValue({
            password: 'pass1word',
        });
        window.alert(JSON.stringify(this.loginForm.value));
    }

    /**
     * Delete form values
     */
    deleteValue() {
        this.loginForm.setValue({
            mail: '',
            password: '',
        });
    }

    /**
     * Initialize form values
     */
    ngOnInit(): void {
        this.deleteValue();
    }
}
