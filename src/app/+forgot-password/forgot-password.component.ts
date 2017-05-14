import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../shared/services/auth';

import {
  bottomToTopFadeAnimation
} from '../shared/animations'

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'forgot-password',  // <forgot-password></forgot-password>
  // Our list of styles in our component. We may add more to compose many styles together
  encapsulation: ViewEncapsulation.None,
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: 'forgot-password.template.html',
  styleUrls: [
    'forgot-password.style.scss'
  ],
  animations: [bottomToTopFadeAnimation()],
  host: {'[@routerTransition]': 'true'}
})
export class ForgotPasswordComponent implements OnInit {
  public frm: FormGroup;
  public formErrors = {
    email: ''
  };
  public validationMessages = {
    email: {
      required: 'email is required.',
    }
  };
  public hasError: boolean = false;
  public submitted: boolean = false;
  public errorMessage: string = '';

  constructor(private _router: Router,
              private _fb: FormBuilder,
              private _authService: AuthService) {

  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm() {
    this.frm = this._fb.group({
      email: new FormControl('', [Validators.required])
    });

    this.frm.valueChanges
      .subscribe((data) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  public onValueChanged(data?: any) {
    if (!this.frm) {
      return;
    }
    const form = this.frm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  public signIn() {
    this._router.navigate(['auth', 'sign-in']);
  }

  public onSubmit(value: any) {
    this.hasError = false;
    this.submitted = true;
    this._authService.sendPasswordResetEmail(value.email)
      .then((resp) => {
        // Success go here
      }, (err) => {
        this.hasError = true;
        this.submitted = false;
        this.errorMessage = err.message;
      });
  }
}
