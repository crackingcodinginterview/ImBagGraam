import {
  NgModule
} from '@angular/core';

import {
  SharedCommonModule
} from '../../common';

import {
  MainLayoutComponent
} from './main-layout-container.component';

import {
  PageHeaderComponent
} from './components/page-header';

import {
  QuickViewComponent
} from './components/quickview';

import {
  SidebarComponent
} from './components/sidebar';

import {
  QuickViewModule
} from '../../modules/quick-view';

@NgModule({
  imports: [
    SharedCommonModule,
    QuickViewModule
  ],
  exports: [
    PageHeaderComponent,
    QuickViewComponent,
    SidebarComponent,
    MainLayoutComponent
  ],
  declarations: [
    PageHeaderComponent,
    QuickViewComponent,
    SidebarComponent,
    MainLayoutComponent
  ],
  providers: [],
  entryComponents: [],
})
export class MainLayoutModule {
}
