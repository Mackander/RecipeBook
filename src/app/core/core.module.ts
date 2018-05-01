import { AuthInterceptor } from './../shared/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { RecipeService } from './../recipes/recipe.service';
import { ShoppingListSerivice } from './../shopping-list/shopping-list.service';
import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './../core/header/header.component';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from '../shared/logging,interceptor';


@NgModule({
    declarations: [HeaderComponent, HomeComponent],
    imports: [SharedModule, AppRoutingModule],
    exports: [HeaderComponent, AppRoutingModule],
    providers: [ShoppingListSerivice, RecipeService, DataStorageService, AuthService,
        //Note the execution order of Interceptors depending on order of defining it 
        // So AuthInterceptor execute first and then LoggingInterceptor
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // lecture 296
        ,{ provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true } // lecture 298
    ],
})
export class CoreModule { }