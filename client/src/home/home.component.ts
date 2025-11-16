import { Component, inject, Input, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
    registerMode = false;
    http = inject(HttpClient);
    users : any;

    registerToggle() {
      this.registerMode =!this.registerMode;
    }

    ngOnInit(): void {
      this.getUsers();
    }

    getUsers(){
      this.http.get('http://localhost:5000/api/users').subscribe({
        next : response => this.users = response,
        error : error => console.log(error),
        complete : () => console.log("complete"),
      });
    }

    cancelRegisterMode(event: boolean) {
      this.registerMode = event;
    }
}
