import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/User';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5000/api/';
  currentUser = signal<User | null>(null);
 login(creds: LoginCreds) {
  return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
    tap(user => {
      if(user)
      {
        this.setCurrentUser(user);
      }
    }),
  );
}

  register(creds: RegisterCreds)
  {
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      map(user => {
          if(user)
          {
              this.setCurrentUser(user);
          }
          //return user;
        }
      )
    )
  }


  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  setCurrentUser(user: User) {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUser.set(user);
  }

}
