import {
  Component,
  ViewEncapsulation,
  Input
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  Sidebar
} from 'ng-sidebar';

import {
  AuthService
} from '../../../../services/auth/auth.service';

import {
  ThemeSetting
} from '../../../../services/theme-setting';

import {
  TranslationModel,
  Translation
} from "../../../../modules/i18n";

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'page-header',  // <page-header></page-header>
  // Our list of styles in our component. We may add more to compose many styles together
  encapsulation: ViewEncapsulation.None,
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './page-header.template.html',
  styleUrls: [
    './page-header.style.scss'
  ]
})
export class PageHeaderComponent {
  @Input()
  public sidenav: Sidebar;

  public translations: TranslationModel[] = [];
  public currentTranslation: TranslationModel;

  constructor(private _router: Router,
              private _authService: AuthService,
              private _themeSetting: ThemeSetting,
              private _translation: Translation) {
    this.translations = this._translation.getTranslations();

    this.currentTranslation = this._translation.getCurrentTranslation();
  }

  public changeTranslation(trans) {
    this.currentTranslation = trans;
    this._translation.use(trans);
  }

  public openLeftSideNav() {
    this._themeSetting.sidebarOpen = !this._themeSetting.sidebarOpen;
  }

  public openRightSideBar() {
    this.sidenav.open();
  }

  public logout() {
    this._authService.logout()
      .then(() => {
          this._router.navigate(['auth', 'sign-in']);
        },
        () => {
          this._router.navigate(['auth', 'sign-in']);
        });
  }
}
