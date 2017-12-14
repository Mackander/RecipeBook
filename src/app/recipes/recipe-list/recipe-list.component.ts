import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeAddedSubscription: Subscription;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.recipes = this.recipeService.getRecipes();

    this.recipeAddedSubscription = this.recipeService.recipeAdded.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      console.log(recipes);
    });

  }

  createNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.recipeAddedSubscription.unsubscribe();
  }
}
