import { Component, inject, OnInit, signal } from '@angular/core';
import { NavComponent } from "../layout/nav/nav.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, RouterOutlet, 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
protected router = inject(Router);


}
