import { AuthGuard } from './../auth/auth-guard.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

const recipesRoute : Routes = [
    //{ path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: '', component: RecipesComponent,
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] }, // ordering of routes is important!!
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(recipesRoute)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}