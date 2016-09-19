import firebase from 'firebase';
import { firebaseAuth, firebaseDb } from './firebase';

export class User {
  constructor(user) {
    this.user = user;
  }

  initUserCloud() {
    const lastLogin = new Date().getTime();
    firebaseDb.ref(`USERS/${this.user.uid}`).set({
      username: this.user.displayName,
      email: this.user.email,
      profile_picture: this.user.photoURL,
      providerId: this.user.providerData[0].providerId,
      login_timestamp: [lastLogin]
    });
  }

  loginWithGoogle() {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebaseAuth.signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.user = user;
        this.initUserCloud();
        resolve(user);
        // ...
      }).
      catch((error) => {
        reject(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
    });
  }
}
