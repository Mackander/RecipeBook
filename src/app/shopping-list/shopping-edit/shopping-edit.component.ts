import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListSerivice } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListSerivice: ShoppingListSerivice) { }

  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  ngOnInit() {
  }

  onAddIngredient() {
    this.shoppingListSerivice.addIngredient(
      new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value)
    );
  }
}
