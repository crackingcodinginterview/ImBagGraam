import {
  NgModule
} from '@angular/core';

import {
  BrowserModule
} from '@angular/platform-browser';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  RouterModule,
  RouteReuseStrategy
} from '@angular/router';

import {
  CustomReuseStrategy,
  RouterService
} from './core/router';

import {
  SharedCommonModule,
  ROOT_MODULES
} from './shared/common';

import {
  SHARED_SERVICES,
  SHARED_MODULES,
  SHARED_PIPES
} from './shared';

import {
  ENV_PROVIDERS
} from './environment';

import {
  ROUTES
} from './app.routes';

// App is our top level component
import {
  AppComponent
} from './app.component';

import {
  MainLayoutModule
} from './shared/containers/main-layout-container';

import {
  AuthLayoutModule
} from './shared/containers/auth-layout-container';

import {
  SignInModule
} from './sign-in';

import {
  NotFoundModule
} from './not-found';

// Application wide
const APP_PROVIDERS = [
  ...SHARED_SERVICES,
  { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
  RouterService
];

const APP_DECLARATION = [
  SHARED_PIPES,
  AppComponent
];

// App Styles
import '../styles/styles.scss';
import {LaddaModule} from 'angular2-ladda';
import {ToasterModule} from 'angular2-toaster';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: APP_DECLARATION,
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    ...ROOT_MODULES,

    MainLayoutModule,
    AuthLayoutModule,

    NotFoundModule,
    SignInModule,

    ...SHARED_MODULES,

    ToasterModule,
    LaddaModule.forRoot({
      style: 'expand-right',
      spinnerSize: 40,
      spinnerColor: 'red',
      spinnerLines: 12
    }),
  ],
  exports: [ // Exports module to make it available in another modules
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedCommonModule,

    MainLayoutModule,
    AuthLayoutModule,

    SignInModule,
    NotFoundModule,

    ...APP_DECLARATION,
    ...SHARED_MODULES
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
}
