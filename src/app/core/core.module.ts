import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './../core/header/header.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations:[HeaderComponent, HomeComponent],
    imports:[SharedModule,AppRoutingModule],
    exports:[HeaderComponent,AppRoutingModule]
})
export class CoreModule { }