import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListSerivice } from '../../shopping-list/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() selectedRecipeItem: Recipe;
  constructor(private shoppingListSerivice: ShoppingListSerivice) { }

  ngOnInit() {
  }

  addToShoppingList() {
    this.shoppingListSerivice.addIngredients(this.selectedRecipeItem.ingredients);
  }
}
