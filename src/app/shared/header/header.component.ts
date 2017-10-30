import { Component, Output,EventEmitter } from '@angular/core'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() selectedItem = new EventEmitter<string>();

    onSelectSection(sectionName: string) {
        this.selectedItem.emit(sectionName);
    }
}