import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-reactive',
    templateUrl: './reactive.component.html',
    styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
    constructor(private builder: FormBuilder) {}

    loginForm = this.builder.group({
        userName: [''],
        password: [''],
    });

    // this also possible though it could be troublesome (using instance)
    /* protected loginForm = new FormGroup({
        userName: new FormControl(''),
        password: new FormControl(''),
    });*/

    ngOnInit(): void {}

    submit() {
        console.log('submit');
        console.log(this.loginForm.value);
    }
}
