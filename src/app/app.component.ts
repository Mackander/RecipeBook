import { Component } from '@angular/core';
import { ShoppingListSerivice } from './shopping-list/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingListSerivice]
})
export class AppComponent {
  title = 'app';
  headerSelectedItem = 'recipes';

  onSelectedItem(selectedItem: string) {
    this.headerSelectedItem = selectedItem;
  }
}
