import { AuthService } from './../auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!!');

        //The requested is immutable so we can only read the request
        //However, we can clone the request and update it's content
        const copiedRequest = req.clone({ params: req.params.set('auth', this.authService.getToken()) });
        return next.handle(copiedRequest);
    }
}