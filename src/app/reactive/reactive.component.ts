import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-reactive',
    templateUrl: './reactive.component.html',
    styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
    constructor(private builder: FormBuilder) {}

    // Using FormBuilder to link and initialize form values
    public loginForm = this.builder.group({
        mail: [''],
        password: [''],
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
        console.log('submit');
        window.alert(JSON.stringify(this.loginForm.value));
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
        this.loginForm.patchValue({
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
