import { Component, inject, output, signal } from '@angular/core';
import { RegisterCreds } from '../../../types/User';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  protected creds = {} as RegisterCreds;
  protected cancelRegsister = output<boolean>();
  register(){
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
  },
      error: error => {
        console.log('registration error:', error);
      }});
  }
  
  cancel(){
    console.log('cancelled');
    this.cancelRegsister.emit(false);
  }
}
