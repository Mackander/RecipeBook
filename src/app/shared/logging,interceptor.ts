import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do'

export class LoggingInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //To intercept response we use 'do' method instead of subscribe method as it consumes the response
        //and do allow us to execute code without comsuming it.
        return next.handle(req).do(
            event => {
                console.log('Logging Interceptor', event);
            }
        );
    }

}