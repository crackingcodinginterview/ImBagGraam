/*
 * Angular 2 decorators and services
 */
import {
  Component,
  ViewEncapsulation,
  OnInit,
  HostBinding,
  ElementRef,
  Renderer,
  AfterViewInit
} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {
  Title
} from '@angular/platform-browser';

import {
  Router,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  ActivatedRoute
} from '@angular/router';

import {
  ThemeSetting,
  ProgressService,
  Util
} from './shared/services';

import {
  RouterService
} from './core/router';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.scss'
  ],
  template: `
    <toaster-container></toaster-container>
    <div class="full-height">
        <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit, AfterViewInit {
  private className = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private title: Title,
              public el: ElementRef,
              private _themeSetting: ThemeSetting,
              private progressService: ProgressService,
              private _routerService: RouterService,
              private _util: Util) {
    this._themeSetting.init(el.nativeElement.parentElement);
  }

  public ngOnInit(): void {
    console.log('API_DOMAIN in env vars: ' + VARS.API_DOMAIN);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // console.log('NavigationStart', event);
        this.progressService.start();
      }
      else if (event instanceof NavigationEnd) {
        // console.log('NavigationEnd', event);
        // Hide progress bar
        this.progressService.done();

        let lastActivatedRoute = this._util.getLastActivatedRoute(this.activatedRoute);

        // Binding page title and page classes
        let routeData = lastActivatedRoute.data["value"];
        if (routeData['pageTitle']) {
          this.title.setTitle(routeData['pageTitle']);
        }

        let classes = [];

        if (routeData['className']) {
          if (routeData['className'].indexOf(' ') > -1) {
            classes = classes.concat(routeData['className'].split(' '));
          } else {
            classes.push(routeData['className']);
          }
        }

        this._themeSetting.pageClassList = classes;

        // Restore scroll position if the view was cached
        let keyPath = this._util.getFullRoutePathByActivatedRoute('', lastActivatedRoute);
        let storedRoutes = this._routerService.storedRoutes;
        if (storedRoutes && storedRoutes[keyPath]) {
          window.scrollTo(0, storedRoutes[keyPath].scrollPosition || 0);
        }
      }
      else if (event instanceof NavigationError) {
        console.log('NavigationError', event);
        this.progressService.done();
      }
      else if (event instanceof NavigationCancel) {
        // console.log('NavigationCancel', event);
        this.progressService.done();
      }
    });
  }

  public ngAfterViewInit(): void {
    this._themeSetting.pageLoaded = true;
  }
}
