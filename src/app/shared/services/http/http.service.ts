import {Injectable} from '@angular/core';
import {Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {UserContext} from '../user-context';
import {ProgressService} from '../progress';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// https://www.illucit.com/blog/2016/03/angular2-http-authentication-interceptor/
@Injectable()
export class ExtendedHttpService extends Http {

  private _httpCounter: number = 0;

  constructor(backend: XHRBackend,
              defaultOptions: RequestOptions,
              private router: Router,
              private userContext: UserContext,
              private progressService: ProgressService) {
    super(backend, defaultOptions);
  }

  private hideProgress() {
    this.progressService.done();
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    // debugger;
    return this.intercept(super.request(url, this.getRequestOptionArgs(options)));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    // debugger;
    return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
  }

  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      options.headers = new Headers();
    }

    options.headers.append('Content-Type', 'application/json');

    if (this.userContext.userToken && this.userContext.userToken.accessToken) {
      options.headers.append('Authorization', 'Bearer ' + this.userContext.userToken.accessToken);
    }
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    // debugger;
    //
    // observable.subscribe(
    //   () => {
    //     debugger;
    //   },
    //   () => {
    //     debugger;
    //   },
    //   () => {
    //     debugger;
    //   }
    // );

    return observable
      .catch((err, source) => {
        if (err.status == 401 /*&& !_.endsWith(err.url, 'api/auth/login')*/) {
          // this._router.navigate(['/login']);
          return Observable.empty();
        } else {
          return Observable.throw(err);
        }
      });
  }
}
