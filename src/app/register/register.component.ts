import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';

import { User } from '../login/user';
import { PostService } from '../postrequest.service';

@Component({
    selector: 'register-page',
    templateUrl: './register.component.html',
    styleUrls: ['../assets/app.component.scss'],
    providers: [PostService]
})

export class RegisterComponent {
    title = 'Sign up';
    user = new User;
    token;
    samePassword = false;
    loading = false;
    isValid;
    endpoint = 'https://cake-cup.glitch.me/api/register';

    constructor (
        private register: PostService,
        public router: Router) {
        }

    checkError(inputField) {
        let formError = false;
        if (inputField.errors && (inputField.touched || inputField.dirty)) {
            formError = true;
        }
        return formError;
    }

    passwordChecker(password1, password2) {
        if (password1 !== password2) {
            this.samePassword = true;
        } else {
            this.samePassword = false;
        }
        return this.samePassword;
    }

    onUserRegister() {
        this.loading = true;
        this.register.postRequest(this.user, this.endpoint)
            .subscribe(
                response => {
                    this.token = response;
                    this.router.navigate(['']);
                    this.loading = false;
                },
                error => {
                    console.log(error)
                    this.isValid = false;
                    this.loading = false;
                },
                () => {
                    sessionStorage.setItem('CurrentUser', this.token.data.attributes.token);
                    sessionStorage.setItem('Status', 'ok');
                });
    }
}
