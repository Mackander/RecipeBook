import { HomeComponent } from './core/home/home.component';
import { Recipe } from './recipes/recipe.model';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';

const appRoute: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },

    { path: 'shopping-list', component: ShoppingListComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(appRoute, { preloadingStrategy: PreloadAllModules })], //Lecture 283 preloading lazy modules
    exports: [RouterModule]
})
export class AppRoutingModule { }
