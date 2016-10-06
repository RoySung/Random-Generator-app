import firebase from 'firebase';
import { firebaseAuth, firebaseDb } from './firebase';

export class User {
  constructor(user) {
    this.user = user;
  }

  initUserCloud() {
    const user = this.getUserInfo();
    const nowDate = new Date().getTime();
    firebaseDb.ref(`USERS/${user.uid}`).set(user);
    this.updateUserCloud('login_timestamp', nowDate);
  }

  getUserInfo() {
    return {
      uid: this.user.uid,
      username: this.user.displayName,
      email: this.user.email,
      profile_picture: this.user.photoURL,
      providerId: this.user.providerData[0].providerId
    };
  }

  checkNewUserCloud() {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`USERS/${this.user.uid}`).once('value', (snapshot) => {
        const value = snapshot.val();
        if (value) {
          resolve(value);
        } else {
          resolve(false);
        }
      });
    });
  }

  checkAuthCloud() {
    return new Promise((resolve, reject) => {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          const userInfo = this.getUserInfo();
          const nowDate = new Date().getTime();
          this.pushUserCloud('login_timestamp', nowDate);
          resolve(userInfo);
        } else {
          reject(false);
        }
      });
    });
  }

  pushUserCloud(field, value) {
    firebaseDb.ref(`USERS/${this.user.uid}/${field}`).push(value);
  }

  loginWithGoogle() {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebaseAuth.signInWithRedirect(provider);
      firebaseAuth.getRedirectResult().then((result) => {
        console.log(result);
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;
        this.user = user;
        const userInfo = this.getUserInfo();

        this.checkNewUserCloud().then((userData) => {
          if (userData) {
            const nowDate = new Date().getTime();
            this.pushUserCloud('login_timestamp', nowDate);
            console.log(userData);
          } else {
            this.initUserCloud();
          }
          resolve(userInfo);
        });

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

  logoutCloud() {
    return new Promise((resolve, reject) => {
      firebaseAuth.signOut().then(() => {
        resolve();
      }, () => {
        reject();
      });
    });

  }
}
