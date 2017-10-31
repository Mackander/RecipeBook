import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simply a test', 'assets/images/Recipe1.jpg'),
    new Recipe('mediterian recipe', 'This is a vegitarian recipe', 'assets/images/Recipe2.jpg')
  ];
  constructor() { }
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  ngOnInit() {
  }

  onSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
