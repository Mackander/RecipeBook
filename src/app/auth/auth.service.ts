import * as firebase from 'firebase'

export class AuthService {
    token: string;

    getToken() {
        firebase.auth().currentUser.getIdToken()
        .then((token: string) => {
            token = token;
        });
        return this.token;
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
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode + ": " + errorMessage);
                // ...
            });
    }


}