import { LoaderService } from './../services/loader/loader.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class HttpStateInterceptor implements HttpInterceptor {

  constructor(
    private _loaderService: LoaderService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this._loaderService.isLoading.next(true);
    return next.handle(request);
    // .pipe(
    //   finalize(() => this._loaderService.isLoading.next(false))
    // );
  }
}


