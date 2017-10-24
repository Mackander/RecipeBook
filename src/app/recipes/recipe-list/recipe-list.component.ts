import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe','This is simply a test','https://get.pxhere.com/photo/dish-meal-food-produce-vegetable-recipe-eat-lunch-cuisine-pizza-cheese-cook-tomatoes-quiche-olives-kohlrabi-italian-food-au-gratin-gratin-1292471.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }
}
