import {
  Injectable
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  private _user: any = {};

  constructor(private _afAuth: AngularFireAuth) {
    _afAuth.authState.subscribe((user) => {
      if (user) {
        // user logged in
        this._user = user;
      } else {
        // user not logged in
        this._user = {};
      }
    });
  }

  get user() {
    return this._user;
  }

  public createUser(email, password) {
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public login(email, pass) {
    return this._afAuth.auth.signInWithEmailAndPassword(email, pass);

//     // Anonymous
//     af.auth.login({
//       provider: AuthProviders.Anonymous,
//       method: AuthMethods.Anonymous,
//     });
//
// // Email and password
//     af.auth.login({
//         email: 'email@example.com',
//         password: 'password',
//       },
//       {
//         provider: AuthProviders.Password,
//         method: AuthMethods.Password,
//       });
//
// // Social provider redirect
//     af.auth.login({
//       provider: AuthProviders.Twitter,
//       method: AuthMethods.Redirect,
//     });
//
// // Social provider popup
//     af.auth.login({
//       provider: AuthProviders.Github,
//       method: AuthMethods.Popup,
//     });
  }

  public sendPasswordResetEmail(email) {
    let auth = firebase.auth();
    return auth.sendPasswordResetEmail(email);
  }

  public logout() {
    return this._afAuth.auth.signOut();
  }
}
