import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public title = 'angular-form-differences';

    constructor(private router: Router) {}

    get currentRoute() {
        return this.router.url;
    }
}
