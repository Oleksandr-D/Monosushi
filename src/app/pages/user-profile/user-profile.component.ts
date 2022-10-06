import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public user!:any

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
   
    
    this.checkUpdatesUserLogin();
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      
    })
    this.user = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  ///update data?

  logOut(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }
}
