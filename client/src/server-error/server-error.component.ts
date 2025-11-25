import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../types/ApiError';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {
  protected error : ApiError;
  private router = inject(Router);
  protected showErrorDetails = false;
  constructor()
  {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];}

  showDetails(){
    this.showErrorDetails = !this.showErrorDetails;
  }
}
