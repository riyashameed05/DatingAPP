import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountService } from '../core/account.service';
// import { HomeComponent } from "./home/home.component";
import { NavComponent } from '../layout/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
 
  private accountService = inject(AccountService);
  ngOnInit(): void {
   // this.setCurrentUser();
  }


  setCurrentUser(){
    const userString = localStorage.getItem("user");
    if(!userString) 
      return;
    this.accountService.currentUser.set(JSON.parse(userString));
  }
}
