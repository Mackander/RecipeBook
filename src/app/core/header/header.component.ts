import { DataStorageService } from './../../shared/data-storage.service';
import { AuthService } from './../../auth/auth.service';
import { Component} from '@angular/core';
import { Response } from '@angular/http';
import { HttpEvent } from '@angular/common/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService) { }

    onSave() {
        this.dataStorageService.storeRecipies()
            .subscribe((response: HttpEvent<object>) => {
                console.log(response);
            });
    }

    onFetchData() {
        this.dataStorageService.getRecipiesData();
    }

    onSignOut() {
        this.authService.signOut();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
      }
}
