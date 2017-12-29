import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  headerSelectedItem = 'recipes';

  ngOnInit() {
    firebase.initializeApp({
      // to see following option go to console of your database select Authentication tab and click "web setup"
      apiKey: "AIzaSyCVgutC8twFTmpDtfIYDM-Az76LWoQzQtM",
      authDomain: "ng-recipe-book-cee0c.firebaseapp.com",
    });
  }

}
