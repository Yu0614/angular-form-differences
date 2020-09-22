import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';

@Component({
    selector: 'app-template-driven',
    templateUrl: './template-driven.component.html',
    styleUrls: ['./template-driven.component.css'],
})
export class TemplateDrivenComponent implements OnInit {
    constructor() {}
    public model = {
        mail: '',
        password: '',
    };

    @ViewChild('form')
    form: NgForm;

    ngOnInit(): void {}

    /**
     * Submit form values
     */
    submit() {
        console.log('submit');
        window.alert(JSON.stringify(this.form.value));
    }

    /**
     * Fill emailAddress with specific email
     *  L shows example for filling email type
     *  L Overwrites existing value
     */
    fillMail() {
        this.model.mail = 'sample@example.com';
        window.alert(JSON.stringify(this.model));
    }

    /**
     * Fill password with specific password
     *  L Shows example for filling password type
     *  L Overwrites existing value
     */
    fillPassword() {
        this.model.password = 'pass1word';
        window.alert(JSON.stringify(this.model));
    }

    /**
     * Delete form values
     */
    deleteValue() {
        this.model.mail = '';
        this.model.password = '';
    }
}
