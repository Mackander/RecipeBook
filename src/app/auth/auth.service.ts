import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router:Router){

    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
                token = token;
            });
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(

            error => console.log(error)

        );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => {
                        this.token = token;
                    });

                console.log(response)
                this.router.navigate(['/']);
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode + ": " + errorMessage);
                // ...
            });
    }

    signOut() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            
        }).catch(function (error) {
            // An error happened.
            console.log("Error occured while signing out - " + error)
        });
        this.token = null;
        this.router.navigate(['signin']);
    }


}