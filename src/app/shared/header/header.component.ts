import { AuthService } from './../../auth/auth.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { Response } from '@angular/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService) { }

    onSave() {
        this.dataStorageService.storeRecipies()
            .subscribe((response: Response) => {
                console.log(response);
            });
    }

    onFetchData() {
        this.dataStorageService.getRecipiesData();
    }

    onSignOut() {
        this.authService.signOut();
    }
}
