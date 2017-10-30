import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simply a test', 'https://get.pxhere.com/photo/dish-meal-food-produce-vegetable-recipe-eat-lunch-cuisine-pizza-cheese-cook-tomatoes-quiche-olives-kohlrabi-italian-food-au-gratin-gratin-1292471.jpg'),
    new Recipe('mediterian recipe', 'This is a vegitarian recipe', 'https://get.pxhere.com/photo/dish-meal-food-green-mediterranean-vegetable-recipe-healthy-snack-cuisine-food-photography-zucchini-vegetarian-food-delicious-food-rosemary-appetizer-plated-food-beautiful-food-zucchini-wraps-zucchini-slices-fish-fillet-recipe-fish-recipes-1376204.jpg')
  ];
  constructor() { }
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  ngOnInit() {
  }

  onSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
