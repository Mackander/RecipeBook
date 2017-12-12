import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListSerivice } from '../shopping-list/shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientAddedSubscription: Subscription;

  constructor(private shoppingListSerivice: ShoppingListSerivice) { }

  ngOnInit() {
    this.ingredients = this.shoppingListSerivice.getIngredients();

    this.ingredientAddedSubscription = this.shoppingListSerivice.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index) {
    this.shoppingListSerivice.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.ingredientAddedSubscription.unsubscribe();
  }
}
