import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth/auth.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .pipe(
                catchError(error => {
                    console.log(error);
                    if (error.status === 401) {
                        this.auth.login();
                        throw error;
                    } else {
                        throw error;
                    }
                })
            );
    }
}
