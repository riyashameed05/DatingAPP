import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
 import { AccountService } from '../../core/services/account.service';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [FormsModule,RouterLink,RouterLinkActive],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css'
})
export class NavComponent {
  protected creds : any = {};
  protected accountService = inject(AccountService);
  protected router = inject(Router);
  protected toast = inject(ToastService);

  login() {
    this.accountService.login(this.creds).subscribe({
      next : result => {
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in successfully');
        this.creds = {};
      },
      error : error => this.toast.error(error.error)
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
