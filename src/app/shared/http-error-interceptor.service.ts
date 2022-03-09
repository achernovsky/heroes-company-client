import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req)
            .pipe(
                retry(2),
                catchError((error: HttpErrorResponse) => {
                    this.router.navigate(['/server-error'])
                    return throwError(() => error)
                })
            )
    }
}