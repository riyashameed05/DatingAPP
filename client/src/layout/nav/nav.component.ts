import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
 import { AccountService } from '../../core/account.service';
import { NgIf } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule,RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected creds : any = {};
  private accountService = inject(AccountService);
  // toastr = inject(ToastrService);
  // router = inject(Router);
  protected loggedin = signal(false);

  login() {
    this.accountService.login(this.creds).subscribe({
      next : result => {console.log(result);
      this.loggedin.set(true);
      },
      error : error => console.log(error)
    });
  }

  logout() {
    this.loggedin.set(false);
    //this.accountService.logout();
    //this.router.navigateByUrl('/');
  }
}
