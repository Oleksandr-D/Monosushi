import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constants';

import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  public authForm!: FormGroup;
  public loginSubscription!:Subscription;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth:Auth,
    private afs: Firestore,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
  }
  ngOnDestroy():void{
    this.loginSubscription.unsubscribe();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  loginUser(): void {
    // this.accountService.login(this.authForm.value).subscribe(data => {
    //   if (data && data.length > 0) {
    //     const user = data[0];
    //     localStorage.setItem('currentUser', JSON.stringify(user))
    //     this.accountService.isUserLogin$.next(true);
    //     if (user && user.role === ROLE.USER) {
    //       this.router.navigate(['/user-profile']);
    //     } else if (user && user.role === ROLE.ADMIN) {
    //       this.router.navigate(['/admin'])
    //     }
    //   }
    // }, (e) => {
    //   console.log(e);
    // })
    const {email, password} = this.authForm.value;
    this.login(email, password).then(() => {
      this.toastr.success('Користувач успішно увішов');
    }).catch(e => {
     this.toastr.error(e.message);
    })
  }

   async login(email:string, password:string):Promise <void>{
    const credential = await signInWithEmailAndPassword(this.auth, email , password);
    this.loginSubscription = docData(doc(this.afs, 'Users', credential.user.uid)).subscribe(user =>{
      console.log('user', user)
      const currentUser = {...user, uid:credential.user.uid};
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user.role === ROLE.USER){
        this.router.navigate(['/userprofile'])
      }else if (user && user.role === ROLE.ADMIN){
        this.router.navigate(['/admin']);
      }
      this.accountService.isUserLogin$.next(true);
   },(e)=>{
       console.log('error', e)
      })

   }


}