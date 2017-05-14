import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth-guard';
import { AuthLayoutComponent } from './shared/containers/auth-layout-container';
import { MainLayoutComponent } from './shared/containers/main-layout-container';
import { SignInComponent } from './sign-in';
import { NotFoundComponent } from './not-found';

export const ROUTES: Routes = [
  {
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },
  {
    path: 'auth', component: AuthLayoutComponent,
    children: [
      {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
      {path: 'sign-in', component: SignInComponent},
      {path: 'sign-up', loadChildren: './+sign-up/sign-up.module#SignUpModule' },
      {path: 'forgot-password', loadChildren: './+forgot-password/forgot-password.module#ForgotPasswordModule' }
    ]
  },
  {path: '**', component: NotFoundComponent},
];
